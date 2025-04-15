import { getAllInstructors } from '@/helpers/data';
import { useFetchData } from '@/hooks/useFetchData';
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import './instructorStyles.css';

const InstructorCard = ({ instructor }) => {
  const { image, name, college, department, rating } = instructor;
  
  return (
    <Card className="shadow h-100">
      <div className="instructor-image-wrapper">
        <img src={image} className="card-img-top instructor-image" alt={name} />
      </div>
      <CardBody className="text-center">
        <h5 className="card-title mb-1">
          <Link to="#" className="text-decoration-none">{name}</Link>
        </h5>
        <p className="text-muted small mb-2">{department}</p>
        {/* <div className="d-flex justify-content-center align-items-center">
          <span className="fw-bold me-2">{rating}</span>
          <FaStar className="text-warning" />
          <span className="small ms-2 text-muted">Professor at {college}</span>
        </div>
        <div className="mt-3">
          <ul className="list-inline mb-0">
            {socialMediaLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <li className="list-inline-item" key={idx}>
                  <Link className={clsx('mb-0 me-1', social.variant)} to="">
                    <Icon />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div> */}
      </CardBody>
    </Card>
  );
};

const InstructorLists = () => {
  const allInstructors = useFetchData(getAllInstructors);
  
  return (
    <section className="py-5">
      <Container>
        <Row className="g-4">
          {allInstructors?.map((instructor, idx) => (
            <Col xs={12} sm={6} lg={4} xl={3} key={idx}>
              <InstructorCard instructor={instructor} />
            </Col>
          ))}
        </Row>
        <div className="mt-5">
          {/* <Pagination /> */}
        </div>
      </Container>
    </section>
  );
};

export default InstructorLists;