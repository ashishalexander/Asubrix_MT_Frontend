import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
import { FaPlus, FaUserTie } from 'react-icons/fa';
import PageMetaData from '@/components/PageMetaData';
import FacultyTable from './components/FacultyTable';

const dummyFaculties = [
  {
    id: 1,
    name: 'Dr. John Smith',
    facultyId: 'FAC001',
    email: 'john.smith@example.com',
    phone: '+1 234-567-8901',
    designation: 'Professor',
    department: 'Computer Science',
    joinDate: '2020-01-15',
    status: 'active',
    courses: ['Advanced Algorithms', 'Data Structures', 'Machine Learning']
  },
  {
    id: 2,
    name: 'Dr. Sarah Johnson',
    facultyId: 'FAC002',
    email: 'sarah.johnson@example.com',
    phone: '+1 234-567-8902',
    designation: 'Associate Professor',
    department: 'Mathematics',
    joinDate: '2019-08-20',
    status: 'active',
    courses: ['Calculus I', 'Linear Algebra', 'Statistics']
  },
  {
    id: 3,
    name: 'Prof. Michael Chen',
    facultyId: 'FAC003',
    email: 'michael.chen@example.com',
    phone: '+1 234-567-8903',
    designation: 'Assistant Professor',
    department: 'Physics',
    joinDate: '2021-03-10',
    status: 'blocked',
    courses: ['Quantum Mechanics', 'Classical Physics']
  },
  {
    id: 4,
    name: 'Dr. Emily Brown',
    facultyId: 'FAC004',
    email: 'emily.brown@example.com',
    phone: '+1 234-567-8904',
    designation: 'Professor',
    department: 'Chemistry',
    joinDate: '2018-06-25',
    status: 'active',
    courses: ['Organic Chemistry', 'Biochemistry']
  },
  {
    id: 5,
    name: 'Prof. David Wilson',
    facultyId: 'FAC005',
    email: 'david.wilson@example.com',
    phone: '+1 234-567-8905',
    designation: 'Associate Professor',
    department: 'Computer Science',
    joinDate: '2020-09-01',
    status: 'active',
    courses: ['Web Development', 'Database Systems', 'Software Engineering']
  }
];

const FacultyManagement = () => {
  const [faculties, setFaculties] = useState(dummyFaculties);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const handleEdit = (faculty) => {
    // Handle edit functionality
    console.log('Edit faculty:', faculty);
  };

  const handleDelete = (faculty) => {
    setFaculties(faculties.filter(f => f.id !== faculty.id));
  };

  const handleStatusChange = (facultyId, newStatus) => {
    setFaculties(faculties.map(faculty => 
      faculty.id === facultyId 
        ? { ...faculty, status: newStatus }
        : faculty
    ));
  };

  return (
    <div className="faculty-management">
      {/* Header Section */}
      <div className="bg-light py-4 mb-4">
        <Container fluid>
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <div>
              <h3 className="page-title mb-0">Faculty Management</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 mt-2">
                  <li className="breadcrumb-item">
                    <a href="#" className="text-muted">
                      Dashboard
                    </a>
                  </li>
                  <li className="breadcrumb-item active text-dark" aria-current="page">
                    Faculty
                  </li>
                </ol>
              </nav>
            </div>
            <Button 
              className="btn-add-content d-flex align-items-center" 
              onClick={() => console.log('Add faculty')}
            >
              <FaPlus className="me-2" />
              Add New Faculty
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
                    placeholder="Search faculty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-start-0 ps-0"
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
                  <option value="name">Name</option>
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
                      <p className="text-sm mb-0 text-uppercase font-weight-bold">Total Faculty</p>
                      <h5 className="font-weight-bolder mb-0">{faculties.length}</h5>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <FaUserTie className="text-white opacity-10" style={{ width: '20px', height: '20px' }} />
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
                      <p className="text-sm mb-0 text-uppercase font-weight-bold">Active Faculty</p>
                      <h5 className="font-weight-bolder mb-0">
                        {faculties.filter(f => f.status === 'active').length}
                      </h5>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div className="icon icon-shape bg-gradient-success shadow text-center border-radius-md">
                      <FaUserTie className="text-white opacity-10" style={{ width: '20px', height: '20px' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Faculty Table */}
        <div className="card">
          <div className="card-body px-0 pt-0 pb-2">
            <FacultyTable
              faculty={faculties.filter(faculty => 
                faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faculty.facultyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faculty.designation.toLowerCase().includes(searchQuery.toLowerCase())
              )}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

const FacultyManagementPage = () => {
  return (
    <>
      <PageMetaData title="Faculty Management" />
      <FacultyManagement />
    </>
  );
};

export default FacultyManagementPage; 