import React from 'react'
import { renderWithIntl } from 'intl-helper'

import DiscountBadge from '../../DiscountBadge'

describe('<DiscountBadge />', () => {
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
    const comp = renderComponent()
    expect(comp).toBeTruthy()
  })

  it('should match snapshot without label', () => {
    const comp = renderComponent()
    expect(comp).toMatchSnapshot()
  })

  it('should match snapshot with label', () => {
    const comp = renderComponent({ label: 'LABEL' })
    expect(comp).toMatchSnapshot()
  })
})
