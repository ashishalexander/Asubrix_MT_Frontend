import { useState, useEffect } from 'react';
import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import PageMetaData from '@/components/PageMetaData';
import { Card, CardBody, CardHeader, Col, FormControl, Row, Spinner } from 'react-bootstrap';
import { FaAngleLeft, FaAngleRight, FaSearch } from 'react-icons/fa';
import httpClient from '@/helpers/httpClient';
import { useAuthContext } from '@/context/useAuthContext';
import { format } from 'date-fns';

const TestsHistoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [testHistory, setTestHistory] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 5
  });
  
  const { user } = useAuthContext();
  
  const fetchTestHistory = async (page = 1) => {
    try {
      setLoading(true);
      const response = await httpClient.get(`/api/tests/history?page=${page}&limit=${pagination.limit}&sort=${sortBy}`, {
        headers: {
          'auth_key': user?.token
        }
      });
      
      if (response.data && response.data.status === 'success') {
        setTestHistory(response.data.history);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching test history:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (user?.token) {
      fetchTestHistory();
    }
  }, [user, sortBy]);
  
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch (error) {
      return dateString;
    }
  };
  
  const handlePageChange = (page) => {
    fetchTestHistory(page);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Filter results client-side for now
    // In a production app, you would likely update the API request with a search parameter
  };
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  const filteredTests = searchTerm 
    ? testHistory.filter(test => 
        test.test_name.toLowerCase().includes(searchTerm.toLowerCase()))
    : testHistory;
  
  return <>
      <PageMetaData title="Test History" />
      <Card className="border bg-transparent rounded-3">
        <CardHeader className="bg-transparent border-bottom">
          <h3 className="mb-0">Your Test History</h3>
        </CardHeader>
        <CardBody>
          <Row className="g-3 align-items-center justify-content-between mb-4">
            <Col md={8}>
              <form className="rounded position-relative" onSubmit={handleSearch}>
                <FormControl 
                  className="pe-5 bg-transparent" 
                  type="search" 
                  placeholder="Search tests" 
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset" type="submit">
                  <FaSearch className="fas fa-search fs-6 " />
                </button>
              </form>
            </Col>
            <Col md={3}>
              <form>
                <ChoicesFormInput 
                  className="form-select js-choice border-0 z-index-9 bg-transparent" 
                  aria-label=".form-select-sm"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="score">Highest Score</option>
                </ChoicesFormInput>
              </form>
            </Col>
          </Row>
          
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="mt-2">Loading your test history...</p>
            </div>
          ) : (
            <>
              <div className="table-responsive border-0">
                <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0">Test Name</th>
                      <th scope="col" className="border-0">Date</th>
                      <th scope="col" className="border-0">Score</th>
                      <th scope="col" className="border-0 rounded-end">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTests.length > 0 ? (
                      filteredTests.map((test) => (
                        <tr key={test.attempt_id}>
                          <td>{test.test_name}</td>
                          <td>{formatDate(test.taken_date)}</td>
                          <td>{test.score}%</td>
                          <td>
                            <span className={`badge bg-${test.status === 'Passed' ? 'success' : 'danger'}`}>
                              {test.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-3">
                          {searchTerm ? 'No tests match your search' : 'No test history found'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {pagination.totalPages > 0 && (
                <div className="d-sm-flex justify-content-sm-between align-items-sm-center mt-4 mt-sm-3">
                  <p className="mb-0 text-center text-sm-start">
                    Showing {filteredTests.length > 0 ? ((pagination.currentPage - 1) * pagination.limit) + 1 : 0} to {Math.min(pagination.currentPage * pagination.limit, pagination.total)} of {pagination.total} entries
                  </p>
                  <nav className="d-flex justify-content-center mb-0" aria-label="navigation">
                    <ul className="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                      <li className={`page-item mb-0 ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => handlePageChange(pagination.currentPage - 1)}
                          disabled={pagination.currentPage === 1}
                        >
                          <FaAngleLeft className="fas fa-angle-left" />
                        </button>
                      </li>
                      
                      {[...Array(pagination.totalPages)].map((_, i) => (
                        <li key={i} className={`page-item mb-0 ${pagination.currentPage === i + 1 ? 'active' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      
                      <li className={`page-item mb-0 ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => handlePageChange(pagination.currentPage + 1)}
                          disabled={pagination.currentPage === pagination.totalPages}
                        >
                          <FaAngleRight className="fas fa-angle-right" />
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </>;
};

export default TestsHistoryPage;
