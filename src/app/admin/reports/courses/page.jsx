import PageMetaData from '@/components/PageMetaData';
import CourseReportsTable from '../components/CourseReportsTable';
import { CourseSummaryTiles } from '../components/SummaryTiles';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

const CourseReports = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container-fluid px-4 py-4">
      <PageMetaData title="Course Reports" />
      <div className="mb-4 d-flex align-items-center justify-content-between">
        <h1 className="h3 mb-0">Course Reports</h1>
        <InputGroup className="w-50 search-input">
          <InputGroup.Text className="bg-light border-0">
            <FaSearch className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="border-0 bg-light"
          />
        </InputGroup>
      </div>
      <CourseSummaryTiles />
      <CourseReportsTable searchQuery={searchQuery} />
    </div>
  );
};

export default CourseReports;