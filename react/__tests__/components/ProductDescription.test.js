import React from 'react'
import { renderWithIntl } from 'intl-helper'
import ProductDescription from './../../ProductDescription'

describe('<ProductDescription />', () => {
  const renderComponent = customProps => {
    const props = {
      description: 'Test description',
      ...customProps,
    }
    return renderWithIntl(<ProductDescription {...props} />)
  }

  it('should be mounted', () => {
    expect(renderComponent()).toBeDefined()
  })

  it('should match the snapshot with description', () => {
    expect(renderComponent()).toMatchSnapshot()
  })
})
