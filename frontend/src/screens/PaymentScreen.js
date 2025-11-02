import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(CartContext);
  const { shippingAddress, paymentMethod } = state;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    navigate('/placeorder');
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethodName === 'PayPal'}
                onChange={(e) => setPaymentMethodName(e.target.value)}
              ></Form.Check>
              {/* Aap yahan aur bhi options add kar sakte hain */}
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Continue
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default PaymentScreen;