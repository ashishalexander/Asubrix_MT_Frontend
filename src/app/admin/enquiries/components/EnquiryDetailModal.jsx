import { colorVariants } from '@/context/constants';
import { timeSince } from '@/utils/date';
import { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaReply, FaUser } from 'react-icons/fa';

const EnquiryDetailModal = ({ show, onHide, enquiry }) => {
  const [status, setStatus] = useState(enquiry?.status || 'New');
  const [response, setResponse] = useState('');

  // Generate consistent avatar color based on name
  const nameHash = enquiry?.name?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
  const colorIndex = nameHash % colorVariants.length;
  const avatarColor = colorVariants[colorIndex];

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmitResponse = () => {
    // In a real application, this would send the response to the backend
    console.log('Sending response:', response);
    console.log('Updated status:', status);

    // Reset form and close modal
    setResponse('');
    onHide();
  };

  if (!enquiry) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="enquiry-detail-modal">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title as="h5">Enquiry Details</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="pt-0">
        <Row className="g-4">
          {/* Student Information */}
          <Col xs={12}>
            <div className="avatar-section">
              <div className="d-sm-flex align-items-center">
                <div className="avatar avatar-lg mb-3 mb-sm-0">
                  {enquiry.image ? (
                    <img 
                      className="avatar-img rounded-circle" 
                      src={enquiry.image} 
                      alt={`${enquiry.name}'s avatar`} 
                    />
                  ) : (
                    <div className={`avatar-img rounded-circle bg-${avatarColor} bg-opacity-10`}>
                      <span className={`position-absolute top-50 text-${avatarColor} start-50 translate-middle fw-bold`}>
                        {enquiry.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="ms-sm-3">
                  <h5 className="mb-1">{enquiry.name}</h5>
                  <p className="mb-0">
                    <span className="badge bg-light text-dark me-2">ID: {enquiry.id}</span>
                    <span className={`badge-status badge-${status.toLowerCase()}`}>
                      {status}
                    </span>
                  </p>
                </div>
                
                <div className="ms-auto">
                  <p className="mb-0 small text-muted">{timeSince(enquiry.time)} ago</p>
                </div>
              </div>
              
              <hr />
              
              <div className="enquiry-contact-info">
                <div className="contact-item">
                  <div className="icon-container icon-md bg-primary bg-opacity-10 rounded-circle text-primary">
                    <FaEnvelope />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0 fw-normal">Email</h6>
                    <a href={`mailto:${enquiry.email}`} className="text-body stretched-link">
                      {enquiry.email}
                    </a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="icon-container icon-md bg-primary bg-opacity-10 rounded-circle text-primary">
                    <FaPhone />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0 fw-normal">Phone</h6>
                    <a href={`tel:${enquiry.phone}`} className="text-body stretched-link">
                      {enquiry.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          
          {/* Message Content */}
          <Col xs={12}>
            <div className="enquiry-message-container">
              <h5 className="message-title">Message</h5>
              <p className="message-content">{enquiry.message}</p>
            </div>
          </Col>
          
          {/* Response Form */}
          <Col xs={12}>
            <div className="response-form">
              <h5 className="mb-3 d-flex align-items-center">
                <FaReply className="me-2 text-primary" />
                Respond to Enquiry
              </h5>
              
              <Form>
                <Row className="g-3">
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Update Status</Form.Label>
                      <Form.Select 
                        value={status} 
                        onChange={handleStatusChange}
                      >
                        <option value="New">New</option>
                        <option value="Pending">Pending</option>
                        <option value="Responded">Responded</option>
                        <option value="Closed">Closed</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Response Message</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={4}
                        placeholder="Type your response here..."
                        value={response}
                        onChange={handleResponseChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      
      <Modal.Footer className="border-0">
        <Button variant="secondary-soft" onClick={onHide}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmitResponse}
          disabled={!response.trim()}
        >
          Send Response
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EnquiryDetailModal; 