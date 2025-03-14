import { FaSearch } from "react-icons/fa";
import { Card, CardBody, CardTitle, Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "./Pagination";

const freeTests = [
  { id: 1, name: "Daily Current Affairs Test", folders: 11 },
  { id: 2, name: "TNPSC", folders: 10 },
  { id: 3, name: "General Studies-MCQ", folders: 2 },
  { id: 4, name: "Aptitude", folders: 5 },
  { id: 5, name: "General English", folders: 7 },
  { id: 6, name: "General Tamil", folders: 3 }
];

// Pagination settings
const ITEMS_PER_PAGE = 6;

const FreeTestsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered tests based on search query
  const filteredTests = freeTests.filter((test) =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredTests.length / ITEMS_PER_PAGE);
  const paginatedTests = filteredTests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="pt-4">
      <Container>
        {/* Header & Search Bar */}
        <Row className="mb-4 align-items-center">
          <Col>
            <h3>Free Tests</h3>
            <p>Total ({filteredTests.length})</p>
          </Col>
          <Col sm={4}>
            <form className="border rounded p-2">
              <div className="input-group input-borderless">
                <input
                  className="form-control me-1"
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="primary">
                  <FaSearch />
                </Button>
              </div>
            </form>
          </Col>
        </Row>

        {/* Test List */}
        <Row className="g-4">
          {paginatedTests.map((test) => (
            <Col lg={6} key={test.id}>
              {/* <Link to={`/free-tests/${test.id}`} className="text-decoration-none"> */}
              <Link to={`/pages/free-test/free-test-details`} className="text-decoration-none">
                <Card className="shadow p-3">
                  <Row className="align-items-center">
                    <Col xs={2}>
                      <img src="/folder-icon.png" alt="folder" width={40} />
                    </Col>
                    <Col xs={8}>
                      <CardTitle className="mb-0">{test.name}</CardTitle>
                      <p className="small text-muted">{test.folders} folder(s)</p>
                    </Col>
                    <Col xs={2} className="text-end">
                      <span className="fw-bold">&gt;</span>
                    </Col>
                  </Row>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        {/* Pagination Controls */}
        {/* <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Button
              variant="outline-primary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="me-2"
            >
              Previous
            </Button>
            <span className="px-3">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline-primary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="ms-2"
            >
              Next
            </Button>
          </Col>
        </Row> */}
        <Pagination/>

      </Container>
    </section>
  );
};

export default FreeTestsList;
