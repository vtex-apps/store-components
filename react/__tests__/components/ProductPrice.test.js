import React from 'react'
import ProductPrice from './../../ProductPrice'
import { render } from 'enzyme'

describe("<ProductPrice />", () => {
  let renderComponent = null
  const defaultProps = {
    loaderClass: '',
    showListPrice: false,
    sellingPrice: 40,
    intl: { formatNumber: (number) => number }
  }
  
  const context = { culture: { currency : 'USD' } };

  beforeEach(() => {
    renderComponent = customProps => {
      const props = {
        ...defaultProps,
        ...customProps,
      }
      return render(<ProductPrice {...props} />, { context })
    }
  })

  it('should be mount', () => {
    expect(renderComponent()).toBeDefined()
  })

  it('should match snapshot', () => {
    expect(renderComponent()).toMatchSnapshot()
  })
  
  it('should match snapshot Loader', () => {
    expect(renderComponent({ showListPrice: true })).toMatchSnapshot()
  })
})