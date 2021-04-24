import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background: '#EEEEEE',
  },
  stepper: {
    background: '#F5F5F5',
  },
  label: {
    fontSize: 30,
  },
  bodytext: {
    fontSize: 30,
    fontWeight: 200,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}))

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad']
}

export default function VerticalLinearStepper(props) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  let steps = []
  let step_text = []
  for (let i = 0; i < props.steps.length; i++) {
    steps[i] = props.steps[i].title
    step_text[i] = props.steps[i].body
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <div className={classes.root + ' vertical-stepper'}>
      <Stepper
        className={classes.stepper}
        activeStep={activeStep}
        orientation="vertical"
        elevation={2}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel className={classes.label}>{label}</StepLabel>
            <StepContent>
              <Typography className={classes.bodytext}>
                {step_text[index]}
              </Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
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
      {activeStep === steps.length && props.finalText.length > 0 && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>{props.finalText}</Typography>
          <Button onClick={handleReset}>Reset</Button>
        </Paper>
      )}
    </div>
  )
}
