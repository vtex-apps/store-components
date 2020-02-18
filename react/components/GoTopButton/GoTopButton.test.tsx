import React from 'react'
import { render } from '@vtex/test-tools/react'

import GoTopButton from './index'

describe('<GoTopButton /> component', () => {
  it('should be rendered', () => {
    const { asFragment } = render(<GoTopButton />)

    expect(asFragment()).toBeTruthy()
  })
})
