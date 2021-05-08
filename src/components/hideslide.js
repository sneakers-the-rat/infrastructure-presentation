import React from 'react';
import {DeckContext, Slide} from 'spectacle';

export default function HideSlide(
  {
      bufferSlides=1,
slideNum,
backgroundColor,
      children,
      ...rest
  }
){

  const { slideCount, skipTo, activeView } = React.useContext(DeckContext);

  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    console.log('setshow', slideNum, bufferSlides, activeView, show)
    if (activeView.slideIndex === undefined){
      console.log('doing nothing')
    } else {
      setShow((activeView.slideIndex>=slideNum-bufferSlides) && (activeView.slideIndex <=slideNum+bufferSlides))
    }
    // else if (show === false && (slideNum-bufferSlides<=activeView.slideIndex && activeView.slideIndex <=slideNum+bufferSlides)){
    //   setShow(true)
    //   console.log('set true', slideNum)
    // } else if (show === true && (slideNum+bufferSlides<=activeView.slideIndex || activeView.slideIndex <=slideNum-bufferSlides)){
    //   setShow(false)
    //
    //   console.log('set false', slideNum)
    // }
  }, [activeView])

  return(
  <Slide
      key={'innerslide-'+slideNum}
      slideNum={slideNum}
      backgroundColor={backgroundColor}
      {...rest}
  >
    {show ? children : <></>}
  </Slide>)
}

HideSlide.defaultProps={
  bufferSlides:1
}
