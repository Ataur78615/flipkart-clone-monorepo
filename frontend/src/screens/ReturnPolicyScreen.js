import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';

const ReturnPolicyScreen = () => {
  return (
    <Container>
      <h1 className="my-4">Return & Refund Policy</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5>Easy Returns & Refunds</h5>
            </Card.Header>
            <Card.Body>
              <p>At Flipkart Clone, we want you to be completely satisfied with your purchase. If you're not happy with your order, you can return it within 30 days of delivery for a full refund or exchange.</p>
            </Card.Body>
          </Card>

          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Eligibility for Returns</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Items must be unused and in original packaging</li>
                  <li>Return within 30 days of delivery</li>
                  <li>Valid proof of purchase required</li>
                  <li>Items must be in saleable condition</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Non-Returnable Items</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Personal care items</li>
                  <li>Customized products</li>
                  <li>Digital downloads</li>
                  <li>Perishable goods</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>How to Return an Item</Accordion.Header>
              <Accordion.Body>
                <ol>
                  <li>Go to your orders page</li>
                  <li>Select the item you want to return</li>
                  <li>Choose your return reason</li>
                  <li>Pack the item securely</li>
                  <li>Drop it off at our pickup point or schedule a pickup</li>
                </ol>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Refund Process</Accordion.Header>
              <Accordion.Body>
                <p>Once we receive your return:</p>
                <ul>
                  <li>Refund will be processed within 5-7 business days</li>
                  <li>Amount will be credited to original payment method</li>
                  <li>You'll receive an email confirmation</li>
                  <li>Cash on Delivery orders will be refunded to bank account</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5>Contact Support</h5>
            </Card.Header>
            <Card.Body>
              <p>Need help with a return?</p>
              <p><strong>Email:</strong> returns@flipkartclone.com</p>
              <p><strong>Phone:</strong> 1800-XXX-XXXX</p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5>Quick Links</h5>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li><a href="/faq">Frequently Asked Questions</a></li>
                <li><a href="/customercare">Customer Care</a></li>
                <li><a href="/trackorder">Track Your Order</a></li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReturnPolicyScreen;
