import React from 'react'
import { render } from '@vtex/test-tools/react'

import BackToTopButton from './index'

describe('<BackToTopButton /> component', () => {
  it('should be rendered', () => {
    const { asFragment } = render(<BackToTopButton />)

    expect(asFragment()).toBeTruthy()
  })
})
