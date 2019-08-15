import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import Container from '../../Container'

storiesOf('Conainter', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    () => (
      <Container>
        <article>
          <header>
            <h1 className={`t-heading-2`}>{text('Title', 'Hello!')}</h1>
            <h3 className={`t-heading-3 c-muted-2`}>
              {text('Subtitle', 'I am the Container')}
            </h3>
          </header>
          <p className={`t-body lh-copy`}>
            {text('Text', 'You can use me to center your UI on the screen!')}
          </p>
          <p className={`t-small lh-copy`}>{text('Footnote', '🤓')}</p>
        </article>
      </Container>
    ),
    {
      knobs: {
        timestamps: true,
      },
    }
  )
