import React, { useMemo, useState } from 'react';
import { Card, Form, InputGroup, Table } from 'react-bootstrap';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { FaSearch, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const CourseReportsTable = () => {
  const [globalFilter, setGlobalFilter] = useState('');

  // Sample data for course reports
  const data = useMemo(
    () => [
      {
        courseName: 'React Complete Guide',
        instructor: 'John Doe',
        category: 'Web Development',
        enrolledStudents: '150',
        completionRate: '85%',
        averageRating: '4.5',
        revenue: '$15,000'
      },
      {
        courseName: 'Python for Beginners',
        instructor: 'Jane Smith',
        category: 'Programming',
        enrolledStudents: '200',
        completionRate: '78%',
        averageRating: '4.2',
        revenue: '$18,000'
      },
      {
        courseName: 'Machine Learning Basics',
        instructor: 'Mike Johnson',
        category: 'Data Science',
        enrolledStudents: '175',
        completionRate: '82%',
        averageRating: '4.7',
        revenue: '$20,000'
      },
      {
        courseName: 'JavaScript Masterclass',
        instructor: 'Sarah Wilson',
        category: 'Web Development',
        enrolledStudents: '220',
        completionRate: '90%',
        averageRating: '4.8',
        revenue: '$22,000'
      }
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Course Name',
        accessor: 'courseName',
      },
      {
        Header: 'Instructor',
        accessor: 'instructor',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Enrolled Students',
        accessor: 'enrolledStudents',
      },
      {
        Header: 'Completion Rate',
        accessor: 'completionRate',
      },
      {
        Header: 'Average Rating',
        accessor: 'averageRating',
      },
      {
        Header: 'Revenue',
        accessor: 'revenue',
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter: setTableGlobalFilter,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleSearchChange = (e) => {
    const value = e.target.value || '';
    setGlobalFilter(value);
    setTableGlobalFilter(value);
  }

  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-white py-3">
        <InputGroup className="w-50 ms-auto">
          <InputGroup.Text className="bg-light border-0">
            <FaSearch className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            value={globalFilter || ''}
            onChange={handleSearchChange}
            placeholder="Search courses..."
            className="border-0 bg-light"
          />
        </InputGroup>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="table-responsive">
          <Table hover className="table table-dark-gray align-middle mb-0" {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th 
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="py-3 px-4 text-nowrap"
                    >
                      <div className="d-flex align-items-center">
                        {column.render('Header')}
                        <span className="ms-1">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FaSortDown className="text-muted" />
                            ) : (
                              <FaSortUp className="text-muted" />
                            )
                          ) : (
                            <FaSort className="text-muted opacity-50" />
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()} className="py-3 px-4">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Card.Body>
      <Card.Footer className="bg-white border-0 py-3">
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <span className="me-3">
              Showing {pageIndex * pageSize + 1} to {Math.min((pageIndex + 1) * pageSize, data.length)} of {data.length} entries
            </span>
            <select
              className="form-select form-select-sm"
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
              style={{ width: '80px' }}
            >
              {[5, 10, 25, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${!canPreviousPage ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => gotoPage(0)}
                >
                  First
                </button>
              </li>
              <li className={`page-item ${!canPreviousPage ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => previousPage()}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: Math.min(5, pageCount) }).map((_, i) => {
                const pageNum = pageIndex - 2 + i < 0 ? i : pageIndex - 2 + i >= pageCount ? pageCount - 5 + i : pageIndex - 2 + i;
                if (pageNum < 0 || pageNum >= pageCount) return null;
                return (
                  <li key={pageNum} className={`page-item ${pageIndex === pageNum ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => gotoPage(pageNum)}
                    >
                      {pageNum + 1}
                    </button>
                  </li>
                );
              })}
              <li className={`page-item ${!canNextPage ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => nextPage()}
                >
                  Next
                </button>
              </li>
              <li className={`page-item ${!canNextPage ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => gotoPage(pageCount - 1)}
                >
                  Last
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default CourseReportsTable; 