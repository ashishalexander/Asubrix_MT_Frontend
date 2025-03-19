import React, { useState, useEffect, useRef } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCalendar, FaUserCircle, FaUpload } from 'react-icons/fa';

const StudentForm = ({ student, onSubmit }) => {
  const fileInputRef = useRef(null);
  
  const initialFormState = {
    name: '',
    email: '',
    phone: '',
    courses: [],
    status: 'active',
    paymentStatus: 'paid',
    avatar: 'default'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [validated, setValidated] = useState(false);
  
  // Sample course options
  const courseOptions = [
    { id: 1, name: 'Advanced JavaScript' },
    { id: 2, name: 'React Development' },
    { id: 3, name: 'Python for Data Science' },
    { id: 4, name: 'Web Development Bootcamp' },
    { id: 5, name: 'SQL Database Design' },
    { id: 6, name: 'Machine Learning Fundamentals' },
    { id: 7, name: 'Mobile App Development with Flutter' },
    { id: 8, name: 'AWS Certification Course' }
  ];

  // If student prop exists, initialize form with student data
  useEffect(() => {
    if (student) {
      setFormData({
        id: student.id,
        enrollmentId: student.enrollmentId,
        name: student.name,
        email: student.email,
        phone: student.phone,
        courses: student.courses,
        status: student.status,
        paymentStatus: student.paymentStatus,
        avatar: student.avatar,
        enrollmentDate: student.enrollmentDate
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCourseChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData(prevState => ({
      ...prevState,
      courses: selectedOptions
    }));
  };

  const handleAvatarChange = () => {
    setFormData(prevState => ({
      ...prevState,
      avatar: 'default'
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prevState => ({
          ...prevState,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    onSubmit(formData);
  };

  const getAvatarDisplay = () => {
    if (formData.avatar === 'default' || formData.avatar === 'default-male' || formData.avatar === 'default-female' || formData.avatar === 'default-neutral') {
      return <FaUserCircle size={80} className="text-primary" />;
    } else if (formData.avatar && formData.avatar.startsWith('data:')) {
      return <img src={formData.avatar} alt="Uploaded avatar" className="rounded-circle" width="120" height="120" />;
    } else {
      return <img src={formData.avatar} alt="Student avatar" className="rounded-circle" width="120" height="120" />;
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-4">
        <Col md={3} className="d-flex flex-column align-items-center">
          <div className="position-relative mb-3 d-flex justify-content-center align-items-center" style={{ width: 120, height: 120, border: '1px solid #ddd', borderRadius: '50%' }}>
            {getAvatarDisplay()}
          </div>
          <div className="mb-3">
            <Button 
              variant="outline-primary"
              size="sm"
              onClick={handleAvatarChange}
              title="Reset to default avatar"
              className="w-100"
            >
              <FaUserCircle className="me-2" /> Default Profile
            </Button>
          </div>
          <Button 
            variant="outline-success" 
            size="sm" 
            className="w-100"
            onClick={triggerFileInput}
          >
            <FaUpload className="me-2" /> Upload Photo
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="d-none"
            accept="image/*"
            onChange={handleFileUpload}
          />
          <Form.Text className="text-muted mt-1 text-center">
            PNG, JPG (max. 1MB)
          </Form.Text>
        </Col>
        <Col md={9}>
          <Row className="g-3">
            <Col md={12}>
              <Form.Group controlId="studentName">
                <Form.Label>Full Name</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text className="bg-light">
                    <FaUser />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter full name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="studentEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text className="bg-light">
                    <FaEnvelope />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="studentPhone">
                <Form.Label>Phone Number</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text className="bg-light">
                    <FaPhone />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid phone number.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            
            <Col md={12}>
              <Form.Group controlId="studentCourses">
                <Form.Label>Courses</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text className="bg-light">
                    <FaGraduationCap />
                  </InputGroup.Text>
                  <Form.Select
                    required
                    multiple
                    name="courses"
                    value={formData.courses}
                    onChange={handleCourseChange}
                    style={{ height: '120px' }}
                  >
                    {courseOptions.map(course => (
                      <option key={course.id} value={course.name}>
                        {course.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select at least one course.
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Text className="text-muted">
                  Hold Ctrl (or Cmd) to select multiple courses
                </Form.Text>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="studentStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="paymentStatus">
                <Form.Label>Payment Status</Form.Label>
                <Form.Select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                >
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            {student && (
              <Col md={6}>
                <Form.Group controlId="enrollmentDate">
                  <Form.Label>Enrollment Date</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-light">
                      <FaCalendar />
                    </InputGroup.Text>
                    <Form.Control
                      type="date"
                      name="enrollmentDate"
                      value={formData.enrollmentDate}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            )}
          </Row>
        </Col>
      </Row>

      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button variant="outline-secondary" onClick={() => onSubmit(null)}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {student ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </Form>
  );
};

export default StudentForm; 