import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Deck, Slide, Notes, mdxComponentMap } from 'spectacle'

import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

import slides_intro, { notes as notes_intro } from './slides/0_intro.mdx'
import slides_p2p, { notes as notes_p2p } from './slides/1_data.mdx'
import slides_tools, { notes as notes_tools } from './slides/2_tools.mdx'
import slides_knowledge, { notes as notes_knowledge } from './slides/3_knowledge.mdx'
import slides_conclusion, { notes as notes_conclusion } from './slides/4_conclusion.mdx'

let all_slides = [
  slides_intro,
  slides_p2p,
  slides_tools,
  slides_knowledge,
  slides_conclusion
]

let all_notes = [
  notes_intro,
  notes_p2p,
  notes_tools,
  notes_knowledge,
  notes_conclusion
]

// https://github.com/FormidableLabs/spectacle/blob/main/src/theme/default-theme.js
const spectacle_theme = {
  size: {
    width: 1920,
    height: 1080,
    // maxCodePaneHeight: 200
  },
  colors: {
    primary: '#111111',
    // secondary: '#FFEB3B',
    secondary: '#111111',
    tertiary: '#1e2852',
    quaternary: '#ff3333',
    quinary: '#8bddfd',
    background: '#EEEEEE',
    tools: '#CF005D',
    knowledge: '#45B6D9',
    data: '#2F0987'
  },
  fonts: {
    header: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    headerSerif: '"EB Garamond", serif',
    text: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    monospace: '"Consolas", "Menlo", monospace',
    titleHeader: '"Fira Code", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  fontSizes: {
    h1: '72px',
    h2: '64px',
    h3: '56px',
    text: '44px',
    monospace: '20px',
  },
  space: [0, 0, 32],
}

const transition = {
  from: {
    opacity: 0
  },
  enter: {
    opacity: 1
  },
  leave: {
    opacity: 0
  }
}

const material_theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: spectacle_theme['colors']['secondary'],
    },
    secondary: {
      main: spectacle_theme['colors']['tertiary'],
    },
    background: {
      main: spectacle_theme.colors.background,
    },
  },
  typography: {
    fontFamily: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
    h1: {
      fontSize: 72,
    },
    h2: {
      fontSize: 64,
    },
    h3: {
      fontSize: 56,
    },
    body1: {
      fontSize: 44,
    },
    body2: {
      fontSize: 40,
    },
  },
})
let slide_num = 0;
function Presentation(){
  // iterate through slides here.
  // MDXSlide elements should have exported
  // variables as props (or at least
  // MDXCreateElement does in the debugger)
  return(
  <MDXProvider components={mdxComponentMap}>
    <Deck theme={spectacle_theme}>
      {all_slides.map((slides, j) =>
          slides.map((MDXSlide, i) => [MDXSlide, all_notes[j][i]]).
              map(([MDXSlide, MDXNote], i) => (
                  <ThemeProvider theme={material_theme}>
                    <Slide
                        key={`slide-${slide_num}`}
                        slideNum={slide_num}
                        backgroundColor={'background'}
                    >
                      <MDXSlide/>
                      <Notes>
                        <MDXNote/>
                      </Notes>
                    </Slide>
                    {slide_num += 1}
                  </ThemeProvider>
              ))
      )}
    </Deck>
  </MDXProvider>)
}

export default Presentation
//
