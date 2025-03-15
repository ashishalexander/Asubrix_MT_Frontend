import { Col, Container, Row } from 'react-bootstrap'
import about6 from '@/assets/images/about/06.jpg'

const About = () => {
  return (
    <section className="pt-0 pt-md-5">
      <Container>
        {/* <Row className="mb-4">
          <Col lg={8}>
            <h2>About</h2>
          </Col>
        </Row> */}

        {/* First Section */}
        <Row className="align-items-start">
          <Col lg={5} className="position-relative">
            <img
              src={about6}
              className="rounded img-fluid w-75" // Reduced to 75% width
              style={{ maxHeight: '50%' }} // Limit height to half
              alt="about6"
            />
          </Col>
          <Col lg={7} className="mt-4 mt-lg-0">
            <h2 className="mb-3">35,000+ happy students joined with us to achieve their goals</h2>
            <p>
              Pudhuyugam Academy embarked on a resolute mission to deliver top-notch education for a spectrum of competitive examinations. Our academy
              has been on a transformative journey, sculpting the futures of aspirants by providing unparalleled guidance. Our mission extends beyond
              shaping futures; it aims to create opportunities for aspirants, especially those from rural areas, enabling them to flourish and excel
              in their competitive exam endeavors.
            </p>
            <p>
              Pudhuyugam Academy embarked on a resolute mission to deliver top-notch education for a spectrum of competitive examinations. Our academy
              has been on a transformative journey, sculpting the futures of aspirants by providing unparalleled guidance. Our mission extends beyond
              shaping futures; it aims to create opportunities for aspirants, especially those from rural areas, enabling them to flourish and excel
            </p>
          </Col>
        </Row>

        {/* Second Section */}
        <Row className="align-items-start mt-5">
          <Col lg={7} className="mt-4 mt-lg-0">
            <h2 className="mb-3">Our Vision</h2>
            <p>
              Our vision is to be a beacon of excellence in education, empowering individuals with the knowledge and skills needed to achieve their
              goals. We strive to create a learning environment that fosters innovation, critical thinking, and personal growth.
            </p>

            <h2 className="mb-3 mt-4">Our Mission</h2>
            <p>
              Our mission is to provide high-quality education and guidance for competitive examinations, ensuring that students—especially those from
              underserved communities—have the resources and mentorship needed to succeed. We are committed to shaping future leaders by instilling
              confidence and academic excellence.
            </p>

            <h2 className="mb-3 mt-4">Our Values</h2>
            <p>
              We believe in integrity, dedication, and inclusivity. Our core values drive us to maintain high educational standards, promote equal
              learning opportunities, and support students in their journey towards success.
            </p>
          </Col>
          <Col lg={5} className="position-relative">
            <img
              src={about6}
              className="rounded img-fluid w-75"
              style={{ maxHeight: '50%' }} // Limit height to half
              alt="about6"
            />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default About
