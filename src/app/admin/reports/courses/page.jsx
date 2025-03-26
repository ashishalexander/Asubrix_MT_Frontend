import PageMetaData from '@/components/PageMetaData';
import CourseReportsTable from '../components/CourseReportsTable';
import { CourseSummaryTiles } from '../components/SummaryTiles';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import CourseReportsHeader from '../components/CourseReportsHeader';

const CourseReports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  const [sortOption, setSortOption] = useState(null);

  return (
    <div className="container-fluid px-4 py-4">
      <PageMetaData title="Course Reports" />
      <div className="mb-4 d-flex align-items-center justify-content-between">
        <h1 className="h3 mb-0">Course Reports</h1>
        {/* <InputGroup className="w-50 search-input">
          <InputGroup.Text className="bg-light border-0">
            <FaSearch className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="border-0 bg-light"
          />
        </InputGroup> */}
      </div>
      <CourseSummaryTiles />
      <CourseReportsHeader  />
      <CourseReportsTable />
    </div>
  );
};

export default CourseReports;