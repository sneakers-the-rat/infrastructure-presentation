import React from 'react';

import { Text, Heading } from 'spectacle'
import Paper from "@material-ui/core/Paper"

import styled  from 'styled-components'

export const FinalText = styled(Text)`
  font-family: "Source Serif Pro";
  padding: 30px 0
`;

export const FinalPaper = styled(Paper)`
  width: 95%; 
  height: 85%;
  padding: 20px;
  display: inline-block;
`;

export const RedHead = styled(Heading)`
  text-align: left;
  color: #CF005D;
  font-weight: 200;
  font-style: italic;
`;

