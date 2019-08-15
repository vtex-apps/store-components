import React from 'react'

import { storiesOf } from '@storybook/react'
import { actions } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import BuyButton from '../../BuyButton'
import Container from '../../Container'

const buyButtonActions = actions(
  'showToast',
  'onAddStart',
  'onAddFinish',
  'addToCart',
  'setMinicartOpen'
)

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
