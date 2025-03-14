import { useState } from 'react'
import { Dropdown, ButtonGroup, Container, Row, Col, FormControl, Button } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { RiArrowDropDownLine } from 'react-icons/ri'
import CourseCard from './CourseCard'
import Pagination from './Pagination'
import { useFetchData } from '@/hooks/useFetchData'
import { getAllCourses } from '@/helpers/data'

const Courses = () => {
  const allCourses = useFetchData(getAllCourses) || []
  const [selectedCategory, setSelectedCategory] = useState('Categories')

  return (
    <section className="pt-0">
      <Container>
        {/* Search & Filters */}
        <form className="bg-light border p-4 rounded-3 my-4 z-index-9 position-relative">
          <Row className="g-3">
            <Col xl={3}>
              <FormControl className="me-1" type="search" placeholder="Enter keyword" />
            </Col>
            <Col xl={8}>
              <Row className="g-3">
                {/* Category Filter with Nested Dropdown */}
                <Col sm={6} md={3} className="pb-2 pb-md-0">
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle variant="light" className="w-100 d-flex align-items-center justify-content-between ">
                      {selectedCategory} <RiArrowDropDownLine size={22} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setSelectedCategory('All')}>All</Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelectedCategory('Test Series')}>Test Series</Dropdown.Item>

                      {/* TNPSC - Nested Dropdown */}
                      <Dropdown drop="end" as={ButtonGroup} className="w-100">
                        <Dropdown.Toggle
                          variant="light"
                          className="dropdown-item w-100 text-start border-0 d-flex align-items-center justify-content-between">
                          TNPSC <RiArrowDropDownLine size={22} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {[
                            'GROUP 4',
                            'GROUP 2/2A',
                            'GENERAL STUDIES',
                            'GROUP 1',
                            'GROUP 2',
                            'TEST SERIES',
                            'ECONOMICS',
                            'MATHS',
                            'POLITY',
                            'UNIT 9',
                            'UNIT 8',
                            'HISTORY',
                            'CIVIL',
                            'AE',
                            'INM',
                            'NCERT',
                          ].map((item) => (
                            <Dropdown.Item key={item} onClick={() => setSelectedCategory(item)}>
                              {item}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>

                      {/* <Dropdown.Item onClick={() => setSelectedCategory("UPSC - CSE")}>UPSC - CSE</Dropdown.Item> */}
                      {/* Nested Dropdown for UPSC - CSE */}
                      <Dropdown drop="end">
                        <Dropdown.Toggle as="div" className="dropdown-item d-flex justify-content-between">
                          UPSC - CSE <RiArrowDropDownLine size={20} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => setSelectedCategory('NCERT')}>NCERT</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                      
                      <Dropdown.Item onClick={() => setSelectedCategory('Bank Exam')}>Bank Exam</Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelectedCategory('Railway Exams')}>Railway Exams</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                {/* Price Filter */}
                <Col sm={6} md={3} className="pb-2 pb-md-0">
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle variant="light" className="w-100 d-flex align-items-center justify-content-between">
                      Price Level <RiArrowDropDownLine size={22} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>All</Dropdown.Item>
                      <Dropdown.Item>Free</Dropdown.Item>
                      <Dropdown.Item>Paid</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                {/* Skill Level Filter */}
                <Col sm={6} md={3} className="pb-2 pb-md-0">
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle variant="light" className="w-100 d-flex align-items-center justify-content-between">
                      Skill Level <RiArrowDropDownLine size={22} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>All levels</Dropdown.Item>
                      <Dropdown.Item>Beginner</Dropdown.Item>
                      <Dropdown.Item>Intermediate</Dropdown.Item>
                      <Dropdown.Item>Advanced</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                {/* Language Filter */}
                <Col sm={6} md={3} className="pb-2 pb-md-0">
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle variant="light" className="w-100 d-flex align-items-center justify-content-between">
                      Language <RiArrowDropDownLine size={22} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>English</Dropdown.Item>
                      <Dropdown.Item>Francais</Dropdown.Item>
                      <Dropdown.Item>Russian</Dropdown.Item>
                      <Dropdown.Item>Hindi</Dropdown.Item>
                      <Dropdown.Item>Bengali</Dropdown.Item>
                      <Dropdown.Item>Spanish</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </Col>

            {/* Search Button */}
            <Col xl={1}>
              <Button variant="primary" type="button" className="mb-0 rounded z-index-1 w-100">
                <FaSearch />
              </Button>
            </Col>
          </Row>
        </form>

        {/* Course Listings */}
        <Row className="mt-3">
          <Col xs={12}>
            <Row className="g-4">
              {allCourses.length > 0 ? (
                allCourses.slice(0, 12).map((course, idx) => (
                  <Col sm={6} lg={4} xl={3} key={idx}>
                    <CourseCard course={course} />
                  </Col>
                ))
              ) : (
                <p>No courses available.</p>
              )}
            </Row>
            {/* Pagination */}
            <Col xs={12}>
              <Pagination />
            </Col>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Courses
