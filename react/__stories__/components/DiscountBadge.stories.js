import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'

import DiscountBadge from '../../DiscountBadge'
import Container from '../../Container'
import squaredPlaceholder from '../images/squared-placeholder.svg'
storiesOf('DiscountBadge', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <Container>{storyFn()}</Container>)
  .add('default', () => {
    const props = {
      listPrice: number('List Price', 100),
      sellingPrice: number('Selling Price', 90),
    }
    return (
      <DiscountBadge {...props}>
        <img src={squaredPlaceholder} />
      </DiscountBadge>
    )
  })
