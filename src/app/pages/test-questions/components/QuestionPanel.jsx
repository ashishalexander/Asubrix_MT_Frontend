// components/QuestionPanel.jsx
import React from 'react';
import { Card, Form, Button, Badge } from 'react-bootstrap';
import { BookmarkFill, BookmarkCheckFill } from 'react-bootstrap-icons';
// import './QuestionPanel.scss';

const QuestionPanel = ({ question, onOptionSelect, onMarkForReview }) => {
  return (
    <Card className="question-panel">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Badge bg="primary" className="question-number me-2">{question.id}</Badge>
            <h5 className="mb-0">Question</h5>
          </div>
          <Button 
            variant={question.markedForReview ? "warning" : "outline-warning"}
            onClick={onMarkForReview}
            className="mark-review-btn d-flex align-items-center"
          >
            {question.markedForReview ? (
              <>
                <BookmarkCheckFill className="me-1" />
                Marked for Review
              </>
            ) : (
              <>
                <BookmarkFill className="me-1" />
                Mark for Review
              </>
            )}
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>{question.question}</Card.Title>
        <Form className="mt-4">
          {question.options.map((option, index) => (
            <Form.Check
              key={index}
              type="radio"
              id={`option-${question.id}-${index}`}
              name={`question-${question.id}`}
              label={option}
              checked={question.selectedOption === index}
              onChange={() => onOptionSelect(index)}
              className={`mb-3 option-item ${question.selectedOption === index ? 'selected' : ''}`}
            />
          ))}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default QuestionPanel;