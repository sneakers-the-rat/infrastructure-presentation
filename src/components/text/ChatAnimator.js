import React from 'react';

import {Launcher} from 'react-chat-window';
import {SlideContext, useSteps} from 'spectacle';

export default function ChatAnimator(
    {
        agentProfile={teamName:'',imageUrl:''},
        onMessageWasSent=()=>{},
        messages=[],
        stepIndex=1,
        nSteps,
        ...rest
    }
){

  const numberOfSteps = nSteps ? nSteps : messages.length

  const { activeStepIndex, isSlideActive } = React.useContext(SlideContext);

  const { stepId, isActive, stepNum, placeholder } = useSteps(numberOfSteps, {
    stepIndex,
  });

  // console.log('chatter', {activeStepIndex, isSlideActive, stepId, isActive, stepNum})

  const [showMessages, setShowMessages] = React.useState([])

  React.useEffect(() => {
    let toShow;
    if (isSlideActive && (stepIndex<=activeStepIndex<stepIndex+numberOfSteps)){
      toShow = messages.slice(0, activeStepIndex-stepIndex+1);
    } else {
      toShow = [];
    }
    setShowMessages(toShow)

  }, [activeStepIndex])

  return(
      <div className={'chat-animator'}>
      {placeholder}
      <Launcher
          agentProfile={agentProfile}
          onMessageWasSent={onMessageWasSent}
          messageList={showMessages}
          {...rest}
        />
      </div>
  )


}
