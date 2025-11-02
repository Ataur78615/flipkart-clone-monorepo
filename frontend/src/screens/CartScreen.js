import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Card, Alert } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

const CartScreen = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(CartContext);
    const { cartItems } = state;

    const removeFromCartHandler = (id) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: id });
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    };
    return (
        <Row>
            <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Alert variant='info'>
                    Your cart is empty <Link to="/">Go Back</Link>
                </Alert>
            ) : (
                <ListGroup variant='flush'>
                    {cartItems.map((item) => (
                        <ListGroup.Item key={item._id}>
                        <Row className='align-items-center'>
                            <Col md={2}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col md={3}>
                               <Link to={`/product/${item._id}`}>{item.name}</Link>
                               </Col>
                               <Col md={2}>₹{item.price}</Col>
                               <Col md={2}>{item.qty}</Col>
                               <Col md={2}>
                                   <Button
                                       type='button'
                                       variant='light'
                                       onClick={() => removeFromCartHandler(item._id)}
                                   >
                                       <i className='fas fa-trash'></i>
                                   </Button>
                               </Col>
                        </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
            </Col>
            <Col md={4}>
             <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>
                            subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                        </h2>
                        ₹{cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button 
                         type="button"
                         className='btn-block'
                         disabled={cartItems.length === 0}
                         onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
             </Card>
            </Col>
        </Row>
    );
};

export default CartScreen;