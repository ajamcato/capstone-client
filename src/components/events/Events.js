import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Events = props => {
  const [events, setEvents] = useState([])
  // const [filteredEvents, setFilteredEvents] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/events`)
      .then(response => {
        setEvents(response.data.events.reverse())
      })
      // .then(() => props.alert({ heading: 'Success', message: 'Viewing all posts', variant: 'success' }))
      .catch(() => props.alert({ heading: 'Not able to retrieve posts', message: 'Sorry this isn\'t working', variant: 'success' }))
  }, [])

  const eventsJsx = events.map(event => (
    <ListGroup.Item
      key={event._id}
      action
      href={`#events/${event._id}`}
    >
      {event.event_name}
    </ListGroup.Item>
  ))

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Viewing all Events</h1>
        </div>
        <ListGroup>
          {eventsJsx}
        </ListGroup>
      </div>
    </div>
  )
}

export default Events
