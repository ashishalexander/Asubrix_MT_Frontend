/**
 * SCSS files:
 * Main styles: src/assets/scss/components/_student-management.scss
 * Shared styles:
 * - Table: src/assets/scss/components/_tables.scss
 * - Avatar: src/assets/scss/components/_avatar.scss
 * - General: src/assets/scss/components/_general.scss
 */

import React, { useState } from 'react'
import PageMetaData from '@/components/PageMetaData'
import StudentTable from './components/StudentTable'
import StudentForm from './components/StudentForm'
import { FaUserGraduate, FaPlus } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { Container, Form, Button, Modal } from 'react-bootstrap'

const dummyStudents = [
  {
    id: 1,
    name: 'Alice Johnson',
    enrollmentId: 'STU001',
    email: 'alice.johnson@example.com',
    phone: '+1 234-567-8901',
    enrollmentDate: '2023-09-01',
    status: 'active',
    courses: ['Computer Science 101', 'Data Structures', 'Web Development'],
  },
  {
    id: 2,
    name: 'Bob Smith',
    enrollmentId: 'STU002',
    email: 'bob.smith@example.com',
    phone: '+1 234-567-8902',
    enrollmentDate: '2023-09-01',
    status: 'blocked',
    courses: ['Mathematics 101', 'Physics 101'],
  },
  {
    id: 3,
    name: 'Charlie Brown',
    enrollmentId: 'STU003',
    email: 'charlie.brown@example.com',
    phone: '+1 234-567-8903',
    enrollmentDate: '2023-09-02',
    status: 'active',
    courses: ['Chemistry 101', 'Biology 101', 'Lab Practice'],
  },
  {
    id: 4,
    name: 'Diana Miller',
    enrollmentId: 'STU004',
    email: 'diana.miller@example.com',
    phone: '+1 234-567-8904',
    enrollmentDate: '2023-09-02',
    status: 'active',
    courses: ['English Literature', 'Creative Writing'],
  },
  {
    id: 5,
    name: 'Edward Wilson',
    enrollmentId: 'STU005',
    email: 'edward.wilson@example.com',
    phone: '+1 234-567-8905',
    enrollmentDate: '2023-09-03',
    status: 'active',
    courses: ['Computer Networks', 'Database Systems', 'Software Engineering'],
  },
]

const StudentManagement = () => {
  const [students, setStudents] = useState(dummyStudents)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)

  const handleEdit = (student) => {
    setEditingStudent(student)
    setShowAddModal(true)
  }

  const handleDelete = (student) => {
    setStudents(students.filter((s) => s.id !== student.id))
  }

  const handleStatusChange = (studentId, newStatus) => {
    setStudents(students.map((student) => (student.id === studentId ? { ...student, status: newStatus } : student)))
  }

  const handleAddStudent = () => {
    setShowAddModal(true)
  }

  const handleCloseModal = () => {
    setShowAddModal(false)
    setEditingStudent(null)
  }

  const handleSubmitStudent = (studentData) => {
    if (!studentData) {
      handleCloseModal()
      return
    }

    if (editingStudent) {
      // Update existing student
      setStudents(students.map((student) => 
        student.id === editingStudent.id ? { ...studentData, id: student.id, enrollmentId: student.enrollmentId } : student
      ))
    } else {
      // Add new student
      const newStudent = {
        ...studentData,
        id: students.length + 1,
        enrollmentId: `STU${String(students.length + 1).padStart(3, '0')}`
      }
      setStudents([...students, newStudent])
    }
    handleCloseModal()
  }

  return (
    <>
      <PageMetaData title="Student Management" />
      
      {/* Header Section */}
      <div className="bg-light py-4 mb-4">
        <Container fluid>
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <div>
              <h3 className="mb-0 fw-bold">Student Management</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 mt-2">
                  <li className="breadcrumb-item">
                    <a href="#" className="text-muted">
                      Dashboard
                    </a>
                  </li>
                  <li className="breadcrumb-item active text-dark" aria-current="page">
                    Students
                  </li>
                </ol>
              </nav>
            </div>
            <Button 
              className="btn-add-content d-flex align-items-center" 
              onClick={handleAddStudent}
            >
              <FaPlus className="me-2" />
              Add Student
            </Button>
          </div>

          {/* Search and Sort Section */}
          <div className="row g-3 align-items-center">
            <div className="col-md-8">
              <div className="search-input">
                <div className="input-group">
                  <span className="input-group-text border-end-0">
                    <FiSearch className="text-muted" />
                  </span>
                  <Form.Control
                    type="text"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-start-0 ps-0 rounded-end"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center justify-content-end">
                <label className="me-2 text-nowrap fw-medium">Sort by:</label>
                <Form.Select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Student Name</option>
                  <option value="status">Status</option>
                </Form.Select>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Stats Cards */}
      <Container fluid>
        <div className="row mb-4">
          <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div className="card">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-8">
                    <div className="numbers">
                      <p className="text-sm mb-0 text-uppercase font-weight-bold">Total Students</p>
                      <h5 className="font-weight-bolder mb-0">{students.length}</h5>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div className="icon icon-shape bg-theme-secondary shadow text-center border-radius-md">
                      <FaUserGraduate className="text-white opacity-10 stats-icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div className="card">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-8">
                    <div className="numbers">
                      <p className="text-sm mb-0 text-uppercase font-weight-bold">Active Students</p>
                      <h5 className="font-weight-bolder mb-0">{students.filter((s) => s.status === 'active').length}</h5>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div className="icon icon-shape bg-primary shadow text-center border-radius-md">
                      <FaUserGraduate className="text-white opacity-10 stats-icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Table */}
        <div className="card">
          <div className="card-body px-0 pt-0 pb-2">
            <StudentTable
              students={students.filter(
                (student) =>
                  student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  student.enrollmentId.toLowerCase().includes(searchQuery.toLowerCase())
              )}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </Container>

      {/* Add/Edit Student Modal */}
      <Modal show={showAddModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingStudent ? 'Edit Student' : 'Add New Student'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StudentForm onSubmit={handleSubmitStudent} student={editingStudent} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default StudentManagement
