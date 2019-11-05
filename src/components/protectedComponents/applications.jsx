import React, { Component } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

import '../../App.css';

class Applications extends Component {


  constructor() {
    super();
    axios.defaults.withcredentials = true
    this.state = {
      applications: "",

    }
  }

  componentWillMount() {

    axios.get(`https://legalcobackend.herokuapp.com/api/user/viewApplications`)
      .then((res) => {
        console.log(res.data);
        if (res.data.meta.success === true) {
          this.setState({ applications: res.data.payload.applications })
          console.log("Applications", this.state.applications)
        }
      }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          alert(error.response.data)
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);

      })

  }


  render() {

    let ApplicationsOpen = <p>Fetching Applications!!</p>
    let ApplicationsClosed = <p>Fetching Applications!!</p>

    if (this.state.applications) {

      ApplicationsOpen = this.state.applications.map((application, index) => {

        let Agent = application.status !== 'pending' ?
          <>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Agent Name</ListGroupItem>
              <ListGroupItem>Value</ListGroupItem>
            </ListGroup>

            <ListGroup className="list-group-flush">
              <ListGroupItem>Agent Phone Number</ListGroupItem>
              <ListGroupItem>Value</ListGroupItem>
            </ListGroup>
          </>

          : null
        return (

          application.status !== 'closed' ?

            <Col xs={10} sm={8} md={6}>
              <Card border="primary" >
                <Card.Body>
                  <Card.Title>{application.serviceId}</Card.Title>
                  <Card.Text>
                    {application.description}
                  </Card.Text>
                </Card.Body>

                <ListGroup className="list-group-flush">
                  <ListGroupItem className="list-head">Applicant Name</ListGroupItem>
                  <ListGroupItem>{application.applicantName}</ListGroupItem>
                </ListGroup>

                <ListGroup className="list-group-flush">
                  <ListGroupItem>Applicant Phone Number</ListGroupItem>
                  <ListGroupItem>{application.applicantMobile}</ListGroupItem>
                </ListGroup>

                {Agent}

                <ListGroup className="list-group-flush">
                  <ListGroupItem>Status</ListGroupItem>
                  <ListGroupItem>{application.status}</ListGroupItem>
                </ListGroup>

              </Card>
            </Col>
            : null
        )
      })


      ApplicationsClosed = this.state.applications.map((application, index) => {
        return (

          application.status === 'closed' ?

            <Col xs={10} sm={8} md={6}>
              <Card border="primary" >
                <Card.Body>
                  <Card.Title>{application.serviceId}</Card.Title>
                  <Card.Text>
                    {application.description}
                  </Card.Text>
                </Card.Body>

                <ListGroup className="list-group-flush">
                  <ListGroupItem className="list-head">Applicant Name</ListGroupItem>
                  <ListGroupItem>{application.applicantName}</ListGroupItem>
                </ListGroup>

                <ListGroup className="list-group-flush">
                  <ListGroupItem>Applicant Phone Number</ListGroupItem>
                  <ListGroupItem>{application.applicantMobile}</ListGroupItem>
                </ListGroup>

                <ListGroup className="list-group-flush">
                  <ListGroupItem>Agent Name</ListGroupItem>
                  <ListGroupItem>{application.agentName}</ListGroupItem>
                </ListGroup>

                <ListGroup className="list-group-flush">
                  <ListGroupItem>Agent Phone Number</ListGroupItem>
                  <ListGroupItem>{application.agentMobile}</ListGroupItem>
                </ListGroup>


                <ListGroup className="list-group-flush">
                  <ListGroupItem>Status</ListGroupItem>
                  <ListGroupItem>{application.status}</ListGroupItem>
                </ListGroup>

              </Card>
            </Col>
            : null
        )
      })

      console.log("ApplnClosed", ApplicationsClosed)
      console.log("ApplnOpen", ApplicationsOpen)

      let tempClose = 0
      let tempOpen = 0
      for (var i = 0; i < this.state.applications.length; i++) {
        if (ApplicationsClosed[i] != null) {
          tempClose += 1
          break
        }
      }

      for (var i = 0; i < this.state.applications.length; i++) {
        if (ApplicationsOpen[i] != null) {
          tempOpen += 1
          break

        }
      }

      if (tempClose === 0) {
        ApplicationsClosed = <p>No Applications found!!</p>
      }
      if (tempOpen === 0) {
        ApplicationsOpen = <p>No Applications found!!</p>
      }
    }

    return (

      <>
        <Container className="Container">

          <h1 className="heading">Applications</h1>
          <div className="content">

            <Tabs defaultActiveKey="Open" id="uncontrolled-tab-example">
              <Tab eventKey="Open" title="Open Application">
                <br />
                <Row className="justify-content-center">

                  {ApplicationsOpen}


                </Row>
              </Tab>


              <Tab eventKey="Closed" title="Closed Applications">
                <br />
                <Row className="justify-content-center">

                  {ApplicationsClosed}

                </Row>
              </Tab>

            </Tabs>
          </div>
        </Container>
      </>
    );
  }
}

export default Applications;