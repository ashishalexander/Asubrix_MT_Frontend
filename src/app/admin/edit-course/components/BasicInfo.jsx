import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { courseCategories } from '@/assets/data/products';
import { FaCloudUploadAlt } from 'react-icons/fa';

const BasicInfo = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories(prev => 
      prev.includes(value)
        ? prev.filter(cat => cat !== value)
        : [...prev, value]
    );
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <h4 className="mb-4">Basic Information</h4>
      
      <Form>
        {/* Course Name */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-medium">Course Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter course name"
            className="form-control-lg bg-light border-0"
          />
        </Form.Group>

        {/* Course Description */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-medium">Course Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={5}
            placeholder="Enter course description"
            className="bg-light border-0"
          />
        </Form.Group>

        {/* Thumbnail */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-medium">Course Thumbnail</Form.Label>
          <div className="position-relative">
            <div 
              className={`upload-box bg-light rounded-3 p-4 text-center ${thumbnail ? 'has-image' : ''}`}
              style={{
                border: '2px dashed #dee2e6',
                cursor: 'pointer'
              }}
              onClick={() => document.getElementById('thumbnail-input').click()}
            >
              {thumbnail ? (
                <img 
                  src={thumbnail} 
                  alt="Thumbnail Preview" 
                  className="img-fluid rounded-3"
                  style={{ maxHeight: '200px' }}
                />
              ) : (
                <div className="py-4">
                  <FaCloudUploadAlt className="display-4 text-muted mb-2" />
                  <p className="mb-0 text-muted">
                    Drag & drop or click to upload course thumbnail
                  </p>
                  <small className="text-muted d-block mt-2">
                    Supported formats: jpg, jpeg, png (Max size: 2MB)
                  </small>
                </div>
              )}
              <Form.Control
                type="file"
                id="thumbnail-input"
                className="d-none"
                accept="image/*"
                onChange={handleThumbnailChange}
              />
            </div>
          </div>
        </Form.Group>

        {/* Categories */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-medium">Categories</Form.Label>
          <div className="row g-3">
            {courseCategories.map((category) => (
              <div className="col-lg-4 col-md-6" key={category.id}>
                <div className="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`category-${category.id}`}
                    value={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onChange={handleCategoryChange}
                  />
                  <label 
                    className="form-check-label" 
                    htmlFor={`category-${category.id}`}
                  >
                    {category.title}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </Form.Group>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-3">
          <Button variant="light" className="px-4">
            Cancel
          </Button>
          <Button variant="dark" className="px-4">
            Save & Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BasicInfo; 