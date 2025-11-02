// src/screens/OrderScreen.js

import React, { useState, useEffect, useReducer, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, ListGroup, Image, Card, Spinner, Alert } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// 1. Reducer banayein
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

      //Payment case
      case 'PAYPAL_REQUEST':
        return { ...state, loadingPay: true };
      case 'PAY_SUCCESS':
        return { ...state, loadingPay: false, order: { ...state.order, isPaid: true }};
      case 'PAY_FAIL':
        return { ...state, loadingPay: false, errorPay: action.payload };    
    default:
      return state;
  }
};

const OrderScreen = () => {
  const { id: orderId } = useParams(); // URL se order ID nikalo

  const { state: authState } = useContext(AuthContext);
  const { userInfo } = authState;

  // 2. useReducer setup karein
  const [{ loading, error, order, loadingPay, errorPay }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
    loadingPay: false,
    errorPay: '',
  });

  // PayPal Client ID ke liye state
  const [paypalClientId, setPaypalClientId] = useState(null);

  // 3. useEffect mein data fetch karein
  useEffect(() => {
    if (!userInfo) {
      return; // Agar logged in nahi hai toh kuch mat karo
    }

    const fetchOrderAndPaypalId = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });

        const config = { headers: { Authorization: `Bearer ${userInfo.token}`}};

        // Order fetch karo
        const { data: orderData } = await axios.get(`/api/orders/${orderId}`, config);
        dispatch({ type: 'FETCH_SUCCESS', payload: orderData });

        // client ID fetch karo
        const { data: clientId } = await axios.get('/api/config/paypal', config);
        setPaypalClientId(clientId);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchOrderAndPaypalId();
  }, [orderId, userInfo]);

  // 6.  PayPal ke function banayein

  function createOrder(data, actions) {
    // Order ki total value PayPal ko batao
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          },
        },
      ],
    });
  }

  async function onApprove(data, actions) {
    // Yeh function tab chalta hai jab payment successful ho
    const details = await actions.order.capture(); // Payment details capture karo

    try {
      dispatch({ type: 'PAYPAL_REQUEST' });

      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

      // Apne backend ko update karo
      await axios.put(`/api/orders/${orderId}/pay`, details, config);

      dispatch({ type: 'PAY_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'PAY_FAIL', payload: err.message });
    }
  }

  // 4. UI banayein
  return loading ? (
    <Spinner />
  ) : error ? (
    <Alert variant="danger">{error}</Alert>
  ) : (
    <Row>
      <h1>Order {order._id}</h1>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p><strong>Name: </strong> {order.user.name}</p>
            <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {/* Delivery Status */}
            {order.isDelivered ? (
              <Alert variant="success">Delivered on {order.deliveredAt}</Alert>
            ) : (
              <Alert variant="danger">Not Delivered</Alert>
            )}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p><strong>Method: </strong> {order.paymentMethod}</p>
            {/* Payment Status */}
            {order.isPaid ? (
              <Alert variant="success">Paid on {order.paidAt}</Alert>
            ) : (
              <Alert variant="danger">Not Paid</Alert>
            )}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            <ListGroup variant="flush">
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                    <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                    <Col md={4}>{item.qty} x ₹{item.price} = ₹{item.qty * item.price}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item><h2>Order Summary</h2></ListGroup.Item>
            <ListGroup.Item><Row><Col>Items:</Col><Col>₹{order.itemsPrice}</Col></Row></ListGroup.Item>
            <ListGroup.Item><Row><Col>Shipping:</Col><Col>₹{order.shippingPrice}</Col></Row></ListGroup.Item>
            <ListGroup.Item><Row><Col>Tax:</Col><Col>₹{order.taxPrice}</Col></Row></ListGroup.Item>
            <ListGroup.Item><Row><Col>Total:</Col><Col>₹{order.totalPrice}</Col></Row></ListGroup.Item>

            {/* YAHAN HUM PAYPAL BUTTONS DAALENGE */}
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Spinner />}
                {errorPay && <Alert variant="danger">{errorPay}</Alert>}
                {!paypalClientId ? (
                  <Spinner /> // Jab tak PayPal ki Client ID load na ho
                ) : (
                  <PayPalScriptProvider options={{ 'client-id': paypalClientId }}>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                    />
                  </PayPalScriptProvider>
                )}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderScreen;