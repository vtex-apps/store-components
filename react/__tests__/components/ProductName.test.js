import React from 'react'
import ProductName from './../../ProductName'
import { render } from 'enzyme'
import PropTypes from 'prop-types'

describe('<ProductName />', () => {
  const defaultProps = {
    loaderClass: '',
    name: 'ProductTest',
  }

  const context = { culture: { currency: 'USD' } }

  const renderComponent = customProps => {
    const props = {
      ...defaultProps,
      ...customProps,
    }
    return render(<ProductName {...props} />, {
      context,
      childContextTypes: {
        culture: PropTypes.object,
      },
    })
  }

  it('should be mount', () => {
    expect(renderComponent()).toBeDefined()
  })

  it('should match snapshot', () => {
    expect(renderComponent()).toMatchSnapshot()
  })

  it('should match snapshot with SkuName', () => {
    expect(
      renderComponent({ skuName: 'ProductSkuName', showSku: true })
    ).toMatchSnapshot()
  })

  it('should match snapshot Loader', () => {
    expect(renderComponent({ name: undefined })).toMatchSnapshot()
  })
})
