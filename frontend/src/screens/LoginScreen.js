import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { search } = useLocation();
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { userInfo } = authState;

  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? `/${redirectInUrl}` : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      authDispatch({ type: 'LOGIN_SUCCESS', payload: data });
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
        <h1>Sign In</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {loading && <Spinner animation="border" />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" disabled={loading}>
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer?{' '}
            <Link to={redirectInUrl ? `/register?redirect=${redirectInUrl}` : '/register'}>
              Register
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LoginScreen;