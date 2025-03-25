import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BsShieldCheck, BsStopwatch } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const AboutAndNoticeBoard = () => {
  return (
    <section className="w-100 pt-2 pb-4 bg-gray">
      <Container> {/* Added Container here */}
        <Row className="g-5 align-items-start">
          {/* About Section */}
          <Col lg={6}>
            <h5>About me</h5>
            <h2 className="mb-3">Welcome to pudhuyugam</h2>
            <p className="mb-3 mb-lg-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur illo, temporibus in sunt facere commodi quos ducimus ipsam! Officia
              amet ipsum perspiciatis repellat! Quos possimus dicta, similique dolor rerum laborum!
            </p>
            <p className="mb-3 mb-lg-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur illo, temporibus in sunt facere commodi quos ducimus ipsam! Officia
              amet ipsum perspiciatis repellat! Quos possimus dicta, similique dolor rerum laborum!
            </p>
            <Link to={'/pages/about/about-us'} className="btn btn-primary-soft mb-0 mt-3 mt-lg-4">
              More about us
            </Link>
          </Col>

          {/* Notice Board Section */}
          <Col lg={1}>
          </Col>
          <Col
            lg={5}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: 'white',
            }}>
            <div className="py-4">
              <h3 className="mb-3">Notice Board</h3>
              <div
                style={{
                  maxHeight: '300px',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <marquee direction="up" scrollamount="3" style={{ height: '250px' }}>
                  <p>
                    <strong>Notice #1:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <p>
                    <strong>Notice #2:</strong> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <p>
                    <strong>Notice #3:</strong> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
                  </p>
                  <p>
                    <strong>Notice #4:</strong> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
                  </p>
                  <p>
                    <strong>Notice #5:</strong> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.
                  </p>
                </marquee>
              </div>
            </div>
          </Col>
        </Row>
      </Container> {/* Closed Container here */}
    </section>
  )
}

export default AboutAndNoticeBoard
