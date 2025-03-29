import React, { useEffect, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BsFillPinFill, BsShieldCheck, BsStopwatch, BsTag } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import './AboutAndNoticeBoard.scss'

const AboutAndNoticeBoard = () => {
  const notices = [
    { id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: '29 Mar 2025', tag: 'General' },
    { id: 2, text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '28 Mar 2025', tag: 'Important' },
    { id: 3, text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.', date: '26 Mar 2025', tag: 'Reminder' },
    { id: 4, text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.', date: '24 Mar 2025', tag: 'Event' },
    { id: 5, text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.', date: '22 Mar 2025', tag: 'Deadline' },
  ]

  const marqueeRef = useRef(null)

  useEffect(() => {
    if (marqueeRef.current) {
      const originalContent = marqueeRef.current.innerHTML
      marqueeRef.current.innerHTML = originalContent + originalContent

      marqueeRef.current.addEventListener('mouseenter', () => {
        marqueeRef.current.style.animationPlayState = 'paused'
      })

      marqueeRef.current.addEventListener('mouseleave', () => {
        marqueeRef.current.style.animationPlayState = 'running'
      })
    }
  }, [])

  return (
    <Container>
      <Row className="py-5">
        <Col lg={7}>
          <div className="p-4 d-flex flex-column">
            <h5>
              {/* <BsShieldCheck className="me-2" /> */}
              About Us
            </h5>
            <h3 className="mb-3">Welcome to pudhuyugam</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur illo, temporibus in sunt facere commodi quos ducimus ipsam! Officia
              amet ipsum perspiciatis repellat! Quos possimus dicta, similique dolor rerum laborum!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur illo, temporibus in sunt facere commodi quos ducimus ipsam! Officia
              amet ipsum perspiciatis repellat! Quos possimus dicta, similique dolor rerum laborum!
            </p>
            <div className="mt-2">
              <Link to="/about" className="btn btn-outline-primary">
                More about us
              </Link>
            </div>
          </div>
        </Col>

        <Col lg={5}>
          <div className="notice-board-wrapper">
              <h2 className="notice-head">
                <BsStopwatch className="me-2" /> Notice Board
              </h2>
            <div className="notice-board">
              <div className="notice-board-container">
                <div ref={marqueeRef} className="notice-board-marquee">
                  {notices.map((notice) => (
                    <div key={notice.id} className="notice-item">
                      <div className="d-flex">
                        <h5 className="text-primary">
                          <BsFillPinFill />
                        </h5>
                        <p className="mb-0 mx-1">{notice.text}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="notice-date">
                          <small>{notice.date}</small>
                        </span>
                        <span className="notice-tag">
                          <small>
                            <BsTag className="me-1" /> {notice.tag}
                          </small>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default AboutAndNoticeBoard
