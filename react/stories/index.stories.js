import React from 'react'

import { storiesOf } from '@storybook/react'
import { actions } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import BuyButton from '../BuyButton'
import Container from '../Container'

const buyButtonActions = actions(
  'showToast',
  'onAddStart',
  'onAddFinish',
  'addToCart',
  'setMinicartOpen'
)

storiesOf('Conainter', module).add('default', () => (
  <Container>
    <article>
      <header>
        <h1 className={`t-heading-2`}>Hi!</h1>
        <h3 className={`t-heading-3 c-muted-2`}>
          I'm a <code className={`c-on-base`}>&lt;Container /&gt;</code>
        </h3>
      </header>
      <p className={`t-body lh-copy`}>
        You can use me to center your UI on the screen!
      </p>
      <p className={`t-body lh-copy`}>🤓</p>
    </article>
  </Container>
))

storiesOf('BuyButton', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <p className={`t-body lh-copy`}>{storyFn()}</p>)
  .addDecorator(storyFn => <Container>{storyFn()}</Container>)
  .add('default', () => (
    <BuyButton
      {...buyButtonActions}
      skuItems={[]}
      large={boolean('Large', false)}
      available={!boolean('Unavailable', false)}
      disabled={boolean('Disable', false)}
      children={text('Label')}
    />
  ))
