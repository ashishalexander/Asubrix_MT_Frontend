import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaClock, FaUserGraduate, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// This would typically come from an API or user's data
const enrolledCoursesData = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    image: 'https://placehold.co/600x400',
    progress: 75,
    instructor: 'John Doe',
    duration: '12 weeks',
    rating: 4.8,
    enrolled: 120,
    lastAccessed: '2 days ago'
  },
  {
    id: 2,
    title: 'Advanced Data Science with Python',
    image: 'https://placehold.co/600x400',
    progress: 45,
    instructor: 'Jane Smith',
    duration: '10 weeks',
    rating: 4.9,
    enrolled: 85,
    lastAccessed: '1 day ago'
  },
  {
    id: 3,
    title: 'UI/UX Design Fundamentals',
    image: 'https://placehold.co/600x400',
    progress: 30,
    instructor: 'Mike Johnson',
    duration: '8 weeks',
    rating: 4.7,
    enrolled: 95,
    lastAccessed: '3 days ago'
  }
];

const EnrolledCourses = () => {
  return (
    <section className="py-5 bg-white">
      <Container>
        <div className="mb-4">
          <h2 className="mb-0">Enrolled Courses</h2>
          <p className="text-muted">Continue your learning journey</p>
        </div>
        
        <Row className="g-4">
          {enrolledCoursesData.map((course) => (
            <Col sm={6} lg={4} key={course.id}>
              <Card className="h-100 shadow-sm hover-shadow transition-all border-0">
                <div className="position-relative">
                  <div 
                    className="card-img-top"
                    style={{
                      height: '160px',
                      backgroundImage: `url(${course.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <div className="progress position-absolute bottom-0 start-0 end-0" style={{ height: '5px', borderRadius: 0 }}>
                    <div 
                      className="progress-bar bg-success" 
                      role="progressbar" 
                      style={{ width: `${course.progress}%` }}
                      aria-valuenow={course.progress} 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                
                <Card.Body className="p-3">
                  <small className="text-muted d-block mb-2">
                    Last accessed {course.lastAccessed}
                  </small>
                  
                  <h5 className="card-title mb-2">
                    <Link to={`/student/course-resume?id=${course.id}`} className="text-dark text-decoration-none">
                      {course.title}
                    </Link>
                  </h5>
                  
                  <p className="text-muted small mb-2">
                    Instructor: {course.instructor}
                  </p>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center small">
                      <FaClock className="text-muted me-1" />
                      <span className="text-muted">{course.duration}</span>
                    </div>
                    <div className="d-flex align-items-center small">
                      <FaStar className="text-warning me-1" />
                      <span className="text-warning fw-bold">{course.rating}</span>
                    </div>
                  </div>
                </Card.Body>
                
                <Card.Footer className="bg-white border-0 p-3 pt-0">
                  <div className="d-grid">
                    <Link 
                      to={`/student/course-resume?id=${course.id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default EnrolledCourses; 