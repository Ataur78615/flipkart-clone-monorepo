import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

const TrackOrderScreen = () => {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError('Please enter a valid Order ID');
      return;
    }

    setLoading(true);
    setError('');
    setOrderStatus(null);

    try {
      // Simulate API call - replace with actual API endpoint
      const response = await fetch(`/api/orders/track/${orderId}`);
      if (!response.ok) {
        throw new Error('Order not found');
      }
      const data = await response.json();
      setOrderStatus(data);
    } catch (err) {
      setError('Unable to track order. Please check your Order ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Track Your Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5>Enter Order Details</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleTrackOrder}>
                <Form.Group className="mb-3">
                  <Form.Label>Order ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                  />
                  <Form.Text className="text-muted">
                    You can find your Order ID in the order confirmation email or on your order history page.
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Track Order'}
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {error && <Alert variant="danger">{error}</Alert>}

          {orderStatus && (
            <Card>
              <Card.Header>
                <h5>Order Status</h5>
              </Card.Header>
              <Card.Body>
                <p><strong>Order ID:</strong> {orderStatus.id}</p>
                <p><strong>Status:</strong> {orderStatus.status}</p>
                <p><strong>Estimated Delivery:</strong> {orderStatus.deliveryDate}</p>
                <p><strong>Current Location:</strong> {orderStatus.location}</p>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <h5>Need Help?</h5>
            </Card.Header>
            <Card.Body>
              <p>Can't find your Order ID?</p>
              <ul className="list-unstyled">
                <li>• Check your email for order confirmation</li>
                <li>• Visit your order history</li>
                <li>• Contact customer support</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TrackOrderScreen;
