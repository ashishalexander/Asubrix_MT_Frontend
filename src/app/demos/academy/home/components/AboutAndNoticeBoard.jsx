import React from 'react'
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap'
import { BsShieldCheck, BsStopwatch } from 'react-icons/bs'
import { FaCheckCircle } from 'react-icons/fa'
import clsx from 'clsx'
import about1 from '@/assets/images/about/01.jpg'
import about2 from '@/assets/images/about/02.jpg'
import { Link } from 'react-router-dom'

const aboutData = [
  { title: 'Our Vision', subTitle: 'Future ready', icon: BsStopwatch, variant: 'bg-primary' },
  { title: 'Our Mission', subTitle: 'Quality education', icon: BsShieldCheck, variant: 'bg-success' },
]

const AboutAndNoticeBoard = () => {
  return (
    <section className="w-100 py-5 bg-gray">
      <div className="mx-5">
        <Row className="g-5 align-items-start">
          {/* About Section */}
          <Col lg={8}>
            <Row className="g-md-5 align-items-center">
              <Col lg={6} className="mb-3 mb-lg-0">
                <Row className="mt-4 mt-md-0">
                  <Col xs={6}>
                    <img className="rounded" src={about1} alt="about" />
                  </Col>
                  <Col xs={6} className="mt-5 position-relative">
                    <img className="rounded" src={about2} alt="about" />
                  </Col>
                  <Col xs={8} sm={5} className="mt-n6 align-items-end position-relative">
                    <Card className="p-3 card-body shadow rounded-3 d-inline-block position-relative mt-n2">
                      <h6 className="mb-2">
                        Lorem
                        <span className="ms-1">
                          <FaCheckCircle className="text-success" />
                        </span>
                      </h6>
                      <p className="mb-0 small">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '100%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: '#0d6efd',
                          borderRadius: '50%',
                          padding: '10px',
                        }}>
                        <BsShieldCheck style={{ color: 'white' }} />
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col lg={6} className="mt-5 mt-lg-0">
                <h2 className="mb-3">Welcome to Puthuyugam</h2>
                <p className="mb-3 mb-lg-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur illo, temporibus in sunt facere commodi quos ducimus ipsam!
                  Officia amet ipsum perspiciatis repellat! Quos possimus dicta, similique dolor rerum laborum!
                </p>
                <Row className="g-4">
                  {aboutData.map((about, idx) => {
                    const Icon = about.icon
                    return (
                      <Col xs={6} key={idx}>
                        <div className="d-sm-flex align-items-center">
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              borderRadius: '50%',
                              backgroundColor: about.variant === 'bg-primary' ? '#0d6efd' : '#198754',
                            }}>
                            <Icon />
                          </div>
                          <div className="ms-0 ms-sm-3 mt-2 mt-sm-0">
                            <h6 className="mb-0">{about.title}</h6>
                            <div className="small">
                              <BsStopwatch className="me-2" />
                              {about.subTitle}
                            </div>
                          </div>
                        </div>
                      </Col>
                    )
                  })}
                </Row>
                <Link to={'/pages/about/about-us'} className="btn btn-primary-soft mb-0 mt-3 mt-lg-4">
                  More about us
                </Link>
              </Col>
            </Row>
          </Col>

          {/* Notice Board Section */}
          <Col
            lg={4}
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
                  overflowY: 'auto',
                  paddingRight: '5px',
                }}>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item
                    eventKey="0"
                    style={{
                      border: 'none',
                      boxShadow: 'none',
                      backgroundColor: 'transparent',
                    }}>
                    <Accordion.Header>Notice #1</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Accordion.Body>
                  </Accordion.Item>
                  <hr />
                  <Accordion.Item
                    eventKey="1"
                    style={{
                      border: 'none',
                      boxShadow: 'none',
                      backgroundColor: 'transparent',
                    }}>
                    <Accordion.Header>Notice #2</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Accordion.Body>
                  </Accordion.Item>
                  <hr />
                  <Accordion.Item
                    eventKey="2"
                    style={{
                      border: 'none',
                      boxShadow: 'none',
                      backgroundColor: 'transparent',
                    }}>
                    <Accordion.Header>Notice #3</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Accordion.Body>
                  </Accordion.Item>
                  <hr />
                  <Accordion.Item
                    eventKey="3"
                    style={{
                      border: 'none',
                      boxShadow: 'none',
                      backgroundColor: 'transparent',
                    }}>
                    <Accordion.Header>Notice #4</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Accordion.Body>
                  </Accordion.Item>
                  <hr />
                  <Accordion.Item
                    eventKey="4"
                    style={{
                      border: 'none',
                      boxShadow: 'none',
                      backgroundColor: 'transparent',
                    }}>
                    <Accordion.Header>Notice #5</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default AboutAndNoticeBoard
