import React from 'react'
import { render } from 'intl-helper'
import ProductDescription from './../../ProductDescription'

describe('<ProductDescription />', () => {
  const renderComponent = customProps => {
    const props = {
      description: 'Test description',
      ...customProps,
    }
    return render(<ProductDescription {...props} />)
  }

  it('should be mounted', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toBeDefined()
  })

  it('should match the snapshot with description', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})
