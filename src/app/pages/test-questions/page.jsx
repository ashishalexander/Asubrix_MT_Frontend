// App.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Badge, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InfoCircleFill, Stopwatch, CheckCircleFill, ArrowLeft, ArrowRight, HouseFill, ExclamationTriangleFill, TrophyFill } from 'react-bootstrap-icons';
import QuestionNavigator from './components/QuestionNavigator';
import QuestionPanel from './components/QuestionPanel';
import InfoSidebar from './components/InfoSidebar';
// import './App.scss';

function TestQuestions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [testResults, setTestResults] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    unanswered: 0,
    score: 0,
    timeTaken: '',
  });
  
  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds
  const [timerActive, setTimerActive] = useState(true);
  const [timerWarning, setTimerWarning] = useState(false);
  const [startTime] = useState(Date.now());
  
  // Test info
  const testName = "General Knowledge Assessment";
  
  // Instructions content
  const instructions = [
    "Read each question carefully before answering.",
    "You can mark questions for review to come back to them later.",
    "Once you submit the test, you cannot change your answers.",
    "Each question carries equal marks.",
    "There is no negative marking for wrong answers.",
    "You can use the navigation panel to move between questions."
  ];
  
  // Sample questions for the test
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      selectedOption: null,
      markedForReview: false,
      correctOption: 2 // Paris
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Mercury"],
      selectedOption: null,
      markedForReview: false,
      correctOption: 1 // Mars
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      selectedOption: null,
      markedForReview: false,
      correctOption: 3 // Pacific Ocean
    },
    {
      id: 4,
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gl", "Au", "Ag"],
      selectedOption: null,
      markedForReview: false,
      correctOption: 2 // Au
    },
    {
      id: 5,
      question: "Which of these is not a programming language?",
      options: ["Java", "Python", "Banana", "JavaScript"],
      selectedOption: null,
      markedForReview: false,
      correctOption: 2 // Banana
    }
  ]);

  // Calculate test stats
  const answeredCount = questions.filter(q => q.selectedOption !== null).length;
  const markedCount = questions.filter(q => q.markedForReview).length;

  // Timer effect
  useEffect(() => {
    let interval;
    
    if (timerActive && timeRemaining > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
      
      // Set warning when less than 5 minutes remaining
      if (timeRemaining <= 300 && !timerWarning) {
        setTimerWarning(true);
      }
    } else if (timeRemaining === 0 && !showResults) {
      handleSubmitConfirm();
    }
    
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining, showResults]);
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const formatDuration = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`;
    } else {
      return `${minutes}m ${remainingSeconds}s`;
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionSelect = (optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].selectedOption = optionIndex;
    setQuestions(updatedQuestions);
  };

  const handleMarkForReview = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].markedForReview = !updatedQuestions[currentQuestionIndex].markedForReview;
    setQuestions(updatedQuestions);
  };

  const handleSubmitConfirm = () => {
    setShowConfirmation(true);
  };
  
  const handleSubmitTest = () => {
    // Close confirmation modal
    setShowConfirmation(false);
    
    // Stop the timer
    setTimerActive(false);
    
    // Calculate results
    const totalQuestions = questions.length;
    const correctAnswers = questions.filter(q => 
      q.selectedOption !== null && q.selectedOption === q.correctOption
    ).length;
    const incorrectAnswers = questions.filter(q => 
      q.selectedOption !== null && q.selectedOption !== q.correctOption
    ).length;
    const unanswered = questions.filter(q => q.selectedOption === null).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Calculate time taken
    const timeTaken = formatDuration(Date.now() - startTime);
    
    // Set results
    setTestResults({
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      unanswered,
      score,
      timeTaken,
    });
    
    // Show results page
    setShowResults(true);
  };
  
  const handleBackToHome = () => {
    // This would typically navigate to your home page
    window.location.href = "/demos/academy/home";
  };

  // If showing results page
  if (showResults) {
    return (
      <div className="app-container results-container">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <Card className="results-card">
                <Card.Body className="p-0">
                  <div className="results-header">
                    <TrophyFill size={36} className="trophy-icon" />
                    <h1>Test Results</h1>
                  </div>
                  
                  <div className="results-content p-4">
                    <h2 className="test-name mb-4">{testName}</h2>
                    
                    <div className="score-container mb-4">
                      <div className="score-circle">
                        <div className="score-value">{testResults.score}%</div>
                      </div>
                      <div className="score-label">Your Score</div>
                    </div>
                    
                    <div className="results-details">
                      <div className="result-item">
                        <div className="result-label">Total Questions</div>
                        <div className="result-value">{testResults.totalQuestions}</div>
                      </div>
                      <div className="result-item correct">
                        <div className="result-label">Correct Answers</div>
                        <div className="result-value">{testResults.correctAnswers}</div>
                      </div>
                      <div className="result-item incorrect">
                        <div className="result-label">Incorrect Answers</div>
                        <div className="result-value">{testResults.incorrectAnswers}</div>
                      </div>
                      <div className="result-item unanswered">
                        <div className="result-label">Unanswered</div>
                        <div className="result-value">{testResults.unanswered}</div>
                      </div>
                      <div className="result-item">
                        <div className="result-label">Time Taken</div>
                        <div className="result-value">{testResults.timeTaken}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <Button 
                        variant="primary" 
                        size="lg" 
                        className="back-home-btn"
                        onClick={handleBackToHome}
                      >
                        <HouseFill size={20} className="me-2" />
                        Back to Home
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className={`main-content ${showInfoPanel ? 'with-sidebar' : ''}`}>
        <Container fluid className="test-app">
          <div className="test-header">
            <div>
              <h1 className="test-title">{testName}</h1>
              <div className="mt-2">
                <Badge bg="success" className="me-2">{answeredCount} Answered</Badge>
                {markedCount > 0 && <Badge bg="warning" text="dark">{markedCount} Marked for Review</Badge>}
              </div>
            </div>
            
            <div className="d-flex align-items-center">
              <div 
                className="instructions-btn me-4"
                onClick={() => setShowInstructions(true)}
              >
                <InfoCircleFill size={20} className="info-icon" />
                <span>Test Instructions</span>
              </div>
              
              <div className={`test-timer ${timerWarning ? 'text-danger' : ''}`}>
                <Stopwatch size={20} className="timer-icon" />
                <span>{formatTime(timeRemaining)}</span>
              </div>
              
              <Button 
                variant="outline-primary"
                className="ms-3 d-md-none d-flex align-items-center" 
                onClick={() => setShowInfoPanel(!showInfoPanel)}
              >
                <InfoCircleFill size={18} className="me-2" />
                Info
              </Button>
            </div>
          </div>
          
          <Row className="mb-4">
            <Col xs={12}>
              <QuestionNavigator 
                questions={questions} 
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
              />
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col xs={12}>
              <QuestionPanel 
                question={questions[currentQuestionIndex]}
                onOptionSelect={handleOptionSelect}
                onMarkForReview={handleMarkForReview}
              />
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* Sticky Navigation Footer */}
      <div className={`navigation-footer ${showInfoPanel ? 'with-sidebar' : ''}`}>
        <div className="navigation-container">
          <Button 
            variant="outline-primary" 
            onClick={handlePreviousQuestion} 
            disabled={currentQuestionIndex === 0}
            className="nav-btn"
          >
            <ArrowLeft className="me-2" /> Previous
          </Button>
          
         
          
          <Button 
            variant="success" 
            className="nav-btn submit-btn"
            onClick={handleSubmitConfirm}
          >
            Submit Test <CheckCircleFill size={16} className="ms-2" />
          </Button>
          
          <Button 
            variant="outline-primary" 
            onClick={handleNextQuestion} 
            disabled={currentQuestionIndex === questions.length - 1}
            className="nav-btn"
          >
            Next <ArrowRight className="ms-2" />
          </Button>
        </div>
      </div>
      
      <InfoSidebar 
        isOpen={showInfoPanel} 
        toggleSidebar={() => setShowInfoPanel(!showInfoPanel)} 
        testName={testName}
        totalQuestions={questions.length}
        answeredQuestions={answeredCount}
        markedQuestions={markedCount}
        timeRemaining={formatTime(timeRemaining)}
      />
      
      {/* Instructions Modal */}
      <Modal 
        show={showInstructions} 
        onHide={() => setShowInstructions(false)}
        centered
        className="instructions-modal"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <InfoCircleFill size={20} className="me-2 text-primary" />
            Test Instructions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">Please read the following instructions carefully before proceeding with the test:</p>
          <ul className="instructions-list">
            {instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowInstructions(false)}>
            Got it
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Confirmation Modal */}
      <Modal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        centered
        className="confirmation-modal"
      >
        <Modal.Header>
          <Modal.Title className="d-flex align-items-center">
            <ExclamationTriangleFill size={24} className="me-2 text-warning" />
            Submit Test
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="confirmation-message">
            Are you sure you want to submit your test? Once submitted, you will not be able to change your answers.
          </p>
          
          <div className="test-summary">
            <h6>Test Summary</h6>
            <div className="summary-item">
              <span>Total Questions:</span>
              <span>{questions.length}</span>
            </div>
            <div className="summary-item">
              <span>Answered:</span>
              <span>{answeredCount}</span>
            </div>
            <div className="summary-item">
              <span>Unanswered:</span>
              <span>{questions.length - answeredCount}</span>
            </div>
            <div className="summary-item">
              <span>Marked for Review:</span>
              <span>{markedCount}</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitTest}>
            Yes, Submit Test
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TestQuestions;