import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const EventForm = (props) => {
  const { event, handleChange, handleSubmit, cancelPath } = props
  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h2>Create/Edit Event</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              placeholder="Enter your date"
              value={event.date}
              name="date"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="event name">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              as='textarea'
              placeholder="Enter Event Name"
              value={event.event_name}
              name="event_name"
              onChange={handleChange}
            >
            </Form.Control>

          </Form.Group>
          <Form.Group controlId="info">
            <Form.Label>Info</Form.Label>
            <Form.Control
              as='textarea'
              rows='7'
              placeholder="Enter event info here"
              value={event.info}
              name="info"
              onChange={handleChange}
            />

          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Location</Form.Label>
            <Form.Control
              as='textarea'
              rows='2'
              placeholder="Enter location details"
              value={event.location}
              name="location"
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" variant="primary">Submit</Button>
          <Button type="button" href={cancelPath} variant="secondary" className="ml-2">Cancel</Button>
        </Form>
      </div>
    </div>
  )
}

export default EventForm
