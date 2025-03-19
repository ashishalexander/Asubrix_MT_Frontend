import React, { useMemo } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import PopularCoursesTable from './PopularCoursesTable';
import PaymentReportsTable from './PaymentReportsTable';

const ReportsAnalytics = () => {
  return (
    <div className="reports-analytics">
      <h1 className="h3 mb-3">Reports & Analytics</h1>
      
      <Row className="g-4">
        {/* Summary Cards */}
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center p-4">
              <h3 className="display-6 fw-bold text-primary mb-0">245</h3>
              <p className="text-muted mb-0">Total Courses</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center p-4">
              <h3 className="display-6 fw-bold text-success mb-0">1,234</h3>
              <p className="text-muted mb-0">Total Students</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center p-4">
              <h3 className="display-6 fw-bold text-warning mb-0">$24,568</h3>
              <p className="text-muted mb-0">Total Revenue</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center p-4">
              <h3 className="display-6 fw-bold text-info mb-0">842</h3>
              <p className="text-muted mb-0">Total Enrollments</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <div className="mt-4">
        <PopularCoursesTable />
      </div>
      
      <div className="mt-4">
        <PaymentReportsTable />
      </div>
    </div>
  );
};

export default ReportsAnalytics; 