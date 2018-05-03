import React from 'react'
import { shallow } from 'enzyme'

import BuyButton from '../index'

describe('<BuyButton />', () => {
  let wrapper

  const props = {
    quantity: 1,
    skuId: 1,
    seller: '1',
    salesChannel: '1',
    orderFormId: '12321',
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
})
