import React from 'react'

import Logo from '../../Logo'
import { render } from 'enzyme'

describe('<Logo /> component', () => {
  const renderComponent = customProps => {
    const props = {
      ...customProps,
    }
    const comp = <Logo {...props} />

    return render(comp)
  }

  it('should be rendered', () => {
    const wrapper = renderComponent()
    expect(wrapper).toBeTruthy()
  })

  it('should match snapshot with label', () => {
    const wrapper = renderComponent()
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot without label', () => {
    const wrapper = renderComponent({ showLabel: false })
    expect(wrapper).toMatchSnapshot()
  })
})
