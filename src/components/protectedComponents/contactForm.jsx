import React, { Component } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import cookie from 'react-cookies';

import '../../App.css';

class Contact extends Component {

  constructor() {
    super();
    
    this.state = {
      contactForm: "",
      name: "",
      email: "",
      contact: "",
      description: ""
    }

  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmitContactForm = (event) => {

    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      this.setState({
        contactForm: true
      })
      // event.preventDefault();
      event.stopPropagation();
    }
    else {
      let application = {
        "name": this.state.name,
        "email": this.state.email,
        "contact": this.state.contact,
        "description": this.state.description
      }
      console.log("Application: ", application)
      // console.log(user);

      axios.post(`https://legalcobackend.herokuapp.com/api/user/contact`, application, {headers: {Authorization: 'Bearer ' + cookie.load('token')}})
        .then((res) => {
          console.log(res.data);
          if (res.data.meta.success === true) {
            alert(res.data.meta.message)
            this.setState({
              name: "",
              email: "",
              contact: "",
              description: ""
            })
          }
        }).catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            alert(error.response.data.meta.message)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            alert("Some error occurred!")
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);

        })
    }

  };

  render() {
    let Check = <p>Fetching Services!</p>
    if (this.state.services) {
      Check = this.state.services.map((service, index) => (
        <Form.Check
          key={service._id}
          type="radio"
          label={service.name}
          name="applicantServiceId"
          value={service.serviceId}
          onChange={this.handleChange}
          require />
      ))
    }

    return (
      <>

        <Container className="Container">
          <h1 className="heading">Contact Us</h1>
          <Row className="justify-content-md-center content">

            <Col xs lg="8">
              <Form noValidate validated={this.state.contactForm} onSubmit={this.handleSubmitContactForm} name="contactForm">
                {/* Name */}
                <Form.Group controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control name="name" value={this.state.name} required onChange={this.handleChange} type="text" placeholder="Enter Name" />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid Name.
                                </Form.Control.Feedback>

                </Form.Group>

                {/* Email */}
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control name="email" value={this.state.email} required onChange={this.handleChange} type="email" placeholder="Enter Email" />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid Email.
                                        </Form.Control.Feedback>

                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                                        </Form.Text>
                </Form.Group>

                {/* Mobile Number */}
                <Form.Group controlId="contact">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control name="contact" value={this.state.contact} required onChange={this.handleChange} type="text" placeholder="Enter Mobile Number" />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid Mobile Number.
                             </Form.Control.Feedback>
                </Form.Group>


                {/* Description */}
                <Form.Group controlId="description">
                  <Form.Label>Any comments?</Form.Label>
                  <Form.Control as="textarea" rows="3" name="description" value={this.state.description} onChange={this.handleChange} type="text" placeholder="Enter Comments" />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                                </Button>

              </Form>

            </Col>

          </Row>
        </Container>


      </>
    );
  }
}

export default Contact;