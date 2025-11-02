// src/components/Header.js
import React, { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Header.css'; // Hum yeh CSS file banayenge

const Header = () => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { userInfo } = authState;

  const { state: cartState } = useContext(CartContext);
  const { cartItems } = cartState;

  const logoutHandler = () => {
    authDispatch({ type: 'LOGOUT' });
  };

  return (
    <Navbar className="flipkart-navbar" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        {/* 1. Logo */}
        <LinkContainer to="/">
          <Navbar.Brand className="flipkart-logo">FlipkartClone</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* 2. Search Bar (Beech mein) */}
          <Form className="d-flex mx-auto flipkart-search">
            <FormControl
              type="search"
              placeholder="Search for products, brands and more"
              className="me-0 search-box"
              aria-label="Search"
            />
            <Button variant="light" className="search-btn">
              {/* Aapke code mein 'fas' icons the, isliye main wahi use kar raha hoon */}
              <i className="fas fa-search"></i>
            </Button>
          </Form>

          {/* 3. Links (Right mein) */}
          <Nav className="ms-auto align-items-center">
            
            {/* Login/Profile Dropdown */}
            {userInfo ? (
              <NavDropdown title={<><i className="fas fa-user me-1"></i>{userInfo.name}</>} id="username" className="nav-link-custom">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                {/* Ise white button jaisa look denge CSS se */}
                <Nav.Link className="login-btn-link">
                  <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg" alt="Login" className="nav-icon me-1" />
                  Login
                </Nav.Link>
              </LinkContainer>
            )}
            
            {/* --- YEH NAYA DROPDOWN ADD KAREIN --- */}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu">
                <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                {/* Yahan aap future mein 'Users' aur 'Orders' links bhi add kar sakte hain */}
              </NavDropdown>
            )}

            {/* Become a Seller */}
            <LinkContainer to="/seller">
              <Nav.Link className="nav-link-custom">
                <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-9eeae2.svg" alt="Become a Seller" className="nav-icon me-1" />
                Become a Seller
              </Nav.Link>
            </LinkContainer>

            {/* More Dropdown */}
            <NavDropdown title="More" id="more-dropdown" className="nav-link-custom">
              <LinkContainer to="/notifications">
                <NavDropdown.Item>Notification Preferences</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/customercare">
                <NavDropdown.Item>24x7 Customer Care</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/downloadapp">
                <NavDropdown.Item>Download App</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            {/* Cart */}
            <LinkContainer to="/cart">
              <Nav.Link className="nav-link-custom">
                <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg" alt="Cart" className="nav-icon me-1" />
                Cart
                {cartItems.length > 0 && (
                  // Cart count ko style karne ke liye custom badge
                  <span className="cart-badge">{cartItems.length}</span>
                )}
              </Nav.Link>
            </LinkContainer>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;