// components/QuestionNavigator.jsx
import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons'
// import './QuestionNavigator.scss';

const QuestionNavigator = ({ questions, currentQuestionIndex, setCurrentQuestionIndex, onPrevious, onNext }) => {
  return (
    <div className="question-navigator">
      <Row>
        <Col xs={2}>
          <Button variant="outline-primary" onClick={onPrevious} disabled={currentQuestionIndex === 0}>
            <ArrowLeft /> Previous
          </Button>
        </Col>

        <Col xs={8}>
          <div className="indicators d-flex justify-content-center">
            {questions.map((question, index) => {
              let indicatorClass = 'question-indicator'

              // Check if the user has visited the question
              const isVisited = question.selectedOption !== null || index < currentQuestionIndex

              // Default to "not visited" (grey)
              if (!isVisited) {
                indicatorClass += ' not-visited'
              }

              // If visited but not answered, make it red
              if (isVisited && question.selectedOption === null) {
                indicatorClass = 'question-indicator not-answered'
              }

              // If answered, make it green
              if (question.selectedOption !== null) {
                indicatorClass = 'question-indicator answered'
              }

              // If marked for review, make it blue
              if (question.markedForReview) {
                indicatorClass = 'question-indicator marked-for-review'
              }

              // If current question, highlight it
              if (index === currentQuestionIndex) {
                indicatorClass += ' current'
              }

              return (
                <div key={question.id} className={indicatorClass} onClick={() => setCurrentQuestionIndex(index)}>
                  {index + 1}
                  {question.selectedOption !== null && question.markedForReview && <span className="answer-badge"></span>}
                </div>
              )
            })}
          </div>
        </Col>

        <Col xs={2} className="text-end">
          <Button variant="outline-primary" onClick={onNext} disabled={currentQuestionIndex === questions.length - 1}>
            Next <ArrowRight />
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default QuestionNavigator
