import React from 'react'
import { renderWithIntl } from 'intl-helper'

import GradientCollapse from '../../GradientCollapse'

describe('<GradientCollapse />', () => {
  function renderComponent(customProps = {}) {
    const props = {
      collapseHeight: 50,
      ...customProps,
    }
    const component = <GradientCollapse {...props}>Test</GradientCollapse>

    return renderWithIntl(component)
  }

  it('should be able to mount and not break', () => {
    const comp = renderComponent()
    expect(comp).toBeTruthy()
  })

  it('should match snapshot', () => {
    const comp = renderComponent()
    expect(comp).toMatchSnapshot()
  })
})
