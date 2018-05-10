import React from 'react'
import { shallow } from 'enzyme'

import { BuyButton } from '../index'

describe('<BuyButton />', () => {
  let wrapper

  const props = {
    quantity: 1,
    skuId: '1',
    seller: 1,
    salesChannel: '1',
    data: { orderForm: { orderFormId: '12321' } },
    mutate: jest.fn(),
    afterClick: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<BuyButton {...props}> teste </BuyButton>)
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
  })

  it('should call afterClick and mutate', () => {
    expect(props.afterClick.mock.calls.length).toBe(0)
    expect(props.mutate.mock.calls.length).toBe(0)
    wrapper.find('Button').simulate('click')
    expect(props.afterClick.mock.calls.length).toBe(1)
    expect(props.mutate.mock.calls.length).toBe(1)
  })
})
