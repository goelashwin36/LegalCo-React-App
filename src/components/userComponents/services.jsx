import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

import '../../App.css';
class Home extends Component {
  render() {
    return (
      <div>
        <Container className="Container">
          <h1 className="heading">Services</h1>


          <p className="content">
            You can choose from our range of services.
        </p>

         
          {/* Passport */}
          <Row className="justify-content-center">

          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="images/passport.jpg" />
            <Card.Body>
              <Card.Title>Passport</Card.Title>
              {/* <Card.Text>
                Hola
            </Card.Text> */}
            </Card.Body>
          </Card>

          {/* Visa */}

          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="images/visa.jpg" />
            <Card.Body>
              <Card.Title>Visa</Card.Title>
              {/* <Card.Text>
                Hola
            </Card.Text> */}
            </Card.Body>
          </Card>

          {/* DL */}

          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="images/dl.jpg" />
            <Card.Body>
              <Card.Title>Driving License</Card.Title>
              {/* <Card.Text>
                Hola
            </Card.Text> */}
            </Card.Body>
          </Card>

          {/* Adhaar Card */}
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="images/adhaar.jpg" />
            <Card.Body>
              <Card.Title>Adhaar Card</Card.Title>
              {/* <Card.Text>
                Hola
            </Card.Text> */}
            </Card.Body>
          </Card>

          {/* Pan Card */}

          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="images/pan.jpg" />
            <Card.Body>
              <Card.Title>Pan Card</Card.Title>
              {/* <Card.Text>
                Hola
            </Card.Text> */}
            </Card.Body>
          </Card>

          </Row>


        </Container>
      </div>
    );
  }
}

export default Home;