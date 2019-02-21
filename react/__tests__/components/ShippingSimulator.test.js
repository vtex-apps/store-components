import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { renderWithIntl } from 'intl-helper'

import ShippingSimulator from '../../ShippingSimulator'

describe('<ShippingSimulator /> component', () => {
  const renderComponent = (customProps = {}) => {
    const props = {
      country: 'brazil',
      ...customProps,
    }
    const component = (
      <MockedProvider mocks={[]}>
        <ShippingSimulator {...props} />
      </MockedProvider>
    )

    return renderWithIntl(component)
  }

  it('should be able to mount and not break', () => {
    const component = renderComponent()
    expect(component).toBeTruthy()
  })

  it('should match snapshot without skuId and seller', () => {
    const component = renderComponent()
    expect(component).toMatchSnapshot()
  })

  it('should match snapshot with skuId and seller', () => {
    const props = {
      skuId: 'skuId',
      seller: 1,
    }
    const component = renderComponent(props)
    expect(component).toMatchSnapshot()
  })
})
