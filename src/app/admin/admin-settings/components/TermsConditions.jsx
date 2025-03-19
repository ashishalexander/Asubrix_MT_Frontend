import { Card, Form } from 'react-bootstrap';
import { useState } from 'react';

const TermsConditions = () => {
  const [content, setContent] = useState('');

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Terms and Conditions saved:", content);
  };

  return (
    <Card>
      <Card.Header>
        <h4 className="card-title mb-0">Terms & Conditions</h4>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>Terms & Conditions Content</Form.Label>
            <Form.Control
              as="textarea"
              value={content}
              onChange={handleChange}
              rows={15}
              placeholder="Enter your terms and conditions content here..."
              className="mb-3"
            />
            <Form.Text className="text-muted">
              This content will be displayed on your Terms & Conditions page.
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

export default TermsConditions; 