import { currency } from '@/context/constants'
import { getAllCourses } from '@/helpers/data'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'react-bootstrap'
import { FaRegBookmark, FaRegClock, FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { useFetchData } from '@/hooks/useFetchData'
const CourseCard = ({ course }) => {
  const { avatar, studentImage, rating, price, role, courseDuration, title, name, badge, duration } = course
  return (
    <Card className="shadow-hover overflow-hidden bg-transparent border border-light">
      <div className="position-relative">
        <img
          className="card-img-top"
          src={'https://cdn.prod.website-files.com/615fe732842b1953eb640cc2/64998eac013d863c5c51aab2_Foundation-course-Thumbnail.png'}
          alt="Card image"
        />
        <div className="bg-overlay bg-dark opacity-4" />
        <div className="card-img-overlay d-flex align-items-start flex-column">
          <div className="w-100 mt-auto d-inline-flex"></div>
        </div>
      </div>
      <CardBody>
        <div className="d-flex justify-content-between mb-3">
          <div className="hstack gap-2">
            <span className="badge bg-light text-dark border border-secondary fw-semibold">LIVE CLASS</span>
            <span className="badge bg-light text-dark border border-secondary fw-semibold">FREE CONTENT</span>
            <span className="badge bg-light text-dark border border-secondary fw-semibold">TESTS</span>
          </div>
        </div>

        <CardTitle>
          <Link to={'/pages/course/detail-adv'}>{title}</Link>
        </CardTitle>
        {/* <ul className="list-inline">
          <li className="list-inline-item h6 fw-light mb-0">{rating.star}</li>
          {Array(Math.floor(rating.star))
            .fill(0)
            .map((_star, idx) => (
              <li key={idx} className="list-inline-item me-1 small">
                <FaStar size={14} className="text-warning" />
              </li>
            ))}
          {!Number.isInteger(rating.star) && (
            <li className="list-inline-item me-1 small">
              <FaStarHalfAlt size={14} className="text-warning" />
            </li>
          )}
          {rating.star < 5 &&
            Array(5 - Math.ceil(rating.star))
              .fill(0)
              .map((_star, idx) => (
                <li key={idx} className="list-inline-item me-1 small">
                  <FaRegStar size={14} className="text-warning" />
                </li>
              ))}
          <li className="list-inline-item ms-2 text-reset">({rating.review})</li>
        </ul> */}

        <div className="text-danger  mb-2">
          <span className="me-1">🔥</span>
          <span>Extra 5% coupon discount</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="text-success mb-0">
            ₹{price}
            <span className="text-muted ms-2 h5">
              <del>₹{price + 100}</del>
            </span>
          </h4>
          {/* <span className="h6 fw-light mb-0 me-3">
            <FaRegClock className="text-danger me-2" />
            {duration}
          </span> */}
        </div>
      </CardBody>
    </Card>
  )
}
const FeaturedCourses = () => {
  const trendingCourses = useFetchData(getAllCourses)
  return (
    <section className="pt-0 pt-lg-5">
      <Container>
        <Row className="mb-4">
          <Col xs={6}>
            <h2 className="mb-0">Featured Courses</h2>
            <p className="text-muted">Find courses that are best for your profession</p>
          </Col>
          <Col xs={6} className="text-end">
            <Link to="/pages/course/grid-2" className="btn">
              View all
            </Link>
          </Col>
        </Row>
        <Row className="g-4">
          {trendingCourses?.slice(0, 3).map((course, idx) => (
            <Col md={6} xl={4} key={idx}>
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}
export default FeaturedCourses
