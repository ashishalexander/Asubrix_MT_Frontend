import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ButtonGroup } from 'react-bootstrap';
import { FiGrid, FiList, FiPlus, FiSearch } from 'react-icons/fi';
import TestsPortal from './components/TestsPortal';
import CreateTest from './components/CreateTest';
import TestSettings from './components/TestSettings';

const ContentManagement = () => {
  const [view, setView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateTest, setShowCreateTest] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(1);

  return (
    <Container fluid className="content-management px-3 px-md-4 py-4">
      {/* Header Section */}
      <div className="content-management-header mb-4">
        <h1 className="h3 mb-2">Test Management</h1>
        <p className="text-muted mb-0 d-none d-sm-block">Create and manage your tests, quizzes, and assessments</p>
      </div>

      {/* Toolbar Section */}
      <div className="content-management-toolbar mb-4">
        <Row className="g-3">
          <Col xs={12} md={6}>
            <div className="search-input">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0">
                  <FiSearch className="text-muted" />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Search tests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-start-0 ps-0 rounded-end"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Main Content */}
      <div className="content-management-content">
        {!showCreateTest && !showSettings && (
          <TestsPortal
            view={view}
            searchQuery={searchQuery}
            onCreateTest={() => setShowCreateTest(true)}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}

        {showCreateTest && (
          <div className="content-management-form">
            <CreateTest
              onClose={() => setShowCreateTest(false)}
              onSave={(testData) => {
                setProgress(75);
                setActiveStep(2);
                setShowCreateTest(false);
              }}
            />
          </div>
        )}

        {showSettings && (
          <div className="content-management-settings">
            <TestSettings
              onClose={() => setShowSettings(false)}
              onSave={(settings) => {
                setShowSettings(false);
              }}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default ContentManagement; 