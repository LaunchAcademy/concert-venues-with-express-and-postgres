import pg from "pg"

const pool = new pg.Pool({
  connectionString:
    "postgres://postgres:password@localhost:5432/concert_venues_development"
})

class ConcertVenue {
  constructor({ id, name, location, capacity }) {
    this.id = id
    this.name = name
    this.location = location
    this.capacity = capacity
  }

  static async findAll() {
    try {
      const result = await pool.query("SELECT * FROM concert_venues;")

      //get the results
      const concertVenueData = result.rows
      const concertVenues = concertVenueData.map(
        (concertVenue) => new ConcertVenue(concertVenue)
      )

      return concertVenues
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async save() {
    try {
      console.log("instance in save", this)
      const queryString =
        "INSERT INTO concert_venues (name, location, capacity) VALUES ($1, $2, $3) RETURNING id;"
      const result = await pool.query(queryString, [
        this.name,
        this.location,
        this.capacity
      ])
      // console.log(result)
      const newId = result.rows[0].id
      this.id = newId
      return true
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

export default ConcertVenue
