import React from 'react'
import PropTypes from 'prop-types'
import { render } from '@vtex/test-tools/react'

import ProductPrice from './../../ProductPrice'
import { withContext } from 'contextUtils'
const { Provider } = React.createContext()

describe('<ProductPrice />', () => {
  const defaultProps = {
    loaderClass: '',
    showListPrice: false,
    sellingPrice: 40,
  }

  const renderComponent = customProps => {
    const context = { culture: { currency: 'USD' } }
    const props = {
      ...defaultProps,
      ...customProps,
    }
    const Component = withContext(ProductPrice, context, {
      culture: PropTypes.object,
    })
    return render(<Component {...props} />)
  }

  it('should be mount', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toBeDefined()
  })

  it('should match snapshot', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot Loader', () => {
    const { asFragment } = renderComponent({ showListPrice: true })
    expect(asFragment()).toMatchSnapshot()
  })
})
