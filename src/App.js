import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Deck, Slide, Notes, mdxComponentMap } from 'spectacle';

import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

import slides, { notes } from './slides.mdx';


// https://github.com/FormidableLabs/spectacle/blob/main/src/theme/default-theme.js
const spectacle_theme = {
  size: {
    width:1920,
    height:1080,
    // maxCodePaneHeight: 200
  },
  colors: {
    primary: '#ebe5da',
    secondary: '#FFEB3B',
    tertiary: '#1e2852',
    quaternary: '#ffc951',
    quinary: '#8bddfd',
    background: "#111111"
  },
  fonts: {
    header: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    text: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    monospace: '"Consolas", "Menlo", monospace',
    titleHeader: '"Fira Code", "Helvetica Neue", Helvetica, Arial, sans-serif'
  },
  fontSizes: {
    h1: '72px',
    h2: '64px',
    h3: '56px',
    text: '44px',
    monospace: '20px'
  },
  space: [16, 24, 32]
};

const material_theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: spectacle_theme['colors']['secondary']
    },
    secondary: {
      main: spectacle_theme['colors']['tertiary']
    }
  },
  typography: {
    fontFamily: ["Helvetica Neue", "Helvetica", "Arial", 'sans-serif'],
    h1: {
      fontSize: 72
    },
    h2: {
      fontSize: 64
    },
    h3: {
      fontSize: 56
    },
    body1:{
      fontSize: 44
    }

  }
})


const Presentation = () => (
    <MDXProvider components={mdxComponentMap}>
      <Deck theme={spectacle_theme}>
        {slides.map((MDXSlide, i) => [MDXSlide, notes[i]]).
            map(([MDXSlide, MDXNote], i) => (
              <ThemeProvider theme={material_theme}>
                <Slide key={`slide-${i}`} slideNum={i}
                       backgroundColor={'background'}>
                  <MDXSlide/>
                  <Notes>
                    <MDXNote/>
                  </Notes>
                </Slide>
              </ThemeProvider>
            )
        )}
      </Deck>
    </MDXProvider>
);

export default Presentation
//
