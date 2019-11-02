import React, { Component } from 'react';
import axios from 'axios';

import auth from "../auth.jsx";
import Home from "./home.jsx"
import Contact from "./contactForm.jsx"
import Services from "./services.jsx"

import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'

import cookie from 'react-cookies';

import '../../App.css';

class LandingPage extends Component {


  constructor() {
    super();

    this.state = {
      loginForm: false,
      signupForm: false,
      show: false,
      loginEmail: "",
      loginPassword: "",
      signupName: "",
      signupEmail: "",
      signupPassword: "",
      signupDob: "",
      signupGender: "",
      signupMobile: "",
      auto: ""
    }
  }


  componentDidMount() {
    if (cookie.load('token') !== undefined) {
      axios.post(`http://localhost:3000/api/user/login`, { auto: 1 })
        .then((res) => {
          console.log(res.data);
          if (res.data.meta.success === true) {
            auth.login(() => {
              this.props.history.push("/app");
            });
          }
        }).catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.data.meta.message)
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);

        })
    }
  }



  handleClose = () => {
    this.setState({
      show: false
    })
  }

  handleShow = () => {
    this.setState({
      show: true
    })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    // 
    event.preventDefault();


    const form = event.currentTarget;
    console.log(form.name)

    if (form.checkValidity() === false) {
      this.setState({
        [form.name]: true
      })

      event.stopPropagation();
    }
    else {

      if (form.name === "loginForm") {
        let user = {
          "auto": 0,
          "email": this.state.loginEmail,
          "password": this.state.loginPassword
        }
        // console.log(user);

        axios.post(`http://localhost:3000/api/user/login`, user)
          .then((res) => {
            console.log(res.data);
            if (res.data.meta.success === true) {
              auth.login(() => {
                this.props.history.push("/app");
              });
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

      else if (form.name === "signupForm") {
        let user = {
          "name": this.state.signupName,
          "email": this.state.signupEmail,
          "password": this.state.signupPassword,
          "dob": this.state.signupDob,
          "gender": this.state.signupGender,
          "mobile": this.state.signupMobile,
        }
        axios.post(`http://localhost:3000/api/user/register`, user)
          .then(res => {
            console.log(res.data);
            if (res.data.meta.success === true) {
              alert(res.data.meta.message)
            }
          })
          .catch((error) => {
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
    }



    console.log(this.state.loginForm)

  };



  render() {
    return (

      <>
        <Router>
          <div>
            <Navbar className="Navbar" bg="dark" variant="dark">
              <Navbar.Brand>LSM</Navbar.Brand>
              <Nav className="mr-auto">
                <Link className="Link btn" to="/">Home</Link>
                <Link className="Link btn" to="/services">Serivces</Link>
                <Link className="Link btn" to="/contact">Contact</Link>
              </Nav>
              <Form inline>
                <Button variant="primary" onClick={this.handleShow}>
                  Login/Signup
                        </Button>
              </Form>
            </Navbar>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/contact' component={Contact} />
              <Route path='/services' component={Services} />
            </Switch>
          </div>
        </Router>




        <Modal show={this.state.show} onHide={this.handleClose} id={"loginSignup"}>
          {/* <Modal.Header closeButton>
                        <Modal.Title class={"title"}><p>Please Login to access your account.</p><p>Haven't registered? Click on Signup.</p></Modal.Title>
                    </Modal.Header> */}

          <Modal.Body>

            <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
              <Tab eventKey="login" title="Login">
                <br />
                <Form noValidate validated={this.state.loginForm} onSubmit={this.handleSubmit} name="loginForm">


                  <Form.Group controlId="loginEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="loginEmail" value={this.state.loginEmail} required onChange={this.handleChange} type="email" placeholder="Enter Email" />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid Email.
                                        </Form.Control.Feedback>

                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                                        </Form.Text>
                  </Form.Group>


                  <Form.Group controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="loginPassword" value={this.state.loginPassword} required onChange={this.handleChange} type="password" placeholder="Enter Password" />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid Password.
                                       </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      Enter minimum 6 characters.
                                        </Form.Text>

                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                                    </Button>
                </Form>
              </Tab>


              <Tab eventKey="signup" title="Signup">
                <br />
                <Form noValidate validated={this.state.signupForm} onSubmit={this.handleSubmit} name="signupForm">
                  {/* Name */}
                  <Form.Group controlId="signupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="signupName" value={this.state.signupName} required onChange={this.handleChange} type="text" placeholder="Enter Name" />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid Name.
                                       </Form.Control.Feedback>

                  </Form.Group>

                  {/* Email */}
                  <Form.Group controlId="signupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="signupEmail" value={this.state.signupEmail} required onChange={this.handleChange} type="email" placeholder="Enter Email" />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid Email.
                                       </Form.Control.Feedback>

                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                                        </Form.Text>
                  </Form.Group>

                  {/* Password */}
                  <Form.Group controlId="signupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="signupPassword" value={this.state.signupPassword} required onChange={this.handleChange} type="password" placeholder="Enter Password" />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid Password.
                                       </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      Enter minimum 6 characters.
                                        </Form.Text>


                  </Form.Group>

                  {/* DOB */}
                  <Form.Group controlId="signupDob">
                    <Form.Label>DOB</Form.Label>
                    <Form.Control name="signupDob" value={this.state.signupDob} required onChange={this.handleChange} type="date" placeholder="Enter Date of Birth" />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid DOB.
                                       </Form.Control.Feedback>

                  </Form.Group>

                  {/* Gender */}
                  <Form.Group controlId="signupGender">
                    <fieldset>
                      <Form.Group>
                        <Form.Label as="legend" column sm={2}>
                          Gender
                                                </Form.Label>
                        <Col sm={10}>
                          <Form.Check
                            type="radio"
                            label="Male"
                            name="signupGender"
                            value="m"
                            onChange={this.handleChange}
                            required
                          />
                          <Form.Check
                            type="radio"
                            label="Female"
                            name="signupGender"
                            value="f"
                            onChange={this.handleChange}
                            required
                          />
                          <Form.Check
                            type="radio"
                            label="Others"
                            name="signupGender"
                            value="o"
                            onChange={this.handleChange}
                            required
                          />

                        </Col>
                      </Form.Group>
                    </fieldset>
                  </Form.Group>

                  {/* Mobile Number */}
                  <Form.Group controlId="signupMobile">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control name="signupMobile" value={this.state.signupMobile} required onChange={this.handleChange} type="number" placeholder="Enter Mobile Number" />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid Mobile Number.
                                       </Form.Control.Feedback>

                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                                    </Button>
                </Form>
              </Tab>

            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
                </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
                </Button>
          </Modal.Footer>
        </Modal>


      </>
    );
  }
}

export default LandingPage;