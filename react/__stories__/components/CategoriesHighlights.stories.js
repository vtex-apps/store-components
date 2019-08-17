import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, radios, boolean, number } from '@storybook/addon-knobs'

import CategoriesHighlights from '../../CategoriesHighlights'
import Container from '../../Container'

storiesOf('CategoriesHighlights', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <Container>{storyFn()}</Container>)
  .add('default', () => {
    const props = {
      cardShape: radios(
        'Shape',
        { Squared: 'squared', Rectangular: 'rectangular' },
        'squared'
      ),
      quantityOfItems: number('Items', 2, {
        range: true,
        min: 2,
        max: 8,
        step: 2,
      }),
      showCategoriesHighlighted: boolean('Show Highlighted', true),
    }
    return <CategoriesHighlights {...props} />
  })
