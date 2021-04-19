import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Deck, Slide, Notes, mdxComponentMap } from 'spectacle';

import slides, { notes } from './slides.mdx';

const Presentation = () => (
    <MDXProvider components={mdxComponentMap}>
      <Deck>
        {slides
            .map((MDXSlide, i) => [MDXSlide, notes[i]])
            .map(([MDXSlide, MDXNote], i) => (
                <Slide key={`slide-${i}`} slideNum={i}>
                  <MDXSlide />
                  <Notes>
                    <MDXNote />
                  </Notes>
                </Slide>
            ))}
      </Deck>
    </MDXProvider>
);

export default Presentation
//
