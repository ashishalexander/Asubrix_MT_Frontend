import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FaFile } from "react-icons/fa";


const testAttempts = [
  { id: 1, date: "13-03-2025" },
  { id: 2, date: "12-03-2025" },
  { id: 3, date: "11-03-2025" },
  { id: 4, date: "10-03-2025" },
  { id: 5, date: "09-03-2025" }
];

const TestDetails = () => {
  const { testId } = useParams();

  return (
    <section className="pt-4">
      <Container>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h3>Test Details</h3>
            <p>Test ID: {testId}</p>
          </Col>
        </Row>

        {/* Test Attempts */}
        <Row className="g-4">
          {testAttempts.map((attempt) => (
            <Col lg={6} key={attempt.id}>
              <Card className="test-card shadow p-3">
                <Row className="d-flex align-items-center justify-content-between">
                  <Col xs={2}>
                    <div className="icon-wrapper">
                      {/* <img src="/folder-icon.png" alt="test" width={40} /> */}
                      <FaFile size={40} color="#3256a8"/>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <h5 className="mb-0">{attempt.date}</h5>
                  </Col>
                  <Col xs={4} className="d-flex justify-content-end">
                    <Button variant="success" href="/test-questions" className="px-4 py-2 fw-bold">
                      Attempt
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TestDetails;
