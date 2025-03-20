import React, { useState } from 'react';
import PageMetaData from '@/components/PageMetaData';
import StudentTable from './components/StudentTable';
import { FaUserGraduate, FaSearch } from 'react-icons/fa';

const dummyStudents = [
  {
    id: 1,
    name: 'Alice Johnson',
    enrollmentId: 'STU001',
    email: 'alice.johnson@example.com',
    phone: '+1 234-567-8901',
    enrollmentDate: '2023-09-01',
    status: 'active',
    courses: ['Computer Science 101', 'Data Structures', 'Web Development']
  },
  {
    id: 2,
    name: 'Bob Smith',
    enrollmentId: 'STU002',
    email: 'bob.smith@example.com',
    phone: '+1 234-567-8902',
    enrollmentDate: '2023-09-01',
    status: 'blocked',
    courses: ['Mathematics 101', 'Physics 101']
  },
  {
    id: 3,
    name: 'Charlie Brown',
    enrollmentId: 'STU003',
    email: 'charlie.brown@example.com',
    phone: '+1 234-567-8903',
    enrollmentDate: '2023-09-02',
    status: 'active',
    courses: ['Chemistry 101', 'Biology 101', 'Lab Practice']
  },
  {
    id: 4,
    name: 'Diana Miller',
    enrollmentId: 'STU004',
    email: 'diana.miller@example.com',
    phone: '+1 234-567-8904',
    enrollmentDate: '2023-09-02',
    status: 'active',
    courses: ['English Literature', 'Creative Writing']
  },
  {
    id: 5,
    name: 'Edward Wilson',
    enrollmentId: 'STU005',
    email: 'edward.wilson@example.com',
    phone: '+1 234-567-8905',
    enrollmentDate: '2023-09-03',
    status: 'active',
    courses: ['Computer Networks', 'Database Systems', 'Software Engineering']
  }
];

const StudentManagement = () => {
  const [students, setStudents] = useState(dummyStudents);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (student) => {
    // Handle edit functionality
    console.log('Edit student:', student);
  };

  const handleDelete = (student) => {
    setStudents(students.filter(s => s.id !== student.id));
  };

  const handleStatusChange = (studentId, newStatus) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, status: newStatus }
        : student
    ));
  };

  return (
    <div className="container-fluid py-4">
      {/* Page Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <div className="icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg me-3">
            <FaUserGraduate className="text-white opacity-10" style={{ width: "24px", height: "24px" }} />
          </div>
          <div>
            <h5 className="mb-0">Student Management</h5>
            <p className="mb-0 text-sm">Manage all students</p>
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
              placeholder="Search student..."
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
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">Total Students</p>
                    <h5 className="font-weight-bolder mb-0">
                      {students.length}
                    </h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                    <FaUserGraduate className="text-white opacity-10" style={{ width: "20px", height: "20px" }} />
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
                    <h5 className="font-weight-bolder mb-0">
                      {students.filter(s => s.status === 'active').length}
                    </h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-success shadow text-center border-radius-md">
                    <FaUserGraduate className="text-white opacity-10" style={{ width: "20px", height: "20px" }} />
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
            students={students.filter(student => 
              student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              student.enrollmentId.toLowerCase().includes(searchTerm.toLowerCase())
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

const StudentManagementPage = () => {
  return (
    <>
      <PageMetaData title="Student Management" />
      <StudentManagement />
    </>
  );
};

export default StudentManagementPage; 