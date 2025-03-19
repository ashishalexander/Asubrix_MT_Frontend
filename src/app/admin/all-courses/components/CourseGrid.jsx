import { Card, Col, Row, Badge } from 'react-bootstrap';
import { coursesData } from '@/assets/data/products';
import { FaClock, FaUserGraduate, FaStar } from 'react-icons/fa';

const CourseGrid = ({ searchQuery, sortBy, filters }) => {
  // Filter and sort courses
  const filteredCourses = coursesData
    .filter(course => {
      // Search filter
      if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (filters.category && course.category !== filters.category) {
        return false;
      }
      
      // Status filter
      if (filters.status && course.status !== filters.status) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'price_low_high':
          return a.price - b.price;
        case 'price_high_low':
          return b.price - a.price;
        case 'top_selling':
          return b.enrolled - a.enrolled;
        case 'most_popular':
          return b.rating.review - a.rating.review;
        case 'newest':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

  return (
    <Row className="g-4">
      {filteredCourses.map((course) => (
        <Col sm={6} lg={6} xl={4} key={course.id}>
          <Card className="h-100 shadow-sm hover-shadow transition-all border-0">
            <div className="position-relative">
              <div 
                className="card-img-top"
                style={{
                  height: '200px',
                  backgroundImage: `url(${course.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </div>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Badge 
                  bg="light"
                  className="text-dark px-3 py-2 rounded-pill fw-normal"
                >
                  {course.category}
                </Badge>
                <Badge 
                  bg={course.status === 'Live' ? 'success' : 'warning'} 
                  className="bg-opacity-10 px-3 py-2 rounded-pill"
                >
                  {course.status}
                </Badge>
              </div>
              
              <h5 className="card-title mb-3">
                <a href="#" className="text-dark text-decoration-none stretched-link hover-text">
                  {course.title}
                </a>
              </h5>
              
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-4">
                  <div className="d-flex align-items-center text-muted small">
                    <FaClock className="me-2" />
                    <span>{course.duration}</span>
                  </div>
                </li>
                <li className="list-inline-item me-4">
                  <div className="d-flex align-items-center text-muted small">
                    <FaUserGraduate className="me-2" />
                    <span>{course.enrolled.toLocaleString()}</span>
                  </div>
                </li>
                <li className="list-inline-item">
                  <div className="d-flex align-items-center small">
                    <FaStar className="me-2 text-warning" />
                    <span className="text-warning fw-bold">{course.rating.star}</span>
                  </div>
                </li>
              </ul>
            </Card.Body>
            <Card.Footer className="bg-transparent border-top p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <h4 className="mb-0 text-dark fw-bold">
                    ${course.price}
                  </h4>
                  {course.originalPrice && (
                    <span className="text-muted text-decoration-line-through ms-2">
                      ${course.originalPrice}
                    </span>
                  )}
                </div>
                <button className="btn btn-sm btn-dark rounded-pill px-3">
                  View Details
                </button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      ))}
      
      {filteredCourses.length === 0 && (
        <Col xs={12}>
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="fas fa-search fa-3x text-muted"></i>
            </div>
            <h4 className="text-muted">No courses found</h4>
            <p className="text-muted mb-0">Try adjusting your search or filter criteria</p>
          </div>
        </Col>
      )}
    </Row>
  );
};

export default CourseGrid; 