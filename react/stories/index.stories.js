import React from 'react'

import { storiesOf } from '@storybook/react'
import { actions } from '@storybook/addon-actions'

import BuyButton from '../BuyButton'
import Container from '../Container'

const buyButtonActions = actions(
  'showToast',
  'onAddStart',
  'onAddFinish',
  'addToCart',
  'setMinicartOpen'
)

const buyButtonProps = {
  skuItems: [],
  large: false,
}

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
  .addDecorator(storyFn => <Container>{storyFn()}</Container>)
  .addDecorator(storyFn => <p className={`t-body lh-copy`}>{storyFn()}</p>)
  .add('default', () => <BuyButton {...buyButtonActions} {...buyButtonProps} />)
  .add('normal', () => (
    <BuyButton {...buyButtonActions} {...buyButtonProps}>
      Add to Cart
    </BuyButton>
  ))
  .add('disabled', () => (
    <BuyButton {...buyButtonProps} disabled={true}>
      Disabled
    </BuyButton>
  ))
  .add('unavailable', () => <BuyButton {...buyButtonProps} available={false} />)
  .add('large', () => (
    <BuyButton {...buyButtonProps} large={true}>
      Large
    </BuyButton>
  ))
