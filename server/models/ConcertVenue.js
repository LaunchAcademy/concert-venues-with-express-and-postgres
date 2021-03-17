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
      const concertVenues = concertVenueData.map(concertVenue => new this(concertVenue))

      //release the connection back to the pool
      client.release()

      return concertVenues
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }
}

export default ConcertVenue
