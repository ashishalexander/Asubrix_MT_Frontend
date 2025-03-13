import { Col, Container, Row } from 'react-bootstrap'
import about6 from '@/assets/images/about/06.jpg'
import { BsPatchCheckFill } from 'react-icons/bs'
import { aboutData } from '../data'
const About = () => {
  return (
    <section className="pt-0 pt-md-5">
      <Container>
        <Row className="mb-4">
          <Col lg={8}>
            <h2>About Pudhuyugam Academy</h2>
            <p className="mb-0">
              How promotion excellent curiosity yet attempted happiness Gay prosperous impression had conviction For every delay death ask to style Me
              mean able my by in they Extremity now strangers contained.
            </p>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col lg={5} className="position-relative">
            <img src={about6} className="rounded" alt="about6" />
          </Col>
          <Col lg={7} className="mt-4 mt-lg-0">
            <h4 className="mb-3">35,000+ happy students joined with us to achieve their goals</h4>
            <p>
              Pudhuyugam Academy embarked on a resolute mission to deliver top-notch education for a spectrum of competitive examinations. Our
              academy has been on a transformative journey, sculpting the futures of aspirants by providing unparalleled guidance. Our mission extends
              beyond shaping futures; it aims to create opportunities for aspirants, especially those from rural areas, enabling them to flourish and
              excel in their competitive exam endeavors.
            </p>
            <ul className="list-group list-group-borderless mt-4">
              <li className="list-group-item d-flex">
                <BsPatchCheckFill className="text-success me-2" />
                Setup and installation takes less time
              </li>
              <li className="list-group-item d-flex">
                <BsPatchCheckFill className="text-success me-2" />
                Professional and easy to use software
              </li>
              <li className="list-group-item d-flex">
                <BsPatchCheckFill className="text-success me-2" />
                Perfect for any device with pixel-perfect design
              </li>
              <li className="list-group-item d-flex">
                <BsPatchCheckFill className="text-success me-2" />
                Setup and installation too fast
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="align-items-center">
        <Col lg={7} className="mt-4 mt-lg-0">
            <h4 className="mb-3">What Makes Us Different</h4>
            <p>
              Pudhuyugam Academy embarked on a resolute mission to deliver top-notch education for a spectrum of competitive examinations. Our
              academy has been on a transformative journey, sculpting the futures of aspirants by providing unparalleled guidance. Our mission extends
              beyond shaping futures; it aims to create opportunities for aspirants, especially those from rural areas, enabling them to flourish and
              excel in their competitive exam endeavors.
            </p>
          </Col>
          <Col lg={5} className="position-relative">
            <img src={about6} className="rounded" alt="about6" />
          </Col>
        </Row>
        
      </Container>
    </section>
  )
}
export default About
