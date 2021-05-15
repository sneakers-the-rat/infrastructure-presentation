import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import StepButton from '@material-ui/core/StepButton'
import StepConnector from "@material-ui/core/StepConnector"
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
    textAlign: 'left',
    lineHeight: 1,
    paddingLeft: "0.5em",
    color: "#000000"
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
  iconContainer: { // define styles for icon container
    transform: 'scale(2)',
    marginRight: "0.5em"
  },
  connector: {
    minHeight: "40px",
    marginLeft: "17px"
  }
}))

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad']
}

export default function VerticalLinearStepper(props) {
  const classes = useStyles(props)
  const [activeStep, setActiveStep] = React.useState(-1)
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

  const handleStep = (step) => () => {
    step === activeStep ? setActiveStep(-1) : setActiveStep(step)
  }

  return (
    <div className={classes.root + ' vertical-stepper'}>
      <Stepper
        className={classes.stepper}
        activeStep={activeStep}
        orientation="vertical"
        elevation={2}
        connector={<StepConnector classes={{lineVertical:classes.connector}}/>}
      >
        {steps.map((label, index) => (
          <Step key={label} disabled={false}>
            <StepButton onClick={handleStep(index)} className={classes.label}><StepLabel classes={{iconContainer:classes.iconContainer}} className={classes.label}>{label}</StepLabel></StepButton>
            <StepContent>
              {typeof step_text[index] === 'string' ? (
                <Typography className={classes.bodytext}>
              {step_text[index]}
                </Typography>) :
                step_text[index]
              }
              <div className={classes.actionsContainer}>
                <div>
                  {activeStep > 0 &&
                  <Button
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>}
                  {activeStep < steps.length -1 &&
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  }
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
