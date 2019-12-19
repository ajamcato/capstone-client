import React, { useEffect, useState, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'

const Event = props => {
  const [event, setEvent] = useState(null)
  // const [deleted, setDeleted] = useSate(false)
  const userId = props.user ? props.user._id : null

  useEffect(() => {
    axios(`${apiUrl}/events/${props.match.params.id}`)
      .then(res => setEvent(res.data.event))
      .then(() => console.log(event))
      .catch(() => props.alert({ heading: 'That didn\'t work', message: 'Sorry, couldn\'t retrieve the requested event', variant: 'danger' }))
  }, [])

  const handleDelete = () => {
    axios({
      url: `${apiUrl}/events/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => {
        props.alert({ heading: 'Success', message: 'Event deleted', variant: 'success' })
        props.history.push('/events')
      })
      .catch(() => {
        props.alert({ heading: 'Whopsy!', message: 'Enable to delete', variant: 'danger' })
      })
  }

  if (!event) {
    return <p>Loading events...</p>
  }
  // console.log(event)

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h2>{event.event_name}</h2>
        <h3 className="h5">{event.location}</h3>
        <h3 className="h3">{event.date}</h3>
        {event.info
          ? <p>{event.info}</p>
          : <p className="text-muted">No content to show</p>
        }

        {userId === event.owner && (
          <Fragment>
            <Link to={`/events/${props.match.params.id}/edit`}><Button variant="primary" className="mr-2">Update</Button></Link>
            <Button onClick={handleDelete} variant="danger" className="mr-2">Delete</Button>
          </Fragment>
        )}
        <Button href="#/events" variant="secondary">Back</Button>
      </div>
    </div>
  )
}

export default withRouter(Event)
