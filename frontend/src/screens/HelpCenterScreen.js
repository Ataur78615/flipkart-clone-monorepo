import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HelpCenterScreen = () => {
  const helpCategories = [
    {
      icon: 'fas fa-shopping-cart',
      title: 'Shopping',
      description: 'Browse products, add to cart, place orders',
      links: [
        { text: 'How to place an order', href: '/faq' },
        { text: 'Payment methods', href: '/faq' },
        { text: 'Order cancellation', href: '/faq' }
      ]
    },
    {
      icon: 'fas fa-truck',
      title: 'Shipping & Delivery',
      description: 'Track orders, delivery timelines, shipping charges',
      links: [
        { text: 'Track your order', href: '/trackorder' },
        { text: 'Delivery timelines', href: '/faq' },
        { text: 'Shipping charges', href: '/faq' }
      ]
    },
    {
      icon: 'fas fa-undo',
      title: 'Returns & Refunds',
      description: 'Return policy, refund process, exchange items',
      links: [
        { text: 'Return policy', href: '/returnpolicy' },
        { text: 'How to return', href: '/returnpolicy' },
        { text: 'Refund status', href: '/faq' }
      ]
    },
    {
      icon: 'fas fa-credit-card',
      title: 'Payments',
      description: 'Payment options, failed payments, refunds',
      links: [
        { text: 'Payment methods', href: '/faq' },
        { text: 'Failed payments', href: '/faq' },
        { text: 'Refund process', href: '/faq' }
      ]
    },
    {
      icon: 'fas fa-user',
      title: 'Account & Profile',
      description: 'Manage account, update profile, security',
      links: [
        { text: 'Update profile', href: '/profile' },
        { text: 'Change password', href: '/faq' },
        { text: 'Account security', href: '/faq' }
      ]
    },
    {
      icon: 'fas fa-headset',
      title: 'Customer Support',
      description: 'Contact support, raise complaints, feedback',
      links: [
        { text: 'Contact support', href: '/customercare' },
        { text: 'Raise complaint', href: '/customercare' },
        { text: 'Feedback', href: '/faq' }
      ]
    }
  ];

  return (
    <Container>
      <div className="text-center my-5">
        <h1 className="display-4 mb-3">Help Center</h1>
        <p className="lead text-muted">Find answers to your questions or get in touch with our support team</p>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search for help..."
                aria-label="Search help"
              />
              <Button variant="primary" size="lg">
                <i className="fas fa-search"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Row>
        {helpCategories.map((category, index) => (
          <Col key={index} lg={4} md={6} className="mb-4">
            <Card className="h-100 shadow-sm hover-card">
              <Card.Body className="text-center">
                <div className="mb-3">
                  <i className={`${category.icon} fa-3x text-primary`}></i>
                </div>
                <Card.Title className="h5 mb-3">{category.title}</Card.Title>
                <Card.Text className="text-muted mb-4">{category.description}</Card.Text>
                <div className="d-grid gap-2">
                  {category.links.map((link, linkIndex) => (
                    <LinkContainer key={linkIndex} to={link.href}>
                      <Button variant="outline-primary" size="sm" className="text-start">
                        {link.text}
                      </Button>
                    </LinkContainer>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center my-5">
        <Card className="bg-light">
          <Card.Body>
            <h3 className="mb-3">Still need help?</h3>
            <p className="mb-4">Our customer support team is here to assist you 24/7</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <LinkContainer to="/customercare">
                <Button variant="primary" size="lg">
                  <i className="fas fa-headset me-2"></i>
                  Contact Support
                </Button>
              </LinkContainer>
              <LinkContainer to="/faq">
                <Button variant="outline-primary" size="lg">
                  <i className="fas fa-robot me-2"></i>
                  Chat with Assistant
                </Button>
              </LinkContainer>
            </div>
          </Card.Body>
        </Card>
      </div>

      <style jsx>{`
        .hover-card {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }
        .display-4 {
          font-weight: 300;
          color: #333;
        }
        .lead {
          font-size: 1.25rem;
          font-weight: 300;
        }
      `}</style>
    </Container>
  );
};

export default HelpCenterScreen;
