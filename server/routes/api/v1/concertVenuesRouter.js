import express from "express"

import ConcertVenue from "../../../models/ConcertVenue.js"

const concertVenuesRouter = express.Router()

concertVenuesRouter.get("/", async (req, res) => {
  try {
    const venues = await ConcertVenue.findAll()
    res.json({ concertVenues: venues })
  } catch (error) {
    console.error(error)
  }
})

concertVenuesRouter.post("/", async (req, res) => {
  try {
    const formData = req.body
    // console.log(formData)
    
    const newVenue = new ConcertVenue(formData)
    newVenue.save()

    res.json({ concertVenue: newVenue })
  } catch (error) {
    console.error(error)
  }
})

export default concertVenuesRouter
