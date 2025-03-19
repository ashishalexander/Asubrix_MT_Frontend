// components/InfoSidebar.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import { TbArrowBigLeftLines, TbArrowBigRightLines } from "react-icons/tb";

// import './InfoSidebar.scss';

const InfoSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`info-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-tab" onClick={toggleSidebar}>
        <span className="sidebar-tab-text">
          {isOpen ? <TbArrowBigLeftLines/> :<TbArrowBigRightLines/> }
        </span>
      </div>
      
      {isOpen && (
        <div className="sidebar-content">
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Student Information</Card.Title>
              <Card.Text>
                <strong>Name:</strong> John Doe<br />
                <strong>ID:</strong> STU12345<br />
                <strong>Exam:</strong> General Knowledge Test
              </Card.Text>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <Card.Title>Question Indicators</Card.Title>
              <div className="indicator-legend">
                <div className="d-flex align-items-center mb-2">
                  <div className="sample-indicator answered"></div>
                  <span>Answered Question</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className="sample-indicator not-answered"></div>
                  <span>Not Answered</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className="sample-indicator marked-for-review"></div>
                  <span>Marked for Review</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className="sample-indicator answered marked-for-review">
                    <span className="answer-badge"></span>
                  </div>
                  <span>Answered & Marked for Review</span>
                </div>
                <div className="d-flex align-items-center">
                  <div className="sample-indicator current"></div>
                  <span>Current Question</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InfoSidebar;