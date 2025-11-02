import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#172337', color: '#ffffff', padding: '40px 0 20px' }}>
      <Container>
        <Row>
          <Col md={3}>
            <h5>About</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Contact Us</a></li>
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>About Us</a></li>
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Careers</a></li>
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Flipkart Stories</a></li>
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Press</a></li>
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Corporate Information</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Group Companies</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Myntra</a></li>
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Cleartrip</a></li>
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Shopsy</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Help</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Payments</a></li>
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Shipping</a></li>
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Cancellation & Returns</a></li>
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>FAQ</a></li>
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Report Infringement</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Consumer Policy</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Cancellation & Returns</a></li>
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Terms Of Use</a></li>
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Security</a></li>
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Privacy</a></li>
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Sitemap</a></li>
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Grievance Redressal</a></li>
              <li><a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>EPR Compliance</a></li>
            </ul>
          </Col>
        </Row>
        <hr style={{ borderColor: '#ffffff' }} />
        <Row>
          <Col md={6}>
            <h5>Mail Us:</h5>
            <p>
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India
            </p>
          </Col>
          <Col md={6}>
            <h5>Registered Office Address:</h5>
            <p>
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India<br />
              CIN : U51109KA2012PTC066107<br />
              Telephone: <a href="tel:044-45614700" style={{ color: '#ffffff' }}>044-45614700</a>
            </p>
          </Col>
        </Row>
        <hr style={{ borderColor: '#ffffff' }} />
        <Row>
          <Col className="text-center">
            <p>&copy; 2007-{new Date().getFullYear()} Flipkart.com</p>
            <p>Keep Shopping</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
