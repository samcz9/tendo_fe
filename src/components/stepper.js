import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ProviderRating from './providerRating';
import DiagnosisFeedback from './diagnosisFeedback';
import PatientFeelings from './patientFeelings';
import feedbackSurveyAPI from '../api/feedbackSurvey'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Your Care Provider', 'Your Diagnosis', 'Your Feelings'];
}

export default function FeedbackStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [physicianRating, setPhysicianRating] = React.useState(null);
  const [understanding, setUnderstanding] = React.useState(null);
  const [understandingFeedback, setUnderstandingFeedback] = React.useState("");
  const [sentiment, setSentiment] = React.useState("") 
  const steps = getSteps();
  const auth_token = '27007246b8b8a1820a928246b60f8aaa712079be'
  const user_id = 'a1c47fdf-4968-4901-a56f-36b718c9ecee'
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ProviderRating rating={physicianRating} setRating={setPhysicianRating}/>
      case 1:
        return <DiagnosisFeedback 
                  understanding={understanding} 
                  setUnderstanding={setUnderstanding}
                  understandingFeedback={understandingFeedback}
                  setUnderstandingFeedback={setUnderstandingFeedback} 
                />
      case 2:
        return <PatientFeelings sentiment={sentiment} setSentiment={setSentiment}/>;
      default:
        return 'Unknown step';
    }
  }
  const handleNext = async () => {
    if(activeStep == 2){
      let data = {
        physician_rating: physicianRating,
        understanding: understanding,
        understanding_notes: understandingFeedback,
        patient_expression: sentiment,
        appointment_id: 1
      }
      let response = await feedbackSurveyAPI.postFeedbackSurvey(auth_token, user_id, data)
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography variant="h5" align="center">
            Thanks for submitting your feedback!
          </Typography>
        </Paper>
      )}
    </div>
  );
}