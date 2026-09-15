import React from 'react'
import { render, fireEvent, wait } from '@vtex/test-tools/react'
import { useProduct, ProductContext } from 'vtex.product-context'
import { getSKU } from 'sku-helper'
import { useCssHandles } from 'vtex.css-handles'

import SKUSelector, {
  SKU_SELECTOR_CSS_HANDLES,
} from '../../components/SKUSelector/Wrapper'
import RawSKUSelectorContainer from '../../components/SKUSelector'
import { SKUSelectorCssHandlesProvider } from '../../components/SKUSelector/SKUSelectorCssHandles'
import { orderItemsByAvailability } from '../../components/SKUSelector/components/SKUSelector'

/* `SKUSelectorContainer` (the exported default) expects the css handles
 * context that `Wrapper` normally provides. Wire it up directly here to
 * exercise the container with props it wasn't derived from. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SKUSelectorContainer = (props: any) => {
  const { handles, withModifiers } = useCssHandles(SKU_SELECTOR_CSS_HANDLES)

  return (
    <SKUSelectorCssHandlesProvider
      handles={handles}
      withModifiers={withModifiers}
    >
      <RawSKUSelectorContainer {...props} />
    </SKUSelectorCssHandlesProvider>
  )
}

describe('<SKUSelector />', () => {
  const renderComponent = (customProps = {}) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props: any = {
      skuSelected: getSKU(),
      skuItems: [getSKU('Black'), getSKU('Blue'), getSKU('Yellow')],
      ...customProps,
    }

    return render(<SKUSelector {...props} />)
  }

  const mockedUseProduct = useProduct as jest.Mock<ProductContext>

  it('should call onSKUSelected', async () => {
    const onSKUSelected = jest.fn()
    const { container } = renderComponent({ onSKUSelected })

    await wait()
    const selector = container.querySelector('.skuSelectorItem')

    await wait(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      fireEvent.click(selector!)
    })
    expect(onSKUSelected).toBeCalledTimes(2)
  })

  /* Regression for https://github.com/vtex-apps/product-context/pull/88: the
   * resync below used to re-derive the whole selection from the resolved SKU,
   * silently re-picking a size the shopper had just cleared. */
  it('should keep a deliberately cleared variation cleared when the resolved sku changes', async () => {
    const defaultSeller = {
      sellerDefault: true,
      commertialOffer: { Price: 15, ListPrice: 20, AvailableQuantity: 1 },
    }

    const buildItem = (itemId: string, color: string, size: string) => ({
      itemId,
      name: `${color} ${size}`,
      variations: [
        { name: 'Size', values: [size] },
        { name: 'Color', values: [color] },
      ],
      sellers: [defaultSeller],
      images: [],
    })

    /* Every colour has two sizes, so picking a colour can never resolve a
     * unique size on its own. */
    const skuItems = [
      buildItem('1', 'Gray', '41'),
      buildItem('2', 'Gray', '42'),
      buildItem('3', 'Black', '41'),
      buildItem('4', 'Black', '42'),
    ]

    const { container, getByText, rerender } = render(
      <SKUSelector
        skuSelected={skuItems[0]}
        skuItems={skuItems}
        seeMoreLabel="seeMoreLabel"
      />
    )

    await wait()

    const sizeItem = () => container.querySelector('.skuSelectorItem--41')

    expect(sizeItem()).toHaveClass('skuSelectorItem--selected')

    await wait(() => {
      getByText('41').click()
    })

    expect(sizeItem()).not.toHaveClass('skuSelectorItem--selected')

    /* The resolved SKU moving to another item re-runs the resync. */
    rerender(
      <SKUSelector
        skuSelected={skuItems[2]}
        skuItems={skuItems}
        seeMoreLabel="seeMoreLabel"
      />
    )

    await wait()

    expect(sizeItem()).not.toHaveClass('skuSelectorItem--selected')
    expect(container.querySelector('.skuSelectorItem--black')).toHaveClass(
      'skuSelectorItem--selected'
    )
  })

  /* Regression: with `initialSelection="empty"`, getNewSelectedVariations
   * wipes the whole selection unconditionally whenever the resync effect
   * runs. A caller that keeps `variations` stable but re-sends the same
   * `skuItems` in a different order (e.g. re-sorted by availability) must
   * not have that count as a change and trigger that wipe on a colour the
   * shopper picked but never "cleared". This exercises the exported
   * container directly, since `Wrapper` derives `variations` from `skuItems`
   * and would recompute it on any reorder regardless of this fix. */
  it('should not wipe a picked variation when skuItems is re-sent in a different order (initialSelection=empty)', async () => {
    const defaultSeller = {
      sellerDefault: true,
      commertialOffer: { Price: 15, ListPrice: 20, AvailableQuantity: 1 },
    }

    const buildItem = (itemId: string, color: string, size: string) => ({
      itemId,
      name: `${color} ${size}`,
      variations: [
        { name: 'Size', values: [size] },
        { name: 'Color', values: [color] },
      ],
      variationValues: { Size: size, Color: color },
      sellers: [defaultSeller],
      images: [],
    })

    const skuItems = [
      buildItem('1', 'Gray', '41'),
      buildItem('2', 'Gray', '42'),
      buildItem('3', 'Black', '41'),
      buildItem('4', 'Black', '42'),
    ]

    const variations = {
      Size: {
        originalName: 'Size',
        values: [
          { name: '41', originalName: '41' },
          { name: '42', originalName: '42' },
        ],
      },
      Color: {
        originalName: 'Color',
        values: [
          { name: 'Gray', originalName: 'Gray' },
          { name: 'Black', originalName: 'Black' },
        ],
      },
    }

    const { container, getByText, rerender } = render(
      <SKUSelectorContainer
        skuSelected={skuItems[0]}
        skuItems={skuItems}
        variations={variations}
        seeMoreLabel="seeMoreLabel"
        initialSelection="empty"
      />
    )

    await wait()

    const blackItem = () => container.querySelector('.skuSelectorItem--black')

    await wait(() => {
      getByText('Black').click()
    })

    expect(blackItem()).toHaveClass('skuSelectorItem--selected')

    /* Same items, same skuSelected, same `variations` reference, reversed
     * `skuItems` order: no real change, so the pick above must survive. */
    rerender(
      <SKUSelectorContainer
        skuSelected={skuItems[0]}
        skuItems={[...skuItems].reverse()}
        variations={variations}
        seeMoreLabel="seeMoreLabel"
        initialSelection="empty"
      />
    )

    await wait()

    expect(blackItem()).toHaveClass('skuSelectorItem--selected')
  })

  /* A clear from one product must not carry over to another when the
   * component isn't remounted (e.g. carousel/quickview navigation). */
  it('should not keep a cleared variation across a switch to a different product', async () => {
    const defaultSeller = {
      sellerDefault: true,
      commertialOffer: { Price: 15, ListPrice: 20, AvailableQuantity: 1 },
    }

    const buildItem = (itemId: string, color: string, size: string) => ({
      itemId,
      name: `${color} ${size}`,
      variations: [
        { name: 'Size', values: [size] },
        { name: 'Color', values: [color] },
      ],
      sellers: [defaultSeller],
      images: [],
    })

    const productAItems = [
      buildItem('a1', 'Gray', '41'),
      buildItem('a2', 'Gray', '42'),
      buildItem('a3', 'Black', '41'),
      buildItem('a4', 'Black', '42'),
    ]

    /* A different product, sharing no itemId with product A, that happens to
     * reuse the "Size" variation name. */
    const productBItems = [
      buildItem('b1', 'Blue', '41'),
      buildItem('b2', 'Blue', '42'),
    ]

    const { container, getByText, rerender } = render(
      <SKUSelector
        skuSelected={productAItems[0]}
        skuItems={productAItems}
        seeMoreLabel="seeMoreLabel"
      />
    )

    await wait()

    const sizeItem = () => container.querySelector('.skuSelectorItem--41')

    await wait(() => {
      getByText('41').click()
    })

    expect(sizeItem()).not.toHaveClass('skuSelectorItem--selected')

    /* Switching to product B without unmounting: no shared itemId, so the
     * clear from product A must not apply here. */
    rerender(
      <SKUSelector
        skuSelected={productBItems[0]}
        skuItems={productBItems}
        seeMoreLabel="seeMoreLabel"
      />
    )

    await wait()

    expect(sizeItem()).toHaveClass('skuSelectorItem--selected')
  })

  it('should render the options an select one', async () => {
    const defaultSeller = {
      commertialOffer: { Price: 15, AvailableQuantity: 1 },
    }

    const skuItems = [
      {
        itemId: '1',
        name: 'Gray Shoe',
        variations: [
          { name: 'Size', values: ['41'] },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '2',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['41', '42', '43'] },
          { name: 'Color', values: ['Black'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '3',
        name: 'Blue Shoe',
        variations: [
          { name: 'Size', values: ['41', '42', '43'] },
          { name: 'Color', values: ['Blue', 'Black'] },
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
            values: ['42'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
    ]

    const [skuSelected] = skuItems
    const onSKUSelected = jest.fn()
    const { getByText } = render(
      <SKUSelector
        skuItems={skuItems}
        displayMode="select"
        skuSelected={skuSelected}
        initialSelection="empty"
        onSKUSelected={onSKUSelected}
      />
    )

    await wait()

    await wait(() => {
      getByText('Gray').click()
    })

    expect(getByText('42')).toBeDefined()

    await wait(() => {
      getByText('42').click()
    })

    expect(onSKUSelected).toBeCalledTimes(2)
    expect(getByText('41')).toBeDefined()
  })

  it('should be able to order by availability', async () => {
    const defaultSeller1 = {
      sellerDefault: true,
      commertialOffer: { Price: 15, AvailableQuantity: 0, ListPrice: 200 },
    }

    const defaultSeller2 = {
      sellerDefault: true,
      commertialOffer: { Price: 15, AvailableQuantity: 1, ListPrice: 200 },
    }

    const skuItems = [
      {
        itemId: '1',
        name: 'Gray Shoe',
        variations: ['Size', 'Color'],
        variationValues: { Size: '41', Color: 'Gray' },
        sellers: [defaultSeller1],
        images: [],
      },
      {
        itemId: '2',
        name: 'Gray Shoe',
        variations: ['Size', 'Color'],
        variationValues: { Size: '41', Color: 'Gray' },
        sellers: [defaultSeller2],
        images: [],
      },
    ]

    const possibleItemsOrderedByAvailability = skuItems.sort(
      orderItemsByAvailability
    )

    expect(possibleItemsOrderedByAvailability[0].itemId).toEqual('2')
  })

  it('should render only three main variations', async () => {
    const defaultSeller = {
      commertialOffer: { Price: 15, AvailableQuantity: 1 },
    }

    const skuItems = [
      {
        itemId: '1',
        name: 'Gray Shoe',
        variations: [
          { name: 'Size', values: ['41'] },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '2',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['41'] },
          { name: 'Color', values: ['Black'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '3',
        name: 'Blue Shoe',
        variations: [
          { name: 'Size', values: ['41'] },
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
            values: ['42'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
    ]

    const [skuSelected] = skuItems

    const { getByText, getAllByText } = render(
      <SKUSelector skuSelected={skuSelected} skuItems={skuItems} />
    )

    await wait()

    expect(getAllByText(/gray/i)).toHaveLength(1)
    expect(getAllByText(/blue/i)).toHaveLength(1)
    expect(getAllByText(/black/i)).toHaveLength(1)

    expect(getByText(/color/i)).toBeInTheDocument()
    expect(getByText(/size/i)).toBeInTheDocument()
  })

  it('should render show 8 items for variation and see more button', async () => {
    const defaultSeller = {
      commertialOffer: { Price: 15, AvailableQuantity: 1 },
    }

    const skuItems = [
      {
        itemId: '1',
        name: 'Gray Shoe',
        variations: [
          { name: 'Size', values: ['41'] },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '2',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['41'] },
          { name: 'Color', values: ['Black'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '3',
        name: 'Blue Shoe',
        variations: [
          { name: 'Size', values: ['41'] },
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
            values: ['42'],
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
            values: ['43'],
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
            values: ['44'],
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
            values: ['45'],
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
            values: ['46'],
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
            values: ['47'],
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
            values: ['41'],
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
            values: ['38'],
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
            values: ['39'],
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

    const [skuSelected] = skuItems

    const { getByText, queryByText } = render(
      <SKUSelector skuSelected={skuSelected} skuItems={skuItems} />
    )

    await wait()
    // await Promise.resolve()
    expect(getByText('seeMoreLabel')).toBeDefined()
    expect(getByText('38')).toBeDefined()
    expect(queryByText('39')).toBeNull()
  })

  it('should respect given maxItems prop set and show see more button', async () => {
    const defaultSeller = {
      commertialOffer: { Price: 15, AvailableQuantity: 1 },
    }

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

    const [skuSelected] = skuItems

    const { getByText, queryByText } = render(
      <SKUSelector skuSelected={skuSelected} skuItems={skuItems} maxItems={6} />
    )

    await wait()

    // eslint-disable-next-line jest/valid-expect
    expect(getByText('seeMoreLabel'))
    expect(getByText('4')).toBeDefined()
    expect(queryByText('5')).toBeNull()
  })

  it('should show all variations when count is inside threshold', async () => {
    const defaultSeller = {
      commertialOffer: { Price: 15, AvailableQuantity: 1 },
    }

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

    const [skuSelected] = skuItems

    const { getByText, queryByText } = render(
      <SKUSelector skuSelected={skuSelected} skuItems={skuItems} />
    )

    await wait()
    expect(queryByText('seeMoreLabel')).toBeNull()
    expect(getByText('10')).toBeDefined()
  })

  it('should show all options if a sku selected variations appears later on the array than in the cut', async () => {
    const defaultSeller = {
      commertialOffer: { Price: 15, AvailableQuantity: 1 },
    }

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

    const skuSelected = skuItems.find(({ itemId }) => itemId === '15')

    const { getByText } = render(
      <SKUSelector skuSelected={skuSelected} skuItems={skuItems} maxItems={6} />
    )

    await wait()

    expect(getByText('4')).toBeDefined()
    expect(getByText('12')).toBeDefined()
  })

  it('remove accent from names on slugify methods', async () => {
    const defaultSeller = {
      commertialOffer: { Price: 15, AvailableQuantity: 1 },
    }

    const skuItems = [
      {
        itemId: '1',
        name: 'Gray Shoe',
        variations: [
          { name: 'Size', values: ['[Square Brackets]'] },
          { name: 'Color', values: ['Jácó'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '2',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['[Square Brackets]'] },
          { name: 'Color', values: ['@@Testing&&'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '3',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['[Square Brackets]'] },
          { name: 'Color', values: ["John's"] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '4',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['[Square Brackets]'] },
          { name: 'Color', values: ['Feijão'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
    ]

    const { queryByText } = render(
      <SKUSelector skuSelected={skuItems[0]} skuItems={skuItems} maxItems={6} />
    )

    await wait()
    expect(queryByText('skuSelectorItem--feijao')).toBeDefined()
    expect(queryByText('skuSelectorItem--square-brackets')).toBeDefined()
    expect(queryByText('skuSelectorItem--johns')).toBeDefined()
    expect(queryByText('skuSelectorItem--testing')).toBeDefined()
    expect(queryByText('skuSelectorItem--jaco')).toBeDefined()
  })

  it('should show the selected variation name', async () => {
    const defaultSeller = {
      commertialOffer: { Price: 15, AvailableQuantity: 1 },
    }

    const skuItems = [
      {
        itemId: '1',
        name: 'Gray Shoe',
        variations: [
          { name: 'Size', values: ['41'] },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '2',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['41'] },
          { name: 'Color', values: ['Black'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
    ]

    const { container } = render(
      <SKUSelector
        skuSelected={skuItems[0]}
        skuItems={skuItems}
        maxItems={6}
        showValueNameForImageVariation
      />
    )

    await wait()

    const separator = container.querySelector('.skuSelectorNameSeparator')
    const variationValue = container.querySelector(
      '.skuSelectorSelectorImageValue'
    )

    expect(separator).toHaveTextContent(':')
    expect(variationValue).toHaveTextContent('Gray')
  })

  /* Order of the color variations should be: Black, Gray, Blue.
   * Order of the Size variations should be: 42, 41
   * The snapshot should validate if the values are coming correctly  */
  it('should consider order from skuSpecifications', async () => {
    const defaultSeller = {
      commertialOffer: { Price: 15, ListPrice: 20, AvailableQuantity: 10 },
    }

    const firstSku = {
      itemId: '1',
      name: 'Gray Shoe',
      variations: [
        { name: 'Size', values: ['41'] },
        { name: 'Color', values: ['Gray'] },
      ],
      sellers: [defaultSeller],
      images: [],
    }

    mockedUseProduct.mockImplementation(
      function getProductContext(): ProductContext {
        return {
          product: {
            buyButton: {
              clicked: false,
            },
            skuSelector: {
              isVisible: true,
              areAllVariationsSelected: true,
            },
            selectedItem: firstSku,
            selectedQuantity: 1,
            assemblyOptions: {
              items: {},
              areGroupsValid: {},
              inputValues: {},
            },
            skuSpecifications: [
              {
                field: {
                  name: 'Color',
                  originalName: 'Color',
                },
                values: [
                  {
                    name: 'Black',
                    originalName: 'Black',
                  },
                  {
                    name: 'Gray',
                    originalName: 'Gray',
                  },
                  {
                    name: 'Blue',
                    originalName: 'Blue',
                  },
                ],
              },
              {
                field: {
                  name: 'Size',
                  originalName: 'Size',
                },
                values: [
                  {
                    name: '43',
                    originalName: '43',
                  },
                  {
                    name: '42',
                    originalName: '42',
                  },
                  {
                    name: '41',
                    originalName: '41',
                  },
                ],
              },
            ],
          },
        }
      }
    )
    const skuItems = [
      firstSku,
      {
        itemId: '2',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['41', '42', '43'] },
          { name: 'Color', values: ['Black'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '3',
        name: 'Blue Shoe',
        variations: [
          { name: 'Size', values: ['41', '42', '43'] },
          { name: 'Color', values: ['Blue', 'Black'] },
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
            values: ['42'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
    ]

    const { asFragment } = render(
      <SKUSelector skuSelected={skuItems[0]} skuItems={skuItems} maxItems={6} />
    )

    // check comment above the 'it' description
    expect(asFragment()).toMatchSnapshot()
  })

  it('should not show the Yellow variation since there is no items with the Yellow variation', async () => {
    const defaultSeller = {
      commertialOffer: { Price: 15, ListPrice: 20, AvailableQuantity: 10 },
    }

    const firstSku = {
      itemId: '1',
      name: 'Gray Shoe',
      variations: [
        { name: 'Size', values: ['41'] },
        { name: 'Color', values: ['Gray'] },
      ],
      sellers: [defaultSeller],
      images: [],
    }

    mockedUseProduct.mockImplementation(
      function getProductContext(): ProductContext {
        return {
          product: {
            buyButton: {
              clicked: false,
            },
            skuSelector: {
              isVisible: true,
              areAllVariationsSelected: true,
            },
            selectedItem: firstSku,
            selectedQuantity: 1,
            assemblyOptions: {
              items: {},
              areGroupsValid: {},
              inputValues: {},
            },
            skuSpecifications: [
              {
                field: {
                  name: 'Color',
                  originalName: 'Color',
                },
                values: [
                  {
                    name: 'Yellow',
                    originalName: 'Yellow',
                  },
                  {
                    name: 'Black',
                    originalName: 'Black',
                  },
                  {
                    name: 'Gray',
                    originalName: 'Gray',
                  },
                  {
                    name: 'Blue',
                    originalName: 'Blue',
                  },
                ],
              },
              {
                field: {
                  name: 'Size',
                  originalName: 'Size',
                },
                values: [
                  {
                    name: '43',
                    originalName: '43',
                  },
                  {
                    name: '42',
                    originalName: '42',
                  },
                  {
                    name: '41',
                    originalName: '41',
                  },
                ],
              },
            ],
          },
        }
      }
    )

    const skuItems = [
      firstSku,
      {
        itemId: '2',
        name: 'Black Shoe',
        variations: [
          { name: 'Size', values: ['41', '42', '43'] },
          { name: 'Color', values: ['Black'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
      {
        itemId: '3',
        name: 'Blue Shoe',
        variations: [
          { name: 'Size', values: ['41', '42', '43'] },
          { name: 'Color', values: ['Blue', 'Black'] },
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
            values: ['42'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        sellers: [defaultSeller],
        images: [],
      },
    ]

    const { queryByText } = render(
      <SKUSelector skuSelected={skuItems[0]} skuItems={skuItems} maxItems={6} />
    )

    expect(queryByText('Yellow')).toBeFalsy()
  })

  it('must order sku specification to be sorted in alphabetical order', async () => {
    const defaultSeller = {
      commertialOffer: { Price: 15, AvailableQuantity: 1 },
    }

    const skuItems = [
      {
        itemId: '1',
        name: 'Gray Shoe',
        variations: [
          { name: 'Size', values: ['43'] },
          { name: 'Color', values: ['Gray'] },
        ],
        images: [],
        sellers: [defaultSeller],
      },
      {
        itemId: '4',
        name: 'Gray Shoe',
        variations: [
          {
            name: 'Size',
            values: ['42'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        images: [],
        sellers: [defaultSeller],
      },
      {
        itemId: '4',
        name: 'Gray Shoe',
        variations: [
          {
            name: 'Size',
            values: ['41'],
          },
          { name: 'Color', values: ['Gray'] },
        ],
        images: [],
        sellers: [defaultSeller],
      },
    ]

    const { container } = renderComponent({
      sortVariationsByLabel: true,
      skuSelected: skuItems[0],
      skuItems,
    })

    const options = container.querySelectorAll('.skuSelectorItemTextValue')

    expect(options[0]).toHaveTextContent('41')
    expect(options[1]).toHaveTextContent('42')
    expect(options[2]).toHaveTextContent('43')
  })
})
