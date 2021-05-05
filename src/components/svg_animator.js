import React, { useState, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import anime from 'animejs'
import { ReactSVG } from 'react-svg'
// import { ThemeContext } from 'styled-components'
import { SlideContext } from 'spectacle';
import { useSteps } from 'spectacle';


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

  const { activeStepIndex, isSlideActive } = React.useContext(SlideContext);
  // console.log(slide);

  const { stepId, isActive, stepNum, placeholder } = useSteps(numberOfSteps, {stepIndex});
  let animeSteps = React.useRef([]);
  let activeStep = React.useRef(null);
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
    // animeSteps.current = steps.map(step => {
    //   step.autoplay = false;
    //   return(anime(step))
    // })
  // console.log('passed steps', steps)
  // console.log('stepid', stepId, stepNum, stepIndex)
  // }, [])


  // const [activeStep, setActiveStep] = React.useState(null)

  const handleClick = () => {
    console.log(activeStep, animeSteps);
    // setActiveStep(activeStep+1)
  }

  // componentDidMount
  // useEffect(() => {
  //   console.log('componentDidMount')
  //   setStep(0)
  // }, [])

  useEffect(() => {
    // console.log('stepid', activeStepIndex)
    console.log('calling',id, activeStepIndex, animeSteps, activeStep, stepId);

    try {
      // animeSteps[activeStepIndex-1].play();
      setStep(activeStepIndex);
    } catch(e) {
      console.log(e)
    }
  }, [activeStepIndex])

  const setStep = (stepIdx) => {
      console.log('setStep',id, stepIdx, activeStep);
      let tempActiveStep = activeStep.current;
      if (tempActiveStep === null){
      //   first step all the way backwards to rewind
        console.log('doing initial reverse', id)
        // animeSteps.current.reverse().forEach((step) => {
        //
        //   step.pause();
        //   step.seek(0)
        // })
        steps.reverse().forEach((step) => {

          anime.remove(step.targets)
          let animeStep = anime({...step, autoplay:false});
          animeStep.seek(0);
        })
        steps.reverse()
        tempActiveStep = 0;
          //   step.reverse();
          //   step.seek(step.duration);
          //   step.reverse()
          //
          // })
      }
      if (!isFinite(stepIdx)){
        stepIdx = 0;
      }

      let a_step;
      if (stepIdx > tempActiveStep){
      //  call all the intermediate steps
        for (let i=tempActiveStep; i<stepIdx; i++){
          // a_step = animeSteps.current[i]
          a_step = anime({...steps[i], autoplay:false})
          console.log('i_incr', id, i, a_step)
          // if (a_step.direction === 'reverse'){
          //   a_step.reverse()
          // }
          a_step.play();

          // animeSteps.current[i] = a_step;
        }
      } else if (stepIdx < tempActiveStep){
        for (let i=tempActiveStep-1; i>=stepIdx; i--){
          // a_step = animeSteps.current[i];
          anime.remove(steps[i].targets);
          if (steps[i].loop !== true) {
            a_step = anime({...steps[i], autoplay: false})
            a_step.seek(a_step.duration)
            a_step.reverse()
            a_step.play()
          }
          console.log('i_decr', id, i, a_step)
        //   if (a_step.loop === true){
        //     a_step.pause();
        //     a_step.seek(0);
        //     anime.remove(a_step)
        //   } else {
        //     if (a_step.direction === 'normal'){
        //       a_step.reverse()
        //     }
        //     a_step.play()
        // }

        animeSteps.current[i] = a_step;
      }}
      // setActiveStep(stepIdx);
    activeStep.current = stepIdx;
  }


  return(
      // <svg className={"animated-svg"} id={id} style={{position:'absolute', top:0,left:0,width:"1920px", height:"1080px"}}>
      <div>
        {placeholder}
      <ReactSVG
          key={id+'onlysvg'}
          className={"animated-svg"}
          id={id}
          src={svgUrl}
      />
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
