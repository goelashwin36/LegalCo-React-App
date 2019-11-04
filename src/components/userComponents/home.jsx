import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import '../../App.css';
class Home extends Component {
  render() {
    return (
      <div>
        <Container className="Container">
          <h1 className="heading">Welcome to LegalCo</h1>

          <p className="content">All your legal solutions are just one click away!<br /><br />
            Get to know your legal service providers nearest to you in the comfort of your own home.<br />
            We connect you to our professionals who will guide and help you with your documentation regarding all legal matters in the most hassle free way.<br /><br />
            Sign Up to get started!</p>

          <h2 className="heading">About Us</h2>

          <p className="content">
            LegalCo is a legal service providing company started in October 2019.<br /> 
            The company was established with the aim of providing a single online platform for connecting legal service providers with the common people inorder to get their legal work done at affordable rates.<br />
    In today’s fast-paced world, most individuals don’t find enough time to tackle required documentation like getting their passports updated or Visas made.<br />
     LegalCo connects professionals in the field with the customers. Each customer’s application will be accepted within 24 hours by the Agent nearest to them. These Agents come to the customer’s doorstep, collects their documents and guides them in tackling the necessary work. The details of the Agents will be available with the customer and they are legally bound to safeguard the documents and its contents, hence proving to be <b>100%</b> trustworthy. The company’s capable customer service will address any issues or queries as quickly as possible.
        </p>
        </Container>
      </div>
    );
  }
}

export default Home;