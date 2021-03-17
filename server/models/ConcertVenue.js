import pg from "pg"
import _ from "lodash"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/concert_venues_development"
})

class ConcertVenue {
  constructor({id, name, location, capacity}) {
    this.id = id
    this.name = name
    this.location = location
    this.capacity = capacity
  }

  static async findAll() {
    try {
      const client = await pool.connect()
      const result = await client.query("SELECT * FROM concert_venues;")

      //get the results
      const concertVenueData = result.rows
      // console.log("ORIGINAL DATA")
      // console.log(concertVenueData)
      
      const concertVenues = concertVenueData.map(concertVenue => new this(concertVenue))
      
      // console.log("VENUE OBJECT DATA")
      // console.log(concertVenues)

      //release the connection back to the pool
      client.release()

      return concertVenues
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }

  async save() {
    try {
      const client = await pool.connect()
      
      // // Version 1
      // let query = 'INSERT INTO concert_venues (name, location, capacity) VALUES '
      // query += `('${this.name}', '${this.location}', '${this.capacity}');`
      // await client.query(query)
      
      
      // // Version 2: Placeholders
      let query = 'INSERT INTO concert_venues (name, location, capacity) VALUES ($1, $2, $3)'
      await client.query(query, [this.name, this.location, this.capacity])


      const singleResult = await client.query("SELECT * FROM concert_venues ORDER BY ID DESC LIMIT 1")
      // console.log(singleResult)

      const persistedVenue = singleResult.rows[0]
      // console.log(this)
      // console.log(persistedVenue)

      this.id = persistedVenue.id
      
      client.release()
      
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

export default ConcertVenue
