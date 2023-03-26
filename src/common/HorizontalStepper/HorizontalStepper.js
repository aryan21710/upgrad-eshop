import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CREATE_ORDER_STEPS } from '../constants';
import './HorizontalStepper.css';
import { PropTypes } from 'prop-types';

const HorizontalStepper = ({ activeStep, setActiveStep }) => {
  const handleNext = () => {
    if (activeStep < CREATE_ORDER_STEPS.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <Box className="stepperContainer">
      <Stepper nonLinear activeStep={activeStep}>
        {CREATE_ORDER_STEPS.map((label, index) => (
          <Step key={label}>
            <StepButton className="stepButton" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box className="stepperActionButtons">
        <Button
          disabled={activeStep === 0}
          className={activeStep > 0 && 'activeButon'}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button
          variant="outlined"
          className={
            activeStep < CREATE_ORDER_STEPS.length - 1 && 'activeButon'
          }
          disabled={activeStep === CREATE_ORDER_STEPS.length - 1}
          onClick={handleNext}
          sx={{ mr: 1 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

HorizontalStepper.propTypes = {
  activeStep: PropTypes.number,
  setActiveStep: PropTypes.func,
};

export default HorizontalStepper;
