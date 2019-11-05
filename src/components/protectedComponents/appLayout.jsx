import React, { Component } from 'react';
import axios from 'axios';

import ServiceRequestForm from "./serviceRequestForm.jsx"
import Contact from "./contactForm.jsx"
import Applications from "./applications.jsx"

import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'

import '../../App.css';

class AppLayout extends Component {
  constructor() {
    super();
    axios.defaults.withcredentials = true

    this.state = {
      profile: ""

    }
  }

  componentWillMount() {
    axios.get(`https://legalcobackend.herokuapp.com/api/user/fetchProfile`, {withCredentials: true})
      .then((res) => {
        // console.log("In then")
        console.log(res.data);
        if (res.data.meta.success === true) {
          this.setState({ profile: res.data.payload.user })
          console.log(this.state.profile)
        }
      }).catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          alert(error.response.data)
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

  handleLogOut = () => {
    console.log("Logout")
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.props.history.push("/");

  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <>
        <Router>
          <div>

            <Navbar collapseOnSelect expand="md" className="Navbar" bg="dark" variant="dark">
              <Navbar.Brand>LegalCo</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="mr-auto">
                  <Link className="Link btn" to="/app">Request</Link>
                  <Link className="Link btn" to="/applications">Applications</Link>
                  <Link className="Link btn" to="/contact">Contact</Link>
                </Nav>

                <Navbar.Text>
                  Hey {this.state.profile ? this.state.profile.name + "!" : "!"}
                </Navbar.Text>

                <Form>
                  <Button variant="primary" onClick={this.handleLogOut}>
                    Logout
                </Button>
                </Form>

              </Navbar.Collapse>
            </Navbar>

            <Switch>
              <Route exact path='/app' component={ServiceRequestForm} />
              <Route path='/contact' component={Contact} />
              <Route path='/applications' component={Applications} />
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}

export default AppLayout;