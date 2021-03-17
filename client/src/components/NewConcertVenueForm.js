import React, { useState } from "react"
import { Redirect } from "react-router-dom"

const NewConcertVenueForm = props => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [newVenue, setNewVenue] = useState({
    name: "",
    location: "",
    capacity: ""
  })

  const handleInputChange = event => {
    setNewVenue({
      ...newVenue,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const postNewVenue = async event => {
    event.preventDefault()

    try {
      const response = await fetch("/api/v1/concert-venues", {
        method: "POST",
        credentials: "same-origin",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newVenue)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      console.log("New Concert Venue was added successfully!")
      setShouldRedirect(true)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  if (shouldRedirect) {
    return <Redirect to="/" />
  }

  return (
    <>
      <h1>New Favorite Concert Venue</h1>
      <form onSubmit={postNewVenue}>
        <label>
          Name
          <input type="text" name="name" onChange={handleInputChange} value={newVenue.name} />
        </label>
        <label>
          Location
          <input
            type="text"
            name="location"
            onChange={handleInputChange}
            value={newVenue.location}
          />
        </label>
        <label>
          Capacity
          <input
            type="text"
            name="capacity"
            onChange={handleInputChange}
            value={newVenue.capacity}
          />
        </label>
        <input type="submit" className="button" />
      </form>
    </>
  )
}

export default NewConcertVenueForm
