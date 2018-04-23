import React from 'react'
import { shallow } from 'enzyme'

import { BuyButton } from '../index'

describe('<BuyButton />', () => {
  let wrapper

  let val = 2
  const valExpected = 3

  const props = {
    quantity: 1,
    skuId: 1,
    seller: '1',
    salesChannel: '1',
    orderFormId: '12321',
    mutate: jest.fn(),
    afterClick: function() {
      val += 1
    },
  }

  beforeEach(() => {
    wrapper = shallow(<BuyButton {...props}> teste </BuyButton>)
  })

  it('should match snapshot', () => {
    expect(wrapper.container).toMatchSnapshot()
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
  })

  it('should call afterClick', () => {
    wrapper.find('button').simulate('click')
    expect(val).toBe(valExpected)
  })
})
