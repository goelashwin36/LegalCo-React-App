import React, { Component } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import '../../App.css';

class AppLayout extends Component {

    constructor() {
        super();
        
        this.state = {
            serviceForm: "",
            services: "",
            applications: "",
            profile: "",
            applicantName: "",
            applicantMobile: "",
            applicantServiceId: "",
            applicantDescription: "",
            applicantAddressLine1: "",
            applicantAddressLine2: "",
            applicantAddressCity: "",
            applicantAddressState: "",
            applicantAddressPin: ""

        }

    }

    componentWillMount() {
        axios.get(`https://legalcobackend.herokuapp.com/api/user/viewServices`)
            .then((res) => {
                // console.log("In then")
                console.log(res.data);
                if (res.data.meta.success === true) {
                    this.setState({ services: res.data.payload.services })
                    console.log(this.state.services)
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

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmitServiceForm = (event) => {

        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            this.setState({
                serviceForm: true
            })
            // event.preventDefault();
            event.stopPropagation();
        }
        else {
            let application = {
                "name": this.state.applicantName,
                "serviceId": this.state.applicantServiceId,
                "mobile": this.state.applicantMobile,
                "description": this.state.applicantDescription,
                "addressLine1": this.state.applicantAddressLine1,
                "addressLine2": this.state.applicantAddressLine2,
                "city": this.state.applicantAddressCity,
                "state": this.state.applicantAddressState,
                "pincode": this.state.applicantAddressPin
            }
            console.log("Application: ", application)
            // console.log(user);

            axios.post(`https://legalcobackend.herokuapp.com/api/user/requestService`, application)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.meta.success === true) {
                        alert(res.data.meta.message)
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
                <h1 className="heading">Request Service</h1>
                    <Row className="justify-content-md-center content">

                        <Col xs lg="8">
                            <Form noValidate validated={this.state.serviceForm} onSubmit={this.handleSubmitServiceForm} name="serviceForm">
                                {/* Name */}
                                <Form.Group controlId="applicantName">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control name="applicantName" value={this.state.applicantName} required onChange={this.handleChange} type="text" placeholder="Enter Name" />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid Name.
                                </Form.Control.Feedback>

                                </Form.Group>

                                {/* Mobile Number */}
                                <Form.Group controlId="applicantMobile">
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Form.Control name="applicantMobile" value={this.state.applicantMobile} required onChange={this.handleChange} type="text" placeholder="Enter Mobile Number" />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid Mobile Number.
                             </Form.Control.Feedback>


                                    {/* Services */}
                                    <Form.Group controlId="signupGender">
                                        <fieldset>
                                            <Form.Group>
                                                <Form.Label column sm={2}>
                                                    Services
                                                </Form.Label>
                                                <Col>

                                                    {Check}

                                                </Col>
                                            </Form.Group>
                                        </fieldset>
                                    </Form.Group>

                                    {/* Address */}
                                </Form.Group>

                                <Form.Group controlId="applicantAddressLine1">
                                    <Form.Label>Address Line 1</Form.Label>
                                    <Form.Control required name="applicantAddressLine1" value={this.state.applicantAddressLine1} onChange={this.handleChange} placeholder="1234 Main St" />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid Address.
                             </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="applicantAddressLine2">
                                    <Form.Label>Address Line 2 (Optional)</Form.Label>
                                    <Form.Control name="applicantAddressLine2" value={this.state.applicantAddressLine2} onChange={this.handleChange} placeholder="Apartment, studio, or floor" />
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="applicantAddressCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control name="applicantAddressCity" value={this.state.applicantAddressCity} required onChange={this.handleChange} placeholder="City" />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid City.
                                </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="applicantAddressState">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control name="applicantAddressState" value={this.state.applicantAddressState} required onChange={this.handleChange} as="select">
                                            <option value="Karnataka" selected>Karnataka</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Please select a State.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="applicantAddressPin">
                                        <Form.Label>Zip</Form.Label>
                                        <Form.Control name="applicantAddressPin" value={this.state.applicantAddressPin} required onChange={this.handleChange} placeholder="Pincode" />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid Pin Code.
                                    </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>


                                {/* Description */}
                                <Form.Group controlId="applicantDescription">
                                    <Form.Label>Any comments?</Form.Label>
                                    <Form.Control name="applicantDescription" value={this.state.applicantDescription} onChange={this.handleChange} type="text" placeholder="Enter Comments" />
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

export default AppLayout;