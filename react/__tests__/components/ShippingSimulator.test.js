import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { render } from '@vtex/test-tools/react'

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

    return render(component)
  }

  it('should be able to mount and not break', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toBeTruthy()
  })

  it('should match snapshot without skuId and seller', () => {
    const { asFragment } = renderComponent()
    expect(asFragment).toMatchSnapshot()
  })

  it('should match snapshot with skuId and seller', () => {
    const props = {
      skuId: 'skuId',
      seller: 1,
    }
    const { asFragment } = renderComponent(props)
    expect(asFragment()).toMatchSnapshot()
  })
})
