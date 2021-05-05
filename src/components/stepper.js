import React, { useState, useEffect } from "react";

import anime from "animejs";
import { ReactSVG } from "react-svg";
import { SlideContext } from "spectacle";
import { useSteps } from "spectacle";
import * as RA from 'ramda-adjunct';


export default function Stepper(
    {nSteps= 1}){
  const { stepId, isActive, stepNum, placeholder } = useSteps(nSteps);
  return(<>{placeholder}</>)
}
