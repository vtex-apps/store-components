import React from 'react'
import ProductPrice from './../../ProductPrice'
import { mount } from 'enzyme'

describe("<ProductPrice />", () => {
  let renderComponent = null
  const defaultProps = {
    loaderClass: '',
    intl: { formatNumber: (number, currency) => `${currency} ${number}` }
  }
  
  const context = { culture: { currency : 'USD' } };

  beforeEach(() => {
    renderComponent = customProps => {
      const props = {
        ...defaultProps,
        ...customProps,
      }
      return mount(<ProductPrice {...props} />, { context })
    }
  })

  it('should be mount', () => {
    expect(renderComponent()).toBeDefined()
  })

  it('should match snapshot', () => {
    expect(renderComponent()).toMatchSnapshot()
  })
})