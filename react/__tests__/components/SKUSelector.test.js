import React from 'react'
import { renderWithIntl } from 'intl-helper'

import SKUSelector from './../../SKUSelector'
import SKU from 'sku-helper'

describe('<SKUSelector />', () => {
  const renderComponent = customProps => {
    const props = {
      skuSelected: SKU.getSKU(),
      skuItems: [SKU.getSKU('Black'), SKU.getSKU('Blue'), SKU.getSKU('Yellow')],
      ...customProps,
    }
    return renderWithIntl(<SKUSelector {...props} />)
  }

  it('should be mounted', () => {
    expect(renderComponent()).toBeDefined()
  })

  it('should match the snapshot', () => {
    expect(renderComponent()).toMatchSnapshot()
  })
})
