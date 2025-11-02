import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const NotificationScreen = () => {
  return (
    <Container>
      <h1 className="my-4">Notification Preferences</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5>Email Notifications</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Check
                  type="switch"
                  id="email-orders"
                  label="Order updates and delivery notifications"
                  defaultChecked
                />
                <Form.Check
                  type="switch"
                  id="email-promotions"
                  label="Promotional offers and deals"
                />
                <Form.Check
                  type="switch"
                  id="email-reviews"
                  label="Product reviews and feedback requests"
                />
              </Form>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>
              <h5>SMS Notifications</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Check
                  type="switch"
                  id="sms-orders"
                  label="Order status updates"
                />
                <Form.Check
                  type="switch"
                  id="sms-security"
                  label="Security alerts"
                  defaultChecked
                />
              </Form>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>
              <h5>Push Notifications</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Check
                  type="switch"
                  id="push-app"
                  label="App notifications for new features"
                />
                <Form.Check
                  type="switch"
                  id="push-cart"
                  label="Cart reminders"
                />
              </Form>
            </Card.Body>
          </Card>

          <Button variant="primary" className="mb-4">
            Save Preferences
          </Button>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <h5>Help</h5>
            </Card.Header>
            <Card.Body>
              <p>Manage how you receive notifications from Flipkart Clone.</p>
              <p>You can opt-in or opt-out of different types of notifications at any time.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotificationScreen;
