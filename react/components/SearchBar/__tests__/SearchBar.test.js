import React from 'react'
import { shallow } from 'enzyme'

import SearchBar from '../index'

describe('<SearchBar />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<SearchBar />)
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
  })
})
