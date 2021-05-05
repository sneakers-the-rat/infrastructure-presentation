import React, { useState, useEffect } from "react";

import anime from "animejs";
import { ReactSVG } from "react-svg";
import { SlideContext } from "spectacle";
import { useSteps } from "spectacle";
import * as RA from 'ramda-adjunct';


export default function SvgAnimator({
  svgUrl,
  steps = [],
  id = "animated-svg",
  stepIndex,
}) {
  const numberOfSteps = steps.length;

  const { activeStepIndex, isSlideActive } = React.useContext(SlideContext);

  const { stepId, isActive, stepNum, placeholder } = useSteps(numberOfSteps, {
    stepIndex,
  });
  let animeSteps = React.useRef([]);
  let activeStep = React.useRef(null);

  useEffect(() => {
    console.log("calling", id, activeStepIndex, animeSteps, activeStep, stepId);

    try {
      setStep(activeStepIndex);
    } catch (e) {
      console.log(e);
    }
  }, [activeStepIndex]);

  // componentDidMount/dismount
  useEffect(() => {
    const animeSelectors = [... new Set(RA.flattenDepth(2, steps).map(anim => anim.targets))];
    // list of selectors from animations to clean up on dismount


    // clean up when dismounted
    return () => {
      console.log('cleaning', animeSelectors)
      animeSelectors.map(selector => anime.remove(selector))
    }
  }, [])


  const setStep = (stepIdx) => {
    let tempActiveStep = activeStep.current;
    if (tempActiveStep === null || (stepIdx === 0 && !(tempActiveStep > 0))) {
      //   first step all the way backwards to rewind
      steps.reverse().forEach((step_opts) => {
        for (let step of step_opts) {
          anime.remove(step.targets);
          let animeStep = anime({
            ...step,
            autoplay: false,
          });
          animeStep.seek(0);
        }
      });
      steps.reverse();
      tempActiveStep = 0;
    }
    // convert -infinity given preinit
    if (!isFinite(stepIdx)) {
      stepIdx = 0;
    }

    let a_step;

    //  call all the intermediate steps
    // --------------------------------------
    // increment step
    if (stepIdx > tempActiveStep) {
      for (let i = tempActiveStep; i < stepIdx; i++) {
        for (let step_opts of steps[i]) {
          a_step = anime({
            ...step_opts,
            autoplay: false,
          });
          a_step.play();
        }
      }
      // --------------------------------------
      //  decrement step
    } else if (stepIdx < tempActiveStep) {
      for (let i = tempActiveStep - 1; i >= stepIdx; i--) {
        for (let step_opts of steps[i]) {
          anime.remove(step_opts.targets);

          // if not looping, play the animation backwards
          if (step_opts.loop !== true) {
            a_step = anime({
              ...step_opts,
              autoplay: false,
            });
            a_step.reverse();
            a_step.seek(a_step.duration);

            a_step.play();
          }
        }
      }
    }
    activeStep.current = stepIdx;
  };

  return (
    <div>
      {" "}
      {placeholder}{" "}
      <ReactSVG
        key={id + "onlysvg"}
        className={"animated-svg"}
        id={id}
        src={svgUrl}
      />{" "}
    </div>
  );
}
