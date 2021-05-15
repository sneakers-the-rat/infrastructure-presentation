// https://github.com/FormidableLabs/spectacle/blob/main/src/theme/default-theme.js
import React from 'react';
import {createMuiTheme} from '@material-ui/core/styles';

export const spectacle_theme = {
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
    data: '#2f0987',
    dataLight: '#784ed2',
  },
  fonts: {
    header: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    headerSerif: '"Source Serif Pro", "EB Garamond", serif',
    quote: '"Source Serif Pro", "EB Garamond", serif',
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
  fontWeights: {
    h1: 200
  },
  fontStyles: {
    h1: 'italic'
  },
  space: [0, 0, 32],
};
export const material_theme = createMuiTheme({
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
    data: spectacle_theme.colors.data,
    tools: spectacle_theme.colors.tools,
    knowledge: spectacle_theme.colors.knowledge
  },
  typography: {
    fontFamily: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
    h1: {
      fontSize: 72,
      textAlign: 'left'
    },
    h2: {
      fontSize: 64,
      lineHeight: 1,
      textAlign: 'left'
    },
    h3: {
      fontSize: 56,
    textAlign: 'left'
    },
    body1: {
      fontSize: 44,
    },
    body2: {
      fontSize: 40,
      lineHeight: 1.1
    },
  },
});

