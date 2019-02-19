import React from 'react'
import { shallow } from 'enzyme'

import BuyButton from '../../BuyButton'

describe('<BuyButton />', () => {
  let wrapper

  const renderComponent = customProps => {
    const props = {
      ...customProps,
      showToast: () => {},
    }

    const component = shallow(<BuyButton {...props}> Test </BuyButton>)

    return component
  }

  it('should be rendered', () => {
    const wrapper = renderComponent()
    expect(wrapper).toBeDefined()
    expect(wrapper).toBeTruthy()
  })

  it('should match snapshot normal', () => {
    const wrapper = renderComponent({ available: true, skuItems: [] })
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot unavailable', () => {
    const wrapper = renderComponent({ available: false, skuItems: [] })
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot loading', () => {
    const wrapper = renderComponent({ available: false })
    expect(wrapper).toMatchSnapshot()
  })
})
