/**
 * SCSS files:
 * Main styles: src/assets/scss/components/_content-management.scss
 * Test styles: src/assets/scss/components/_question-styles.scss
 * Shared styles:
 * - General: src/assets/scss/components/_general.scss
 * - Tables: src/assets/scss/components/_tables.scss
 */

import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ButtonGroup } from 'react-bootstrap';
import { FiGrid, FiList, FiSearch, FiFolder } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa'
import TestsPortal from './components/TestsPortal';
import CreateTest from './components/CreateTest';
import TestSettings from './components/TestSettings';
import { useNavigate } from 'react-router-dom'
import PageMetaData from '@/components/PageMetaData'

const ContentManagement = () => {
  const [view, setView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateTest, setShowCreateTest] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [sortBy, setSortBy] = useState('lastModified');
  const [showAddFolder, setShowAddFolder] = useState(false);
  
  const navigate = useNavigate()

  return (
    <>
      <PageMetaData title="Test Management" />

      {/* Header Section */}
      <div className="bg-light py-4 mb-4">
        <Container fluid>
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <div>
              <h3 className="mb-0 fw-bold">Test Management</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 mt-2">
                  <li className="breadcrumb-item">
                    <a href="#" className="text-muted">
                      Dashboard
                    </a>
                  </li>
                  <li className="breadcrumb-item active text-dark" aria-current="page">
                    Tests
                  </li>
                </ol>
              </nav>
            </div>
            <div className="d-flex gap-2">
              <Button 
                variant="outline-primary" 
                className="d-flex align-items-center"
                onClick={() => setShowAddFolder(true)}
              >
                <FiFolder className="me-2" />
                New Folder
              </Button>
              <Button 
                className="btn-add-content d-flex align-items-center" 
                onClick={() => setShowCreateTest(true)}
              >
                <FaPlus className="me-2" />
                New Test
              </Button>
            </div>
          </div>

          {/* Search and Sort Section */}
          <div className="row g-3 align-items-center">
            <div className="col-md-8">
              <div className="search-input">
                <div className="input-group">
                  <span className="input-group-text border-end-0">
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
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center justify-content-end">
                <label className="me-2 text-nowrap fw-medium">Sort by:</label>
                <Form.Select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select"
                >
                  <option value="lastModified">Last Modified</option>
                  <option value="title">Test Name</option>
                  <option value="attempts">Attempts</option>
                </Form.Select>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container fluid>
        <div className="content-management-content">
          {!showCreateTest && !showSettings && (
            <TestsPortal
              view={view}
              searchQuery={searchQuery}
              sortBy={sortBy}
              showAddFolder={showAddFolder}
              setShowAddFolder={setShowAddFolder}
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
    </>
  );
};

export default ContentManagement; 