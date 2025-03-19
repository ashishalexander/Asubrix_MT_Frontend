import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { FiUser, FiDollarSign, FiFolder, FiPackage } from 'react-icons/fi';
import BasicInfo from './components/BasicInfo';
import PricingPlans from './components/PricingPlans';
import CourseContent from './components/CourseContent';
import CourseBundle from './components/CourseBundle';

const EditCourse = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [progress, setProgress] = useState(15);
  const [courseName, setCourseName] = useState('');

  const steps = [
    { number: 1, title: 'Basic Information', icon: <FiUser />, component: BasicInfo },
    { number: 2, title: 'Edit Price', icon: <FiDollarSign />, component: PricingPlans },
    { number: 3, title: 'Add Content', icon: <FiFolder />, component: CourseContent },
    { number: 4, title: 'Bundle(Optional)', icon: <FiPackage />, component: CourseBundle }
  ];

  return (
    <div className=" min-vh-100 py-4">
      <Container>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">{courseName || 'Create Course'}</h2>
            <p className="text-muted mb-0">Add / view content of your course</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="bg-white rounded-pill px-3 py-2 d-flex align-items-center gap-2">
              <div className="progress flex-grow-1" style={{ width: '100px', height: '6px' }}>
                <div 
                  className="progress-bar bg-info" 
                  role="progressbar" 
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                />
              </div>
              <span className="text-info small">{progress}%</span>
            </div>
            <button className="btn btn-outline-primary rounded-pill px-4">
              Add Your Name
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-4 border border-grey p-4 mb-4">
          <div className="d-flex justify-content-between position-relative mb-4">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className={`step-item text-center position-relative ${activeStep >= step.number ? 'active' : ''}`}
                style={{ flex: 1 }}
                role="button"
                onClick={() => setActiveStep(step.number)}
              >
                <div 
                  className={`step-icon rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 ${
                    activeStep === step.number ? 'bg-primary text-white' :
                    activeStep > step.number ? 'bg-success text-white' : 'bg-light text-muted'
                  }`}
                  style={{ width: '40px', height: '40px' }}
                >
                  {step.icon}
                </div>
                <h6 className={activeStep >= step.number ? 'text-dark' : 'text-muted'}>
                  {step.title}
                </h6>
                {index < steps.length - 1 && (
                  <div 
                    className="step-line position-absolute"
                    style={{
                      top: '20px',
                      right: '-50%',
                      width: '100%',
                      height: '2px',
                      background: activeStep > step.number ? '#198754' : '#e9ecef'
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="step-content">
            {steps.map(step => (
              activeStep === step.number && (
                <step.component 
                  key={step.number}
                  setActiveStep={setActiveStep}
                  setProgress={setProgress}
                  courseName={courseName}
                  setCourseName={setCourseName}
                />
              )
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EditCourse;
