import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await axios.post('/api/users/register', { name, email, password });
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
        <h1>Sign Up</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {loading && <Spinner animation="border" />}
        
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3" disabled={loading}>
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an Account?{' '}
            <Link to={redirectInUrl ? `/login?redirect=${redirectInUrl}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default RegisterScreen;