import React from 'react'
import { renderWithIntl } from 'intl-helper'

import DiscountBadge from '../../DiscountBadge'

describe('<DiscountBadge /> component', () => {
  function renderComponent(customProps = {}) {
    const props = {
      listPrice: 100,
      sellingPrice: 90,
      ...customProps,
    }
    const component = <DiscountBadge {...props}>Test</DiscountBadge>

    return renderWithIntl(component)
  }

  it('should be able to mount and not break', () => {
    const component = renderComponent()
    expect(component).toBeTruthy()
  })

  it('should match snapshot without label', () => {
    const component = renderComponent()
    expect(component).toMatchSnapshot()
  })

  it('should match snapshot with label', () => {
    const component = renderComponent({ label: 'LABEL' })
    expect(component).toMatchSnapshot()
  })
})
