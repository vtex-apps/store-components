import React from 'react'
import { renderWithIntl } from 'intl-helper'

import SKUSelector from './../../SKUSelector'

describe('<SKUSelector />', () => {
  const renderComponent = customProps => {
    const sku = {
      name: 'SKU 1',
      commertialOffer: {
        Price: 12,
      },
      images: [
        {
          imageUrl: 'mockedUrl',
          imageLabel: 'Image 1',
        },
      ],
      itemId: '1',
      variations: [
        {
          name: 'color',
          values: ['blue', 'yellow'],
        },
      ],
    }

    const props = {
      skuSelected: sku,
      skuItems: [sku, sku, sku],
      ...customProps,
    }
    return renderWithIntl(<SKUSelector {...props} />)
  }

  it('should be mount', () => {
    expect(renderComponent()).toBeDefined()
  })

  it('should match snapshot', () => {
    expect(renderComponent()).toMatchSnapshot()
  })

  it('should match snapshot Loader', () => {
    expect(renderComponent({ showListPrice: true })).toMatchSnapshot()
  })
})
