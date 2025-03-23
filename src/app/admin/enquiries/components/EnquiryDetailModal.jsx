/**
 * Component SCSS:
 * - Enquiry styles: src/assets/scss/components/_enquiries.scss
 * - Modal styles: src/assets/scss/components/_general.scss
 */

import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EnquiryDetailModal = ({ show, onHide, enquiry }) => {
  if (!enquiry) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Enquiry Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <h6>Student Information</h6>
          <p><strong>Name:</strong> {enquiry.name}</p>
          <p><strong>ID:</strong> {enquiry.id}</p>
          <p><strong>Email:</strong> {enquiry.email}</p>
          <p><strong>Phone:</strong> {enquiry.phone}</p>
        </div>

        <div className="mb-4">
          <h6>Message</h6>
          <p>{enquiry.message}</p>
        </div>

        <div>
          <h6>Status</h6>
          <Form.Select className="mb-3">
            <option value="New">New</option>
            <option value="Pending">Pending</option>
            <option value="Responded">Responded</option>
            <option value="Closed">Closed</option>
          </Form.Select>

          <Form.Group>
            <Form.Label>Response</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Type your response..." />
          </Form.Group>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary">
          Send Response
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EnquiryDetailModal; 