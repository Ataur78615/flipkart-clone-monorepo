import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

const FAQScreen = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your Flipkart assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Predefined FAQ responses based on common Flipkart queries
  const faqResponses = {
    'order': 'For order-related queries, you can track your order using the Order ID from your confirmation email. Visit the Track Order page for real-time updates.',
    'return': 'Our return policy allows returns within 30 days of delivery. Items must be unused and in original packaging. Visit our Return Policy page for detailed information.',
    'refund': 'Refunds are processed within 5-7 business days after we receive your return. The amount will be credited to your original payment method.',
    'delivery': 'Standard delivery takes 3-5 business days. Express delivery is available for select items. You can track your order status in real-time.',
    'payment': 'We accept all major credit/debit cards, UPI, net banking, and Cash on Delivery. All transactions are secure and encrypted.',
    'cancel': 'Orders can be cancelled within 1 hour of placement. Go to your orders page and select the cancel option.',
    'exchange': 'Exchanges are available for size/color issues within 7 days of delivery. Contact customer support for assistance.',
    'warranty': 'Most electronic items come with manufacturer warranty. Check product details for warranty information.',
    'support': 'Our customer support is available 24/7. You can reach us via email, phone, or live chat.',
    'default': 'I\'m here to help with your Flipkart queries. Please ask about orders, returns, payments, or any other shopping-related questions!'
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(faqResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }
    return faqResponses.default;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const botResponse = { text: getBotResponse(inputMessage), sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
      setLoading(false);
    }, 1000);
  };

  return (
    <Container>
      <h1 className="my-4">Frequently Asked Questions</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5>Chat with our Assistant</h5>
            </Card.Header>
            <Card.Body style={{ height: '400px', overflowY: 'auto' }}>
              <div className="chat-messages">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                    <div className={`message-bubble ${message.sender}`}>
                      {message.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="message bot-message">
                    <div className="message-bubble bot">
                      <Spinner animation="border" size="sm" /> Typing...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </Card.Body>
            <Card.Footer>
              <Form onSubmit={handleSendMessage}>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Ask me anything about orders, returns, payments..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    disabled={loading}
                  />
                  <Button variant="primary" type="submit" disabled={loading || !inputMessage.trim()}>
                    Send
                  </Button>
                </div>
              </Form>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5>Popular Topics</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" size="sm" onClick={() => setInputMessage('How do I track my order?')}>
                  Track Order
                </Button>
                <Button variant="outline-primary" size="sm" onClick={() => setInputMessage('What is the return policy?')}>
                  Return Policy
                </Button>
                <Button variant="outline-primary" size="sm" onClick={() => setInputMessage('How do I cancel an order?')}>
                  Cancel Order
                </Button>
                <Button variant="outline-primary" size="sm" onClick={() => setInputMessage('Payment methods')}>
                  Payment Options
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5>Need More Help?</h5>
            </Card.Header>
            <Card.Body>
              <p>Can't find what you're looking for?</p>
              <p><strong>Call us:</strong> 1800-XXX-XXXX</p>
              <p><strong>Email:</strong> support@flipkartclone.com</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style jsx>{`
        .chat-messages {
          padding: 10px;
        }
        .message {
          margin-bottom: 15px;
          display: flex;
        }
        .user-message {
          justify-content: flex-end;
        }
        .bot-message {
          justify-content: flex-start;
        }
        .message-bubble {
          max-width: 70%;
          padding: 10px 15px;
          border-radius: 18px;
          word-wrap: break-word;
        }
        .message-bubble.user {
          background-color: #007bff;
          color: white;
        }
        .message-bubble.bot {
          background-color: #f8f9fa;
          color: #333;
        }
      `}</style>
    </Container>
  );
};

export default FAQScreen;
