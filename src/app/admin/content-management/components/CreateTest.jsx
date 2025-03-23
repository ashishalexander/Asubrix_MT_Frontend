/**
 * Component SCSS:
 * - Test creation styles: src/assets/scss/components/_question-styles.scss
 * - Content management styles: src/assets/scss/components/_content-management.scss
 */

import React, { useState } from 'react';
import { Row, Col, Form, Button, Nav, Tab, Alert } from 'react-bootstrap';
import { FiArrowLeft, FiInfo, FiClock, FiSettings, FiList, FiSave, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const CreateTest = ({ onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
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

  const [currentSection, setCurrentSection] = useState({
    title: '',
    questions: []
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    questionEn: '',
    questionTa: '',
    optionsEn: ['', '', '', ''],
    optionsTa: ['', '', '', ''],
    correctAnswer: 0
  });

  const [selectedLanguage, setSelectedLanguage] = useState('both');

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

  const toggleQuestionForm = () => {
    setShowQuestionForm(!showQuestionForm);
  };

  const handleAddQuestion = () => {
    const isValid = 
      (selectedLanguage === 'english' && currentQuestion.questionEn) ||
      (selectedLanguage === 'tamil' && currentQuestion.questionTa) ||
      (selectedLanguage === 'both' && currentQuestion.questionEn && currentQuestion.questionTa);

    if (isValid) {
      let questionData = {
        ...currentQuestion,
        questionEn: selectedLanguage === 'tamil' ? '' : currentQuestion.questionEn,
        questionTa: selectedLanguage === 'english' ? '' : currentQuestion.questionTa,
        optionsEn: selectedLanguage === 'tamil' ? ['', '', '', ''] : currentQuestion.optionsEn,
        optionsTa: selectedLanguage === 'english' ? ['', '', '', ''] : currentQuestion.optionsTa,
      };

      setTestData(prev => ({
        ...prev,
        sections: [...prev.sections, questionData]
      }));

      setCurrentQuestion({
        questionEn: '',
        questionTa: '',
        optionsEn: ['', '', '', ''],
        optionsTa: ['', '', '', ''],
        correctAnswer: 0
      });
      setShowQuestionForm(false);
    }
  };

  const handleDeleteQuestion = (index) => {
    setTestData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const handleEditQuestion = (index) => {
    setCurrentQuestion(testData.sections[index]);
    handleDeleteQuestion(index);
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
              <FiArrowLeft className="me-2" /> Back to Test Management
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
                    <Button 
                      variant="primary" 
                      onClick={toggleQuestionForm}
                      className="d-flex align-items-center"
                    >
                      <FiPlus className="me-2" /> Create Questions
                    </Button>
                  </div>

                  {showQuestionForm ? (
                    <div className="question-form mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Add New Question</h6>
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={toggleQuestionForm}
                        >
                          Cancel
                        </Button>
                      </div>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Select Language</Form.Label>
                          <Form.Select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                          >
                            <option value="both">English/Tamil</option>
                            <option value="english">English</option>
                            <option value="tamil">Tamil</option>
                          </Form.Select>
                        </Form.Group>

                        <Row className="mb-3">
                          {(selectedLanguage === 'both' || selectedLanguage === 'english') && (
                            <Col md={selectedLanguage === 'both' ? 6 : 12}>
                              <Form.Group>
                                <Form.Label>Question (English)</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={2}
                                  value={currentQuestion.questionEn}
                                  onChange={(e) => setCurrentQuestion(prev => ({
                                    ...prev,
                                    questionEn: e.target.value
                                  }))}
                                  placeholder="Enter question in English"
                                />
                              </Form.Group>
                            </Col>
                          )}
                          {(selectedLanguage === 'both' || selectedLanguage === 'tamil') && (
                            <Col md={selectedLanguage === 'both' ? 6 : 12}>
                              <Form.Group>
                                <Form.Label>Question (Tamil)</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={2}
                                  value={currentQuestion.questionTa}
                                  onChange={(e) => setCurrentQuestion(prev => ({
                                    ...prev,
                                    questionTa: e.target.value
                                  }))}
                                  placeholder="Enter question in Tamil"
                                />
                              </Form.Group>
                            </Col>
                          )}
                        </Row>

                        {[0, 1, 2, 3].map((index) => (
                          <Row key={index} className="mb-3">
                            {(selectedLanguage === 'both' || selectedLanguage === 'english') && (
                              <Col md={selectedLanguage === 'both' ? 5 : 10}>
                                <Form.Group>
                                  <Form.Label>Option {index + 1} (English)</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={currentQuestion.optionsEn[index]}
                                    onChange={(e) => {
                                      const newOptionsEn = [...currentQuestion.optionsEn];
                                      newOptionsEn[index] = e.target.value;
                                      setCurrentQuestion(prev => ({
                                        ...prev,
                                        optionsEn: newOptionsEn
                                      }));
                                    }}
                                    placeholder={`Enter option ${index + 1} in English`}
                                  />
                                </Form.Group>
                              </Col>
                            )}
                            {(selectedLanguage === 'both' || selectedLanguage === 'tamil') && (
                              <Col md={selectedLanguage === 'both' ? 5 : 10}>
                                <Form.Group>
                                  <Form.Label>Option {index + 1} (Tamil)</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={currentQuestion.optionsTa[index]}
                                    onChange={(e) => {
                                      const newOptionsTa = [...currentQuestion.optionsTa];
                                      newOptionsTa[index] = e.target.value;
                                      setCurrentQuestion(prev => ({
                                        ...prev,
                                        optionsTa: newOptionsTa
                                      }));
                                    }}
                                    placeholder={`Enter option ${index + 1} in Tamil`}
                                  />
                                </Form.Group>
                              </Col>
                            )}
                            <Col md={2}>
                              <Form.Group>
                                <Form.Label>Correct?</Form.Label>
                                <Form.Check
                                  type="radio"
                                  name="correctAnswer"
                                  checked={currentQuestion.correctAnswer === index}
                                  onChange={() => setCurrentQuestion(prev => ({
                                    ...prev,
                                    correctAnswer: index
                                  }))}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        ))}

                        <Button
                          variant="primary"
                          onClick={handleAddQuestion}
                          className="mt-2"
                        >
                          <FiPlus className="me-1" /> Add Question
                        </Button>
                      </Form>
                    </div>
                  ) : null}

                  <div className="questions-list mt-4">
                    {testData.sections.length === 0 ? (
                      <Alert variant="info">
                        No questions added yet. Click "Create Questions" to add your first question.
                      </Alert>
                    ) : (
                      testData.sections.map((question, index) => (
                        <div key={index} className="question-item border rounded p-3 mb-3">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h6>Question {index + 1}</h6>
                              <p className="mb-1">{question.questionEn}</p>
                              <p className="mb-2 text-muted">{question.questionTa}</p>
                            </div>
                            <div>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => handleEditQuestion(index)}
                              >
                                <FiEdit2 />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteQuestion(index)}
                              >
                                <FiTrash2 />
                              </Button>
                            </div>
                          </div>
                          <div className="options-list">
                            {question.optionsEn.map((option, optIndex) => (
                              <div key={optIndex} className={`option-item ${optIndex === question.correctAnswer ? 'text-success' : ''}`}>
                                {optIndex + 1}. {option} / {question.optionsTa[optIndex]}
                                {optIndex === question.correctAnswer && ' (Correct)'}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
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