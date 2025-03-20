import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaLock, FaLockOpen } from 'react-icons/fa';
import StudentDetails from './StudentDetails';

const StudentTable = ({ students = [], onEdit, onDelete, onStatusChange }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleStatusChange = (student) => {
    const newStatus = student.status === 'blocked' ? 'active' : 'blocked';
    onStatusChange(student.id, newStatus);
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowDetails(true);
  };

  const handleBack = () => {
    setShowDetails(false);
    setSelectedStudent(null);
  };

  if (showDetails && selectedStudent) {
    return (
      <StudentDetails 
        student={selectedStudent}
        onBack={handleBack}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  }

  return (
    <div className="student-table-container">
      <Table responsive hover className="admin-table">
        <thead>
          <tr>
            <th style={{ width: '35%' }}>Name</th>
            <th style={{ width: '25%' }}>ID</th>
            <th style={{ width: '25%' }}>Status</th>
            <th style={{ width: '15%' }} className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.enrollmentId}</td>
              <td>
                <span className={`status-badge ${student.status}`}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </span>
              </td>
              <td>
                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="action-btn view"
                    onClick={() => handleViewDetails(student)}
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="action-btn edit"
                    onClick={() => onEdit(student)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={`action-btn ${student.status === 'blocked' ? 'unblock' : 'block'}`}
                    onClick={() => handleStatusChange(student)}
                    title={student.status === 'blocked' ? 'Unblock' : 'Block'}
                  >
                    {student.status === 'blocked' ? <FaLockOpen /> : <FaLock />}
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => onDelete(student)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentTable; 