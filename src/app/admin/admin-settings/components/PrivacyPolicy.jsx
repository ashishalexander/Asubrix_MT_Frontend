import { Card, Form } from 'react-bootstrap';
import { useState } from 'react';

const PrivacyPolicy = () => {
  const [content, setContent] = useState('');

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Privacy Policy saved:", content);
  };

  return (
    <Card>
      <Card.Header>
        <h4 className="card-title mb-0">Privacy Policy</h4>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>Privacy Policy Content</Form.Label>
            <Form.Control
              as="textarea"
              value={content}
              onChange={handleChange}
              rows={15}
              placeholder="Enter your privacy policy content here..."
              className="mb-3"
            />
            <Form.Text className="text-muted">
              This content will be displayed on your Privacy Policy page.
            </Form.Text>
          </Form.Group>
          <div className="text-end">
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PrivacyPolicy; 