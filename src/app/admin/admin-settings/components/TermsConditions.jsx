import { Card, Form } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const TermsConditions = () => {
  const [content, setContent] = useState('');
  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'align',
    'link'
  ];

  const handleChange = (value) => {
    setContent(value);
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
            <div className="mb-3">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                style={{ height: '300px', marginBottom: '40px' }}
              />
            </div>
            <Form.Text className="text-muted">
              This content will be displayed on your Terms & Conditions page.
            </Form.Text>
          </Form.Group>
          <div className="text-end mt-5">
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TermsConditions;