import React from 'react'
import ProductPrice from './../../ProductPrice'
import { renderWithIntl } from '../../__helpers__/intl-helper'
import PropTypes from 'prop-types'

describe('<ProductPrice />', () => {
  const defaultProps = {
    loaderClass: '',
    showListPrice: false,
    sellingPrice: 40,
  }

  const context = { culture: { currency: 'USD' } }

  const renderComponent = customProps => {
    const props = {
      ...defaultProps,
      ...customProps,
    }
    return renderWithIntl(<ProductPrice {...props} />, {
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

  it('should match snapshot Loader', () => {
    expect(renderComponent({ showListPrice: true })).toMatchSnapshot()
  })
})
