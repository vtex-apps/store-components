import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'

import SKUSelector from './../../SKUSelector'
import { getSKU } from 'sku-helper'

describe('<SKUSelector />', () => {
  const renderComponent = (customProps = {}) => {
    const props = {
      skuSelected: getSKU(),
      skuItems: [getSKU('Black'), getSKU('Blue'), getSKU('Yellow')],
      variations: [
        { name: 'Size', values: ['1'] },
        { name: 'Color', values: ['Blue'] },
      ],
      ...customProps,
    }
    return render(<SKUSelector {...props} />)
  }

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

    const { getByText, getAllByText } = render(
      <SKUSelector skuSelected={skuSelected} skuItems={skuItems} variations={skuSelected.variations} />
    )

    expect(getAllByText(/gray/i)).toHaveLength(1)
    expect(getAllByText(/blue/i)).toHaveLength(1)
    expect(getAllByText(/black/i)).toHaveLength(1)

    expect(getByText(/color/i)).toBeInTheDocument()
    expect(getByText(/size/i)).toBeInTheDocument()
  })

  it('should render show 8 items for variation and see more button', () => {
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
      {
        itemId: '5',
        name: 'xxxx',
        variations: [
          {
            name: 'Size',
            values: ['3'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '6',
        name: 'xxxxxx',
        variations: [
          {
            name: 'Size',
            values: ['4'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '7',
        name: 'xxxxaaaxx',
        variations: [
          {
            name: 'Size',
            values: ['5'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '8',
        name: 'aaaa',
        variations: [
          {
            name: 'Size',
            values: ['6'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '9',
        name: 'bb',
        variations: [
          {
            name: 'Size',
            values: ['7'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '10',
        name: 'ppp',
        variations: [
          {
            name: 'Size',
            values: ['1'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '11',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['8'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '12',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['9'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '13',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['10'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '14',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['11'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '15',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['12'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '16',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['13'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '17',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['14'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },

    ]
    const skuSelected = skuItems[0]

    const { getByText, queryByText } = render(
      <SKUSelector skuSelected={skuSelected} skuItems={skuItems} />
    )
    expect(getByText('seeMoreLabel')).toBeDefined()
    expect(getByText('8')).toBeDefined()
    expect(queryByText('9')).toBeNull()
  })

  it('should respect given maxItems prop set and show see more button', () => {
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
      {
        itemId: '5',
        name: 'xxxx',
        variations: [
          {
            name: 'Size',
            values: ['3'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '6',
        name: 'xxxxxx',
        variations: [
          {
            name: 'Size',
            values: ['4'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '7',
        name: 'xxxxaaaxx',
        variations: [
          {
            name: 'Size',
            values: ['5'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '8',
        name: 'aaaa',
        variations: [
          {
            name: 'Size',
            values: ['6'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '9',
        name: 'bb',
        variations: [
          {
            name: 'Size',
            values: ['7'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '10',
        name: 'ppp',
        variations: [
          {
            name: 'Size',
            values: ['1'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '11',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['8'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '12',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['9'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '13',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['10'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '14',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['11'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '15',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['12'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '16',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['13'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '17',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['14'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },

    ]
    const skuSelected = skuItems[0]

    const { getByText, queryByText } = render(
      <SKUSelector skuSelected={skuSelected} skuItems={skuItems} maxItems={6} />
    )
    expect(getByText('seeMoreLabel')).toBeDefined()
    expect(getByText('4')).toBeDefined()
    expect(queryByText('5')).toBeNull()
  })

  it('should respect given maxItems prop set and show see more button', () => {
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
      {
        itemId: '5',
        name: 'xxxx',
        variations: [
          {
            name: 'Size',
            values: ['3'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '6',
        name: 'xxxxxx',
        variations: [
          {
            name: 'Size',
            values: ['4'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '7',
        name: 'xxxxaaaxx',
        variations: [
          {
            name: 'Size',
            values: ['5'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '8',
        name: 'aaaa',
        variations: [
          {
            name: 'Size',
            values: ['6'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '9',
        name: 'bb',
        variations: [
          {
            name: 'Size',
            values: ['7'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '10',
        name: 'ppp',
        variations: [
          {
            name: 'Size',
            values: ['1'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '11',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['8'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '12',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['9'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '13',
        name: 'c',
        variations: [
          {
            name: 'Size',
            values: ['10'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },

    ]
    const skuSelected = skuItems[0]

    const { getByText, queryByText } = render(
      <SKUSelector skuSelected={skuSelected} skuItems={skuItems} />
    )
    expect(queryByText('seeMoreLabel')).toBeNull()
    expect(getByText('10')).toBeDefined()
  })
})

