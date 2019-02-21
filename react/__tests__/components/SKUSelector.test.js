import React from 'react'
import { renderWithIntl } from 'intl-helper'

import SKUSelector from './../../SKUSelector'
import { getSKU } from 'sku-helper'

describe('<SKUSelector />', () => {
  const renderComponent = customProps => {
    const props = {
      skuSelected: getSKU(),
      skuItems: [getSKU('Black'), getSKU('Blue'), getSKU('Yellow')],
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
