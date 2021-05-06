import React from 'react'
import { motion } from 'framer-motion'

export function SplitText({ children, id, ...rest }) {
  let words = children.split(' ')
  return words.map((word, i) => {
    return (
        <div
            key={children + i}
            style={{ display: 'inline-block', overflow: 'hidden' }}
        >
          <motion.div
              id={id+'-'+word}
              idx={i}
              {...rest}
              style={{ display: 'inline-block', willChange: 'transform' }}
              custom={i}
          >
            {word + (i !== words.length - 1 ? '\u00A0' : '')}
          </motion.div>
        </div>
    )
  })
}
