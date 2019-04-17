import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'

import SKUSelector from './../../SKUSelector'
import { getSKU } from 'sku-helper'

describe('<SKUSelector />', () => {
  const renderComponent = (customProps = {}) => {
    const props = {
      skuSelected: getSKU(),
      skuItems: [getSKU('Black'), getSKU('Blue'), getSKU('Yellow')],
      ...customProps,
    }
    return render(<SKUSelector {...props} />)
  }

  it('should be mounted', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toBeDefined()
  })

  it('should match the snapshot', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should call onSKUSelected', () => {
    const onSKUSelected = jest.fn()
    const { container } = renderComponent({ onSKUSelected })
    const selector = container.querySelector('.skuSelectorItem')
    fireEvent.click(selector)
    expect(onSKUSelected).toBeCalledTimes(1)
  })

  it('should render only three main variations', () => {
    const defaultSeller = { commertialOffer: { Price: 15 } }
    const skuItems = [
      {
        itemId: '1',
        name: 'Gray Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '2',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Black'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '3',
        name: 'Blue Shoe',
        variations: [
          { name: 'Size', values: ['1'] },
          { name: 'Color', values: ['Blue'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '4',
        name: 'Gray Shoe',
        variations: [
          {
            name: 'Size',
            values: ['2'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
    ]
    const skuSelected = skuItems[0]

    const { asFragment } = render(
      <SKUSelector skuSelected={skuSelected} skuItems={skuItems} />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
