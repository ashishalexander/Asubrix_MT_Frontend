import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaLock, FaLockOpen } from 'react-icons/fa';
import FacultyDetails from './FacultyDetails';

const FacultyTable = ({ faculty = [], onEdit, onDelete, onStatusChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFaculty = faculty.slice(indexOfFirstItem, indexOfLastItem);

  const handleStatusChange = (faculty) => {
    const newStatus = faculty.status === 'blocked' ? 'active' : 'blocked';
    onStatusChange(faculty.id, newStatus);
  };

  const handleViewDetails = (faculty) => {
    setSelectedFaculty(faculty);
    setShowDetails(true);
  };

  const handleBack = () => {
    setShowDetails(false);
    setSelectedFaculty(null);
  };

  if (showDetails && selectedFaculty) {
    return (
      <FacultyDetails 
        faculty={selectedFaculty}
        onBack={handleBack}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  }

  return (
    <div className="faculty-table-container">
      <Table responsive hover className="admin-table">
        <thead>
          <tr>
            <th style={{ width: '25%' }}>Name</th>
            <th style={{ width: '20%' }}>ID</th>
            <th style={{ width: '25%' }}>Designation</th>
            <th style={{ width: '15%' }}>Status</th>
            <th style={{ width: '15%' }} className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentFaculty.map((faculty) => (
            <tr key={faculty.id}>
              <td>{faculty.name}</td>
              <td>{faculty.facultyId}</td>
              <td>{faculty.designation}</td>
              <td>
                <span className={`status-badge ${faculty.status}`}>
                  {faculty.status.charAt(0).toUpperCase() + faculty.status.slice(1)}
                </span>
              </td>
              <td>
                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="action-btn view"
                    onClick={() => handleViewDetails(faculty)}
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="action-btn edit"
                    onClick={() => onEdit(faculty)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={`action-btn ${faculty.status === 'blocked' ? 'unblock' : 'block'}`}
                    onClick={() => handleStatusChange(faculty)}
                    title={faculty.status === 'blocked' ? 'Unblock' : 'Block'}
                  >
                    {faculty.status === 'blocked' ? <FaLockOpen /> : <FaLock />}
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => onDelete(faculty)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {currentFaculty.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No faculty members found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default FacultyTable; 