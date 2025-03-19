import { Form } from 'react-bootstrap';
import { courseCategories } from '@/assets/data/products';

const statusOptions = [
  { value: 'published', label: 'Published' },
  { value: 'private', label: 'Private' },
  { value: 'unpublished', label: 'Unpublished' },
  { value: 'expired', label: 'Expired' }
];

const CourseFilters = ({ filters, setFilters }) => {
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="filter-group">
      {/* Categories */}
      <div className="mb-4">
        <label className="form-label fw-medium mb-2">Categories</label>
        <Form.Select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="form-select-sm border-0 bg-light"
        >
          <option value="">All Categories</option>
          {courseCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </Form.Select>
      </div>

      {/* Sub Categories */}
      <div className="mb-4">
        <label className="form-label fw-medium mb-2">Sub Categories</label>
        <Form.Select
          value={filters.subCategory}
          onChange={(e) => handleFilterChange('subCategory', e.target.value)}
          className="form-select-sm border-0 bg-light"
          disabled={!filters.category}
        >
          <option value="">All Sub Categories</option>
          {/* Add sub-categories based on selected category */}
        </Form.Select>
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="form-label fw-medium mb-2">Course Status</label>
        <Form.Select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="form-select-sm border-0 bg-light"
        >
          <option value="">All Status</option>
          {statusOptions.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </Form.Select>
      </div>

      {/* Clear Filters Button */}
      <button
        className="btn btn-link btn-sm text-dark p-0 text-decoration-none"
        onClick={() => setFilters({
          category: '',
          subCategory: '',
          status: ''
        })}
      >
        <i className="fas fa-undo-alt me-2"></i>
        Reset Filters
      </button>
    </div>
  );
};

export default CourseFilters; 