// components/QuestionPanel.jsx
import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
// import './QuestionPanel.scss';

const QuestionPanel = ({ question, onOptionSelect, onMarkForReview }) => {
  return (
    <Card className="question-panel">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5>Question {question.id}</h5>
          <Button 
            variant={question.markedForReview ? "warning" : "outline-warning"}
            onClick={onMarkForReview}
          >
            {question.markedForReview ? "Unmark for Review" : "Mark for Review"}
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>{question.question}</Card.Title>
        <Form>
          {question.options.map((option, index) => (
            <Form.Check
              key={index}
              type="radio"
              id={`option-${question.id}-${index}`}
              name={`question-${question.id}`}
              label={option}
              checked={question.selectedOption === index}
              onChange={() => onOptionSelect(index)}
              className="mb-3"
            />
          ))}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default QuestionPanel;