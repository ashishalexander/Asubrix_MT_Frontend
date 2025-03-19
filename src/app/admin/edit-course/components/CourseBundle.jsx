import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const CourseBundle = ({ setActiveStep, setProgress }) => {
  const [bundles, setBundles] = useState([
    {
      id: 1,
      name: '',
      description: '',
      courses: [],
      price: '',
      discount: 0
    }
  ]);

  const [availableCourses] = useState([
    { id: 1, title: 'React Fundamentals', price: '$49.99' },
    { id: 2, title: 'Advanced JavaScript', price: '$59.99' },
    { id: 3, title: 'Node.js Basics', price: '$39.99' },
    { id: 4, title: 'MongoDB Essentials', price: '$44.99' }
  ]);

  const handleAddBundle = () => {
    setBundles([...bundles, {
      id: bundles.length + 1,
      name: '',
      description: '',
      courses: [],
      price: '',
      discount: 0
    }]);
  };

  const handleRemoveBundle = (bundleId) => {
    setBundles(bundles.filter(bundle => bundle.id !== bundleId));
  };

  const handleBundleChange = (bundleId, field, value) => {
    setBundles(bundles.map(bundle =>
      bundle.id === bundleId ? { ...bundle, [field]: value } : bundle
    ));
  };

  const calculateEffectivePrice = (price, discount) => {
    const numPrice = parseFloat(price) || 0;
    const numDiscount = parseFloat(discount) || 0;
    return (numPrice - (numPrice * numDiscount / 100)).toFixed(2);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-1">Course Bundles</h4>
          <p className="text-muted mb-0">Create course bundles with special pricing (Optional)</p>
        </div>
        <Button 
          variant="primary" 
          className="rounded-pill d-flex align-items-center"
          onClick={handleAddBundle}
        >
          <FiPlus className="me-2" /> Add Bundle
        </Button>
      </div>

      {bundles.map(bundle => (
        <Card key={bundle.id} className="border-0 shadow-sm mb-4">
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-start mb-4">
              <h5 className="mb-0">Bundle #{bundle.id}</h5>
              <Button 
                variant="link" 
                className="text-danger p-0"
                onClick={() => handleRemoveBundle(bundle.id)}
              >
                <FiTrash2 />
              </Button>
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Bundle Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter bundle name"
                    value={bundle.name}
                    onChange={(e) => handleBundleChange(bundle.id, 'name', e.target.value)}
                    className="bg-light border-0"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter bundle description"
                    value={bundle.description}
                    onChange={(e) => handleBundleChange(bundle.id, 'description', e.target.value)}
                    className="bg-light border-0"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Select Courses</Form.Label>
                  <div className="bg-light rounded p-3">
                    {availableCourses.map(course => (
                      <Form.Check
                        key={course.id}
                        type="checkbox"
                        id={`course-${bundle.id}-${course.id}`}
                        label={
                          <div className="d-flex justify-content-between align-items-center w-100">
                            <span>{course.title}</span>
                            <span className="text-muted">{course.price}</span>
                          </div>
                        }
                        checked={bundle.courses.includes(course.id)}
                        onChange={(e) => {
                          const newCourses = e.target.checked
                            ? [...bundle.courses, course.id]
                            : bundle.courses.filter(id => id !== course.id);
                          handleBundleChange(bundle.id, 'courses', newCourses);
                        }}
                        className="mb-2"
                      />
                    ))}
                  </div>
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Bundle Price ($)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter bundle price"
                    value={bundle.price}
                    onChange={(e) => handleBundleChange(bundle.id, 'price', e.target.value)}
                    className="bg-light border-0"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Discount (%)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter discount percentage"
                    value={bundle.discount}
                    onChange={(e) => handleBundleChange(bundle.id, 'discount', e.target.value)}
                    className="bg-light border-0"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Effective Price</Form.Label>
                  <Form.Control
                    type="text"
                    value={`$${calculateEffectivePrice(bundle.price, bundle.discount)}`}
                    disabled
                    className="bg-light border-0"
                  />
                </Form.Group>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <Button 
          variant="light" 
          className="px-4 rounded-pill"
          onClick={() => setActiveStep(3)}
        >
          Previous
        </Button>
        <Button 
          variant="primary" 
          className="px-4 rounded-pill"
          onClick={() => {
            setProgress(100);
            // Handle form submission
          }}
        >
          Publish Course
        </Button>
      </div>
    </div>
  );
};

export default CourseBundle; 