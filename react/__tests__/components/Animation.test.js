import React from 'react'

import Animation from '../../Animation'
import { render } from 'enzyme'

describe('<Animation /> component', () => {
  const renderComponent = customProps => {
    const comp = <Animation {...customProps}> Test </Animation>

    return render(comp)
  }

  it('should be rendered', () => {
    const wrapper = renderComponent()
    expect(wrapper).toBeTruthy()
  })

  it('should match snapshot animation left', () => {
    const wrapper = renderComponent()
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot animation right', () => {
    const wrapper = renderComponent({ type: 'drawerRight' })
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot animation top', () => {
    const wrapper = renderComponent({ type: 'drawerTop' })
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot animation bottom', () => {
    const wrapper = renderComponent({ type: 'drawerBottom' })
    expect(wrapper).toMatchSnapshot()
  })
})
