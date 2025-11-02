import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { state: cartState, dispatch: cartDispatch, itemsPrice, shippingPrice, taxPrice, totalPrice } = useContext(CartContext);
  const { cartItems, shippingAddress, paymentMethod } = cartState;

  const { state: authState } = useContext(AuthContext);
  const { userInfo } = authState;

  const placeOrderHandler = async () => {
    setError(null);
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
        },
        config
      );
      
      setLoading(false);
      cartDispatch({ type: 'CART_CLEAR_ITEMS' });
      navigate(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city},{' '}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Payment Method</h2>
            <strong>Method: </strong>
            {paymentMethod}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {cartItems.length === 0 ? (
              <Alert variant="info">Your cart is empty</Alert>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                      <Col><Link to={`/product/${item._id}`}>{item.name}</Link></Col>
                      <Col md={4}>{item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item><h2>Order Summary</h2></ListGroup.Item>
            <ListGroup.Item><Row><Col>Items:</Col><Col>₹{itemsPrice}</Col></Row></ListGroup.Item>
            <ListGroup.Item><Row><Col>Shipping:</Col><Col>₹{shippingPrice}</Col></Row></ListGroup.Item>
            <ListGroup.Item><Row><Col>Tax:</Col><Col>₹{taxPrice}</Col></Row></ListGroup.Item>
            <ListGroup.Item><Row><Col>Total:</Col><Col>₹{totalPrice}</Col></Row></ListGroup.Item>
            
            {error && <ListGroup.Item><Alert variant="danger">{error}</Alert></ListGroup.Item>}
            {loading && <ListGroup.Item><Spinner animation="border" /></ListGroup.Item>}

            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0 || loading}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default PlaceOrderScreen;