import React, { useState } from 'react'

import { SplitText } from './SplitText'
import { AnimatePresence, motion } from 'framer-motion'

import { useSteps } from 'spectacle';
import { SlideContext } from 'spectacle';


export default function TextAnimator(
    {
        id,
        initial={y:"100%"},
        animated= i => ({
          y: 0,
          transition: {
            delay: i * 0.1
          }
        }),
        stepIndex,
        extraClass = '',
        children
    }) {
  const { immediate } = React.useContext(SlideContext);

  const { isActive, placeholder } = useSteps(1, { id, stepIndex });



  return (
    <AnimatePresence>
      {placeholder}
      {isActive && (
          <motion.div
              id={id}
              className={'animated-text-container' + ' ' + extraClass}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
          >
            <SplitText
                id={id}
                initial={initial}
                animate="visible"
                variants={{
                  visible: animated
                }}
            >
              {children}
            </SplitText>
          </motion.div>
      )}
    </AnimatePresence>
  )
}
