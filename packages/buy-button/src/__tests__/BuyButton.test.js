import React from 'react'
import { shallow } from 'enzyme'

import BuyButton from '../index'

describe('<BuyButton />', () => {
  it('should pass', () => {
    expect(1).toBe(1)
  })

  it('should be rendered', () => {
    const wrapper = shallow(<BuyButton />)

    expect(wrapper).toBeDefined()
  })
})
