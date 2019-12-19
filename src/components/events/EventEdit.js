import React, { useState, useEffect } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig.js'
import EventForm from '../shared/EventForm.js'

const EventEdit = (props) => {
  const [event, setEvent] = useState({ date: '', event_name: '', info: '', location: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/events/${props.match.params.id}`)
      .then(res => setEvent(res.data.event))
      .catch(console.error)
  }, [])

  const handleChange = e => {
    e.persist()
    setEvent(event => ({ ...event, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    axios({
      url: `${apiUrl}/events/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      },
      data: { event }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'You edited a event', variant: 'success' })
      })
      .then(() => setUpdated(true))
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }

  if (updated) {
    return <Redirect to={`/events/${props.match.params.id}`} />
  }

  return (
    <EventForm
      event={event}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      cancelPath={`#events/${props.match.params.id}`}
    />
  )
}

export default withRouter(EventEdit)
