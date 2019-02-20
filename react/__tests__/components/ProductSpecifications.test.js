import React from 'react'

import ProductSpecifications from '../../ProductSpecifications'
import { renderWithIntl } from 'intl-helper'

describe('<ProductSpecifications /> component', () => {
  const renderComponent = customProps => {
    const comp = <ProductSpecifications {...customProps} />

    return renderWithIntl(comp)
  }

  it('should be rendered', () => {
    const wrapper = renderComponent()
    expect(wrapper).toBeTruthy()
  })

  it('should match snapshot with table view and no specifications', () => {
    const wrapper = renderComponent()
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot with table view and with specification', () => {
    const wrapper = renderComponent({
      specifications: [{ name: 'test', values: ['value'] }],
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot with tabs view', () => {
    const wrapper = renderComponent({
      specifications: [{ name: 'test', values: ['value'] }],
      tabsMode: true,
    })
    expect(wrapper).toMatchSnapshot()
  })
})
