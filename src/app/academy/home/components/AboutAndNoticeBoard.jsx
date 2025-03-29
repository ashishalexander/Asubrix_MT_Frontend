import React, { useEffect, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BsFillPinFill, BsShieldCheck, BsStopwatch, BsTag } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const AboutAndNoticeBoard = () => {
  // Sample notices with dates and tags
  const notices = [
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '29 Mar 2025',
      tag: 'General',
    },
    {
      id: 2,
      text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: '28 Mar 2025',
      tag: 'Important',
    },
    {
      id: 3,
      text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
      date: '26 Mar 2025',
      tag: 'Reminder',
    },
    {
      id: 4,
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
      date: '24 Mar 2025',
      tag: 'Event',
    },
    {
      id: 5,
      text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
      date: '22 Mar 2025',
      tag: 'Deadline',
    },
  ]

  // Reference to the marquee container
  const marqueeRef = useRef(null)

  useEffect(() => {
    // Create a duplicate of the content for seamless scrolling
    if (marqueeRef.current) {
      const originalContent = marqueeRef.current.innerHTML
      marqueeRef.current.innerHTML = originalContent + originalContent

      // Pause animation on hover
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
      {/* Added Container here */}
      {/* About Section */}
      <Row className="py-5">
        <Col lg={7}>
          <div className="p-4">
            <h2 className="mb-4">
              <BsShieldCheck className="me-2" />
              About me
            </h2>
            <h4 className="mb-3">Welcome to pudhuyugam</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur illo, temporibus in sunt facere commodi quos ducimus ipsam! Officia
              amet ipsum perspiciatis repellat! Quos possimus dicta, similique dolor rerum laborum!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur illo, temporibus in sunt facere commodi quos ducimus ipsam! Officia
              amet ipsum perspiciatis repellat! Quos possimus dicta, similique dolor rerum laborum!
            </p>
            <div className="text-end">
              <Link to="/about" className="btn btn-outline-primary">
                More about us
              </Link>
            </div>
          </div>
        </Col>

        {/* Notice Board Section - UPDATED with Marquee */}
        <Col lg={5}>
          <div className="p-4 border rounded">
            <h2 className="mb-4">
              <BsStopwatch className="me-2" />
              Notice Board
            </h2>
            <div className="notice-board-container" style={{ height: '400px', overflow: 'hidden', position: 'relative' }}>
              <div
                ref={marqueeRef}
                className="notice-board-marquee"
                style={{
                  animation: 'marquee 20s linear infinite',
                  position: 'absolute',
                  width: '100%',
                }}>
                {notices.map((notice) => (
                  <div key={notice.id} className="notice-item mb-3 border-bottom pb-3">
                    <div className="d-flex">
                      <h5 className='text-primary'><BsFillPinFill /></h5>
                      <p className="mb-0 mx-1">
                        {notice.text}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="px-1 border border-secondary rounded">
                        <small>{notice.date}</small>
                      </span>
                      <span className="px-1 border border-secondary rounded">
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
        </Col>
      </Row>
      {/* Closed Container here */}

      {/* CSS for the marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        .notice-board-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </Container>
  )
}

export default AboutAndNoticeBoard
