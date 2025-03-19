import React, { useState } from 'react';
import { Table, Badge, Button, Dropdown, Pagination } from 'react-bootstrap';
import { FaEllipsisV, FaEdit, FaTrash, FaEye, FaUserCircle } from 'react-icons/fa';

const StudentTable = ({ students, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = students.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(students.length / itemsPerPage);
  
  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item 
          key={number} 
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  const getStatusBadge = (status) => {
    const badgeMap = {
      active: { variant: 'success', label: 'Active' },
      inactive: { variant: 'secondary', label: 'Inactive' }
    };
    
    const { variant, label } = badgeMap[status] || { variant: 'secondary', label: status };
    
    return (
      <Badge bg={variant} className="px-2 py-1">
        {label}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const badgeMap = {
      paid: { variant: 'success', label: 'Paid' },
      pending: { variant: 'warning', label: 'Pending' }
    };
    
    const { variant, label } = badgeMap[status] || { variant: 'secondary', label: status };
    
    return (
      <Badge bg={variant} className="px-2 py-1">
        {label}
      </Badge>
    );
  };

  const getAvatarDisplay = (avatar) => {
    if (avatar === 'default' || avatar === 'default-male' || avatar === 'default-female' || avatar === 'default-neutral') {
      return <FaUserCircle size={40} className="text-primary" />;
    } else if (avatar && avatar.startsWith('data:')) {
      return <img src={avatar} alt="Student avatar" className="rounded-circle" width="40" height="40" />;
    } else {
      return <img src={avatar} alt="Student avatar" className="rounded-circle" width="40" height="40" />;
    }
  };

  return (
    <div className="student-table-container">
      {currentStudents.length > 0 ? (
        <>
          <Table responsive hover className="align-middle">
            <thead className="bg-light">
              <tr>
                <th>Student</th>
                <th>Enrollment ID</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Enrollment Date</th>
                <th>Courses</th>
                <th>Status</th>
                <th>Payment</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle me-2 d-flex justify-content-center align-items-center" style={{ width: 40, height: 40, border: '1px solid #ddd' }}>
                        {getAvatarDisplay(student.avatar)}
                      </div>
                      <div>
                        <div className="fw-bold">{student.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{student.enrollmentId}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.enrollmentDate}</td>
                  <td>
                    {student.courses.length > 0 ? (
                      <>
                        {student.courses[0]}
                        {student.courses.length > 1 && (
                          <Badge bg="primary" pill className="ms-1">
                            +{student.courses.length - 1}
                          </Badge>
                        )}
                      </>
                    ) : (
                      <span className="text-muted">No courses</span>
                    )}
                  </td>
                  <td>{getStatusBadge(student.status)}</td>
                  <td>{getPaymentStatusBadge(student.paymentStatus)}</td>
                  <td>
                    <div className="d-flex justify-content-end">
                      <Dropdown align="end">
                        <Dropdown.Toggle variant="light" size="sm" className="border-0">
                          <FaEllipsisV />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <FaEye className="me-2 text-primary" /> View Details
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => onEdit(student)}>
                            <FaEdit className="me-2 text-warning" /> Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => onDelete(student)}>
                            <FaTrash className="me-2 text-danger" /> Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <div className="d-flex justify-content-between align-items-center mt-4">
            <div className="text-muted">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, students.length)} of {students.length} students
            </div>
            <div className="d-flex align-items-center">
              <Dropdown className="me-3">
                <Dropdown.Toggle variant="light" className="border" size="sm">
                  {itemsPerPage} per page
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {[5, 10, 25, 50].map(pageSize => (
                    <Dropdown.Item 
                      key={pageSize} 
                      onClick={() => {
                        setItemsPerPage(pageSize);
                        setCurrentPage(1);
                      }}
                      active={pageSize === itemsPerPage}
                    >
                      {pageSize} per page
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              
              <Pagination className="mb-0">
                <Pagination.First 
                  onClick={() => setCurrentPage(1)} 
                  disabled={currentPage === 1} 
                />
                <Pagination.Prev 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                  disabled={currentPage === 1} 
                />
                {renderPagination()}
                <Pagination.Next 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                  disabled={currentPage === totalPages} 
                />
                <Pagination.Last 
                  onClick={() => setCurrentPage(totalPages)} 
                  disabled={currentPage === totalPages} 
                />
              </Pagination>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center p-5 bg-light rounded">
          <p className="mb-0">No students found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StudentTable; 