import express from "express"

import ConcertVenue from "../../../models/ConcertVenue.js"

const concertVenuesRouter = express.Router()

concertVenuesRouter.get("/", async (req, res) => {
  try {
    const concertVenuesObjects = await ConcertVenue.findAll()
    console.log(concertVenuesObjects)
    return res.status(200).json({ concertVenues: concertVenuesObjects })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ errors: err })
  }
})

concertVenuesRouter.post("/", async (req, res) => {
  try {
    console.log("body from POST fetch", req.body)
    const newConcertVenue = new ConcertVenue(req.body)

    console.log("before save", newConcertVenue)
    await newConcertVenue.save()
    console.log("after save", newConcertVenue)

    return res.status(201).json({ concertVenue: newConcertVenue })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ errors: err })
  }
})

export default concertVenuesRouter
