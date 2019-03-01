import React from 'react'
import { render } from 'intl-helper'

import BuyButton from '../../BuyButton'

describe('<BuyButton />', () => {
  const renderComponent = customProps => {
    const props = {
      ...customProps,
    }

    const comp = <BuyButton {...props}> Test </BuyButton>

    return render(comp)
  }

  it('should be rendered', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toBeDefined()
    expect(asFragment()).toBeTruthy()
  })

  it('should match snapshot normal', () => {
    const { asFragment } = renderComponent({ available: true, skuItems: [] })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot unavailable', () => {
    const { asFragment } = renderComponent({ available: false, skuItems: [] })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot loading', () => {
    const { asFragment } = renderComponent({ available: false })
    expect(asFragment()).toMatchSnapshot()
  })
})
