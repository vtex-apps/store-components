import React from 'react'

import Logo from '../../Logo'
import { render } from '@vtex/test-tools/react'

describe('<Logo /> component', () => {
  const renderComponent = customProps => {
    const props = {
      title: 'title',
      ...customProps,
    }
    const comp = <Logo {...props} />

    return render(comp)
  }

  it('should be rendered', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toBeTruthy()
  })

  it('should match snapshot with label', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot without label', () => {
    const { asFragment } = renderComponent({ showLabel: false })
    expect(asFragment()).toMatchSnapshot()
  })
})
