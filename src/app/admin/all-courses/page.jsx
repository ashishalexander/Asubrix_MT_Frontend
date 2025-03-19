import PageMetaData from '@/components/PageMetaData';
import { Container } from 'react-bootstrap';
import CourseGrid from './components/CourseGrid';
import CourseFilters from './components/CourseFilters';
import CourseSearch from './components/CourseSearch';
import CourseSort from './components/CourseSort';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AllCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    category: '',
    subCategory: '',
    status: ''
  });

  return (
    <>
      <PageMetaData title="Manage Courses" />
      
      {/* Header Section */}
      <div className="bg-light py-4 mb-4">
        <Container fluid>
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <div>
              <h3 className="mb-0 fw-bold">Manage Courses</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 mt-2">
                  <li className="breadcrumb-item"><a href="#" className="text-muted">Dashboard</a></li>
                  <li className="breadcrumb-item active text-dark" aria-current="page">Courses</li>
                </ol>
              </nav>
            </div>
            <button className="btn btn-dark rounded-pill px-4 py-2 d-flex align-items-center">
              <FaPlus className="me-2" />
              Create New Course
            </button>
          </div>
        </Container>
      </div>

      <Container fluid>
        <div className="row g-4">
          {/* Filters Section */}
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-dark bg-opacity-10 border-0">
                <h5 className="mb-0 py-2">Filters</h5>
              </div>
              <div className="card-body">
                <CourseFilters 
                  filters={filters} 
                  setFilters={setFilters} 
                />
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="col-lg-9">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-bottom py-3">
                <div className="row g-3 align-items-center justify-content-between">
                  <div className="col-md-8">
                    <CourseSearch 
                      searchQuery={searchQuery} 
                      setSearchQuery={setSearchQuery} 
                    />
                  </div>
                  <div className="col-md-4">
                    <CourseSort sortBy={sortBy} setSortBy={setSortBy} />
                  </div>
                </div>
              </div>
              
              <div className="card-body p-4">
                <CourseGrid 
                  searchQuery={searchQuery}
                  sortBy={sortBy}
                  filters={filters}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AllCourses;
