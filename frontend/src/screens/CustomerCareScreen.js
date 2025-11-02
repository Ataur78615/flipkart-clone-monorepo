import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CustomerCareScreen = () => {
  return (
    <Container>
      <h1 className="my-4">24x7 Customer Care</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5>Contact Support</h5>
            </Card.Header>
            <Card.Body>
              <Alert variant="info">
                <h6>Currently MD ATAUR ANSARI customer associate are available</h6>
                <p>If your any query, connect with MD ATAUR ANSARI</p>
              </Alert>
              <p className="mb-0">
                Our customer care team is available 24 hours a day, 7 days a week to assist you with any questions or concerns.
              </p>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>
              <h5>Other Ways to Reach Us</h5>
            </Card.Header>
            <Card.Body>
              <p><strong>Email:</strong> support@flipkartclone.com</p>
              <p><strong>Phone:</strong> 1800-XXX-XXXX (Toll Free)</p>
              <p><strong>Live Chat:</strong> Available on our website during business hours</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <h5>Quick Links</h5>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li>
                  <LinkContainer to="/trackorder">
                    <a href="#track-order">Track Your Order</a>
                  </LinkContainer>
                </li>
                <li>
                  <LinkContainer to="/returnpolicy">
                    <a href="#return-policy">Return Policy</a>
                  </LinkContainer>
                </li>
                <li>
                  <LinkContainer to="/faq">
                    <a href="#faq">Frequently Asked Questions</a>
                  </LinkContainer>
                </li>
                <li>
                  <LinkContainer to="/helpcenter">
                    <a href="#help-center">Help Center</a>
                  </LinkContainer>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerCareScreen;
