import React, { useState, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

// import { useSteps } from '@useSteps';
import anime from 'animejs'
import { ReactSVG } from 'react-svg'
import { ThemeContext } from 'styled-components'
import { SlideContext } from 'spectacle/lib/components/slide/slide'


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

export default function SvgAnimator({
    svgUrl,
    steps = [],
    id='animated-svg',
    stepIndex
}){
  const numberOfSteps = steps.length;
  const classes = useStyles()

  const slide = React.useContext(SlideContext);
  console.log(slide);

  // const { stepId, isActive, stepNum, placeholder } = useSteps(numberOfSteps, {stepIndex});
  let animeSteps = React.useRef([]);
  //
  // const [currentStep, setCurrentStep] = useState(0);
  //
  // const stepTarget = React.useRef();


  // assume SVG is given to us "complete" -- eg it's in its final state
  // so rewind it
  // animeSteps.reverse().forEach((step) => {
  //   step.reverse();
  //   step.seek(step.duration);
  //   step.reverse()
  //
  // })

  // componentDidMount
  // useEffect(() => {
    // let svg_container = document.getElementById(id);
    // SVGInjector(svg_container);
    animeSteps = steps.map(step => {
      step.autoplay = false;
      return(anime(step))
    })
  console.log('passed steps', steps)
  // }, [])


  const [activeStep, setActiveStep] = React.useState(-1)

  const handleClick = () => {
    console.log(activeStep, animeSteps);
    setActiveStep(activeStep+1)
  }
  useEffect(() => {
    console.log('calling', animeSteps, activeStep);
    try {
      animeSteps[activeStep].play();
    } catch(e) {
      console.log(e)
    }
  }, [activeStep])


  return(
      // <svg className={"animated-svg"} id={id} style={{position:'absolute', top:0,left:0,width:"1920px", height:"1080px"}}>
      <div>
      <ReactSVG key={'onlysvg'} className={"animated-svg"} id={id} src={svgUrl}/>
  <Button
      key={'onlybutton'}
      onClick={handleClick}
      className={classes.button}
  >
    Next
  </Button></div>
      // </svg>
  );
}
