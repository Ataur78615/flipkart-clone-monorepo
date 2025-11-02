import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

const DownloadAppScreen = () => {
  return (
    <Container>
      <h1 className="my-4">Download App</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5>Get the Flipkart Clone App</h5>
            </Card.Header>
            <Card.Body>
              <Alert variant="warning">
                <h6>App version coming soon</h6>
                <p>We're working hard to bring you the best mobile shopping experience. Stay tuned for updates!</p>
              </Alert>
              <p>
                Download our app for a seamless shopping experience with exclusive mobile-only deals,
                faster checkout, and personalized recommendations.
              </p>
              <div className="d-flex gap-2">
                <Button variant="dark" disabled>
                  <i className="fab fa-google-play me-2"></i>
                  Google Play
                </Button>
                <Button variant="dark" disabled>
                  <i className="fab fa-app-store-ios me-2"></i>
                  App Store
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <h5>App Features</h5>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li>✓ Exclusive mobile deals</li>
                <li>✓ Faster checkout</li>
                <li>✓ Push notifications</li>
                <li>✓ Voice search</li>
                <li>✓ AR product view</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DownloadAppScreen;
