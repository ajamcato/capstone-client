import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig.js'
import EventForm from './EventForm.js'

class EventEdit extends Component {
  constructor () {
    super()

    this.state = {
      event: null
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/events/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => this.setState({ event: res.data.event }))
      .catch(console.error)
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const eventEdit = Object.assign(this.state.event, updatedField)

    this.setState({ event: eventEdit })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/events/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { event: this.state.event }
    })
      .then((response) => this.setState({ updated: true }))
      .catch(console.error)
  }

  render () {
    const { updated, event } = this.state
    const { handleChange, handleSubmit } = this

    if (!event) {
      return <p>Loading...</p>
    }

    if (updated) {
      return <Redirect to={'/events/'} />
    }

    return (
      <Fragment>
        <h1>Update Event</h1>
        <EventForm
          event_name={event.name}
          location={event.location}
          date={event.date}
          info={event.info}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          cancelPath={'/events'}
        />
      </Fragment>
    )
  }
}

export default withRouter(EventEdit)
