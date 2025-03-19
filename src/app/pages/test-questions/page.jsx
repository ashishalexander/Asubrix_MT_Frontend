// App.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionNavigator from './components/QuestionNavigator';
import QuestionPanel from './components/QuestionPanel';
import InfoSidebar from './components/InfoSidebar';
// import './App.scss';

function TestQuestions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  
  // Sample questions for the test
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      selectedOption: null,
      markedForReview: false
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Mercury"],
      selectedOption: null,
      markedForReview: false
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      selectedOption: null,
      markedForReview: false
    },
    {
      id: 4,
      question: "What is the chemical symbol for gold?",
      options: ["Go", "Gl", "Au", "Ag"],
      selectedOption: null,
      markedForReview: false
    },
    {
      id: 5,
      question: "Which of these is not a programming language?",
      options: ["Java", "Python", "Banana", "JavaScript"],
      selectedOption: null,
      markedForReview: false
    }
  ]);

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

  const handleSubmitTest = () => {
    alert("Test submitted successfully!");
    // Here you would typically send the answers to your backend
  };

  return (
    <div className="app-container">
      <div className={`main-content ${showInfoPanel ? 'with-sidebar' : ''}`}>
        <Container fluid className="test-app">
          <Row className="header mb-3 p-2">
            <Col xs={12}>
              <h1>Online Test</h1>
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col xs={12}>
              <QuestionNavigator 
                questions={questions} 
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                onPrevious={handlePreviousQuestion}
                onNext={handleNextQuestion}
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
          
          <Row>
            <Col xs={12} className="d-flex justify-content-end">
              <Button variant="success" size="lg" onClick={handleSubmitTest}>
                Submit Test
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      
      <InfoSidebar 
        isOpen={showInfoPanel} 
        toggleSidebar={() => setShowInfoPanel(!showInfoPanel)} 
      />
    </div>
  );
}

export default TestQuestions;