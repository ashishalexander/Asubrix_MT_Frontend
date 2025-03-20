import React, { useState } from 'react';
import PageMetaData from '@/components/PageMetaData';
import FacultyTable from './components/FacultyTable';
import { FaUserTie, FaSearch } from 'react-icons/fa';

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
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="container-fluid py-4">
      {/* Page Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <div className="icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg me-3">
            <FaUserTie className="text-white opacity-10" style={{ width: "24px", height: "24px" }} />
          </div>
          <div>
            <h5 className="mb-0">Faculty Management</h5>
            <p className="mb-0 text-sm">Manage all faculty members</p>
          </div>
        </div>
        <div className="ms-md-auto my-2 my-md-0">
          <div className="input-group">
            <span className="input-group-text text-body">
              <FaSearch className="text-muted" style={{ fontSize: '14px' }} />
            </span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">Total Faculty</p>
                    <h5 className="font-weight-bolder mb-0">
                      {faculties.length}
                    </h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                    <FaUserTie className="text-white opacity-10" style={{ width: "20px", height: "20px" }} />
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
                    <FaUserTie className="text-white opacity-10" style={{ width: "20px", height: "20px" }} />
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
              faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              faculty.facultyId.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
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