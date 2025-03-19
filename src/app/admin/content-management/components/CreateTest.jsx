import React, { useState } from 'react';
import { Row, Col, Form, Button, Nav, Tab, Alert } from 'react-bootstrap';
import { FiArrowLeft, FiInfo, FiClock, FiSettings, FiList, FiSave, FiPlus } from 'react-icons/fi';

const CreateTest = ({ onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [testData, setTestData] = useState({
    title: '',
    description: '',
    duration: {
      hours: '1',
      minutes: '30'
    },
    category: '',
    passingScore: '60',
    instructions: '',
    sections: [],
    settings: {
      shuffleQuestions: false,
      showResults: true,
      allowReview: true,
      requireProctoring: false,
      timeLimit: true
    }
  });

  const handleInputChange = (field, value) => {
    setTestData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSettingsChange = (field, value) => {
    setTestData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(testData);
  };

  return (
    <div className="content-management-form p-0">
      {/* Header */}
      <div className="border-bottom p-4 bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Button 
              variant="link" 
              className="p-0 text-body mb-2 d-flex align-items-center"
              onClick={onClose}
            >
              <FiArrowLeft className="me-2" /> Back to Tests
            </Button>
            <h4 className="mb-1">Create New Test</h4>
            <p className="text-muted mb-0">Configure your test settings and content</p>
          </div>
          <Button
            variant="primary"
            onClick={handleSave}
            className="d-flex align-items-center"
          >
            <FiSave className="me-2" /> Save Test
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Row>
          <Col lg={3}>
            <Nav variant="pills" className="flex-column nav-pills-custom">
              <Nav.Item>
                <Nav.Link
                  active={activeTab === 'basic'}
                  onClick={() => setActiveTab('basic')}
                  className="mb-2"
                >
                  <FiInfo className="me-2" /> Basic Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  active={activeTab === 'sections'}
                  onClick={() => setActiveTab('sections')}
                  className="mb-2"
                >
                  <FiList className="me-2" /> Test Sections
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  active={activeTab === 'settings'}
                  onClick={() => setActiveTab('settings')}
                  className="mb-2"
                >
                  <FiSettings className="me-2" /> Test Settings
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col lg={9}>
            <Tab.Content>
              <Tab.Pane active={activeTab === 'basic'}>
                <div className="bg-white rounded p-4 shadow-sm">
                  <h5 className="mb-4">Basic Information</h5>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Test Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={testData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter test title"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={testData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Enter test description"
                      />
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Category</Form.Label>
                          <Form.Select
                            value={testData.category}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                          >
                            <option value="">Select category</option>
                            <option value="mathematics">Mathematics</option>
                            <option value="science">Science</option>
                            <option value="language">Language</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Passing Score (%)</Form.Label>
                          <Form.Control
                            type="number"
                            min="0"
                            max="100"
                            value={testData.passingScore}
                            onChange={(e) => handleInputChange('passingScore', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Duration</Form.Label>
                      <Row>
                        <Col md={6}>
                          <Form.Control
                            type="number"
                            min="0"
                            placeholder="Hours"
                            value={testData.duration.hours}
                            onChange={(e) => handleInputChange('duration', { ...testData.duration, hours: e.target.value })}
                          />
                        </Col>
                        <Col md={6}>
                          <Form.Control
                            type="number"
                            min="0"
                            max="59"
                            placeholder="Minutes"
                            value={testData.duration.minutes}
                            onChange={(e) => handleInputChange('duration', { ...testData.duration, minutes: e.target.value })}
                          />
                        </Col>
                      </Row>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Instructions</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={testData.instructions}
                        onChange={(e) => handleInputChange('instructions', e.target.value)}
                        placeholder="Enter test instructions"
                      />
                    </Form.Group>
                  </Form>
                </div>
              </Tab.Pane>

              <Tab.Pane active={activeTab === 'sections'}>
                <div className="bg-white rounded p-4 shadow-sm">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0">Test Sections</h5>
                    <Button variant="outline-primary" size="sm">
                      <FiPlus className="me-1" /> Add Section
                    </Button>
                  </div>
                  
                  {testData.sections.length === 0 ? (
                    <Alert variant="info">
                      No sections added yet. Click "Add Section" to create your first section.
                    </Alert>
                  ) : (
                    <div className="sections-list">
                      {/* Sections will be rendered here */}
                    </div>
                  )}
                </div>
              </Tab.Pane>

              <Tab.Pane active={activeTab === 'settings'}>
                <div className="bg-white rounded p-4 shadow-sm">
                  <h5 className="mb-4">Test Settings</h5>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="shuffle-questions"
                      label="Shuffle Questions"
                      checked={testData.settings.shuffleQuestions}
                      onChange={(e) => handleSettingsChange('shuffleQuestions', e.target.checked)}
                      className="mb-3"
                    />
                    
                    <Form.Check
                      type="switch"
                      id="show-results"
                      label="Show Results Immediately"
                      checked={testData.settings.showResults}
                      onChange={(e) => handleSettingsChange('showResults', e.target.checked)}
                      className="mb-3"
                    />
                    
                    <Form.Check
                      type="switch"
                      id="allow-review"
                      label="Allow Answer Review"
                      checked={testData.settings.allowReview}
                      onChange={(e) => handleSettingsChange('allowReview', e.target.checked)}
                      className="mb-3"
                    />
                    
                    <Form.Check
                      type="switch"
                      id="require-proctoring"
                      label="Require Proctoring"
                      checked={testData.settings.requireProctoring}
                      onChange={(e) => handleSettingsChange('requireProctoring', e.target.checked)}
                      className="mb-3"
                    />
                    
                    <Form.Check
                      type="switch"
                      id="time-limit"
                      label="Enable Time Limit"
                      checked={testData.settings.timeLimit}
                      onChange={(e) => handleSettingsChange('timeLimit', e.target.checked)}
                      className="mb-3"
                    />
                  </Form>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CreateTest; 