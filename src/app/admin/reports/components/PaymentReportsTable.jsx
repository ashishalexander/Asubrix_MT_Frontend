import React, { useMemo, useState } from 'react';
import { Card, Form, InputGroup } from 'react-bootstrap';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { FaSearch, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const PaymentReportsTable = () => {
  const [globalFilter, setGlobalFilter] = useState('');

  // Sample data for payment reports
  const data = useMemo(
    () => [
      {
        id: 'ORD-2023-0001',
        course: 'Advanced JavaScript Course',
        student: 'John Smith',
        phone: '+1 (555) 123-4567',
        amount: '$89.99',
        gross: '$89.99',
        platformFee: '$8.99',
        net: '$81.00'
      },
      {
        id: 'ORD-2023-0002',
        course: 'React Development Masterclass',
        student: 'Emily Johnson',
        phone: '+1 (555) 234-5678',
        amount: '$94.99',
        gross: '$94.99',
        platformFee: '$9.50',
        net: '$85.49'
      },
      {
        id: 'ORD-2023-0003',
        course: 'Python for Data Science',
        student: 'Michael Brown',
        phone: '+1 (555) 345-6789',
        amount: '$79.99',
        gross: '$79.99',
        platformFee: '$8.00',
        net: '$71.99'
      },
      {
        id: 'ORD-2023-0004',
        course: 'Complete Web Development Bootcamp',
        student: 'Jessica Williams',
        phone: '+1 (555) 456-7890',
        amount: '$129.99',
        gross: '$129.99',
        platformFee: '$13.00',
        net: '$116.99'
      },
      {
        id: 'ORD-2023-0005',
        course: 'Mobile App Development with Flutter',
        student: 'David Miller',
        phone: '+1 (555) 567-8901',
        amount: '$74.99',
        gross: '$74.99',
        platformFee: '$7.50',
        net: '$67.49'
      },
      {
        id: 'ORD-2023-0006',
        course: 'SQL Database Design',
        student: 'Sarah Davis',
        phone: '+1 (555) 678-9012',
        amount: '$59.99',
        gross: '$59.99',
        platformFee: '$6.00',
        net: '$53.99'
      },
      {
        id: 'ORD-2023-0007',
        course: 'AWS Certification Course',
        student: 'James Wilson',
        phone: '+1 (555) 789-0123',
        amount: '$119.99',
        gross: '$119.99',
        platformFee: '$12.00',
        net: '$107.99'
      },
      {
        id: 'ORD-2023-0008',
        course: 'Machine Learning Fundamentals',
        student: 'Lisa Thomas',
        phone: '+1 (555) 890-1234',
        amount: '$99.99',
        gross: '$99.99',
        platformFee: '$10.00',
        net: '$89.99'
      },
      {
        id: 'ORD-2023-0009',
        course: 'Advanced JavaScript Course',
        student: 'Ryan Garcia',
        phone: '+1 (555) 901-2345',
        amount: '$89.99',
        gross: '$89.99',
        platformFee: '$8.99',
        net: '$81.00'
      },
      {
        id: 'ORD-2023-0010',
        course: 'React Development Masterclass',
        student: 'Amanda Clark',
        phone: '+1 (555) 012-3456',
        amount: '$94.99',
        gross: '$94.99',
        platformFee: '$9.50',
        net: '$85.49'
      }
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Order ID',
        accessor: 'id',
      },
      {
        Header: 'Course Name',
        accessor: 'course',
      },
      {
        Header: 'Student Name',
        accessor: 'student',
      },
      {
        Header: 'Student Phone',
        accessor: 'phone',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Gross',
        accessor: 'gross',
      },
      {
        Header: 'Platform Fee',
        accessor: 'platformFee',
      },
      {
        Header: 'Net',
        accessor: 'net',
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
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Payment Reports</h5>
          <InputGroup className="w-50">
            <InputGroup.Text className="bg-light border-0">
              <FaSearch className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              value={globalFilter || ''}
              onChange={handleSearchChange}
              placeholder="Search payments..."
              className="border-0 bg-light"
            />
          </InputGroup>
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" {...getTableProps()}>
            <thead className="bg-light">
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
          </table>
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

export default PaymentReportsTable; 