import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import EventForm from '../shared/EventForm'

const EventCreate = (props) => {
  const [event, setEvent] = useState({ event_name: '', location: '', date: '', info: '' })

  const handleChange = e => {
    e.persist()
    setEvent(event => ({ ...event, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    axios({
      url: `${apiUrl}/events`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { event }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'Event created', variant: 'success' })
        props.history.push('/events')
      })
      .catch(() => props.alert({ heading: 'Errr...', message: 'Something went wrong', variant: 'danger' }))
  }

  return (
    <EventForm event={event} handleChange={handleChange} handleSubmit={handleSubmit} cancelPath='#/events' />
  )
}

export default withRouter(EventCreate)
