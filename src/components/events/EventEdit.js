import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig.js'
import EventForm from '../shared/EventForm.js'

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

  handleChange = e => {
    const updatedField = { [e.target.name]: e.target.value }

    const eventEdit = Object.assign(this.state.event, updatedField)

    this.setState({ event: eventEdit })
  }

  handleSubmit = e => {
    e.preventDefault()

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
        <EventForm
          event={event}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          cancelPath={'/events'}
        />
      </Fragment>
    )
  }
}

export default withRouter(EventEdit)
