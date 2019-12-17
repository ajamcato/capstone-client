import React from 'react'

const EventForm = ({ event, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <input
      placeholder="Event Name"
      value={event.event_name}
      name="event_name"
      onChange={handleChange}
      required
    />
    <input
      placeholder="Location"
      value={event.location}
      name="location"
      onChange={handleChange}
    />
    <input
      placeholder="Date"
      value={event.date}
      name="date"
      onChange={handleChange}
    />
    <input
      placeholder="Info"
      value={event.info}
      name="info"
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
  </form>
)
export default EventForm
