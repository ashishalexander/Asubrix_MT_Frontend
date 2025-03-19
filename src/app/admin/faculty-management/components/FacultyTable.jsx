import React, { useState } from 'react';
import { Table, Badge, Dropdown, Pagination } from 'react-bootstrap';
import { FaEllipsisV, FaEdit, FaTrash, FaEye, FaUserCircle } from 'react-icons/fa';

const FacultyTable = ({ faculties, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFaculties = faculties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(faculties.length / itemsPerPage);
  
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

  const getDesignationBadge = (designation) => {
    const badgeMap = {
      'Professor': { variant: 'primary', label: 'Professor' },
      'Associate Professor': { variant: 'info', label: 'Associate Professor' },
      'Assistant Professor': { variant: 'warning', label: 'Assistant Professor' }
    };
    
    const { variant, label } = badgeMap[designation] || { variant: 'light', label: designation };
    
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
      return <img src={avatar} alt="Faculty avatar" className="rounded-circle" width="40" height="40" />;
    } else {
      return <img src={avatar} alt="Faculty avatar" className="rounded-circle" width="40" height="40" />;
    }
  };

  return (
    <div className="faculty-table-container">
      {currentFaculties.length > 0 ? (
        <>
          <Table responsive hover className="align-middle">
            <thead className="bg-light">
              <tr>
                <th>Faculty</th>
                <th>Faculty ID</th>
                <th>Contact Info</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Joining Date</th>
                <th>Subjects</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentFaculties.map((faculty) => (
                <tr key={faculty.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle me-2 d-flex justify-content-center align-items-center" style={{ width: 40, height: 40, border: '1px solid #ddd' }}>
                        {getAvatarDisplay(faculty.avatar)}
                      </div>
                      <div>
                        <div className="fw-bold">{faculty.name}</div>
                        <div className="small text-muted">{faculty.qualification}</div>
                      </div>
                    </div>
                  </td>
                  <td>{faculty.facultyId}</td>
                  <td>
                    <div>{faculty.email}</div>
                    <div className="small text-muted">{faculty.phone}</div>
                  </td>
                  <td>{faculty.department}</td>
                  <td>{getDesignationBadge(faculty.designation)}</td>
                  <td>{faculty.joiningDate}</td>
                  <td>
                    {faculty.subjects.length > 0 ? (
                      <>
                        {faculty.subjects[0]}
                        {faculty.subjects.length > 1 && (
                          <Badge bg="primary" pill className="ms-1">
                            +{faculty.subjects.length - 1}
                          </Badge>
                        )}
                      </>
                    ) : (
                      <span className="text-muted">No subjects</span>
                    )}
                  </td>
                  <td>{getStatusBadge(faculty.status)}</td>
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
                          <Dropdown.Item onClick={() => onEdit(faculty)}>
                            <FaEdit className="me-2 text-warning" /> Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => onDelete(faculty)}>
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
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, faculties.length)} of {faculties.length} faculties
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
          <p className="mb-0">No faculties found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default FacultyTable; 