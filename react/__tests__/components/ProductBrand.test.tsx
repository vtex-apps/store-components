import React from 'react'
import { render, wait } from '@vtex/test-tools/react'

import ProductBrand from '../../ProductBrand'
import type { ProductBrandProps } from '../../ProductBrand'
import brandLogoQuery from '../../graphql/productBrand.gql'

const mocks = [
  {
    request: {
      query: brandLogoQuery,
      variables: {
        id: 2000850,
      },
    },
    result: {
      data: {
        brand: {
          slug: 'billabong',
          imageUrl: '/220310/billabong.jpg',
        },
      },
    },
  },
]

const mocksWithoutImage = [
  {
    request: {
      query: brandLogoQuery,
      variables: {
        id: 2000850,
      },
    },
    result: {
      data: {
        brand: {
          slug: 'billabong',
        },
      },
    },
  },
]

describe('<ProductBrand /> component', () => {
  const renderComponent = (props: ProductBrandProps) => {
    const comp = <ProductBrand {...props} loadingPlaceholder="logo" />

    return render(comp, { graphql: { mocks } })
  }

  const renderComponentWithoutImage = (props: ProductBrandProps) => {
    const comp = <ProductBrand {...props} loadingPlaceholder="logo" />

    return render(comp, { graphql: { mocks: mocksWithoutImage } })
  }

  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('brand image should not have a link', async () => {
    const { queryByTestId } = renderComponent({})

    await wait(() => {
      jest.runAllTimers()
    })

    expect(queryByTestId('logo-redirect')).toBeNull()
    expect(queryByTestId('name-redirect')).toBeNull()
  })

  it('brand image should be backwards compatible and have a link', async () => {
    const { queryByTestId } = renderComponent({
      logoWithLink: true,
    })

    await wait(() => {
      jest.runAllTimers()
    })

    expect(queryByTestId('logo-redirect')).toBeDefined()
    expect(queryByTestId('name-redirect')).toBeNull()
  })

  it('brand text should have a link', async () => {
    const { queryByTestId } = renderComponent({
      withLink: 'text',
      displayMode: 'text',
    })

    await wait(() => {
      jest.runAllTimers()
    })

    expect(queryByTestId('logo-redirect')).toBeNull()
    expect(queryByTestId('name-redirect')).toBeDefined()
  })

  it('brand text should have a link when withLink equals logoAndText', async () => {
    const { queryByTestId } = renderComponent({
      withLink: 'logoAndText',
      displayMode: 'text',
    })

    await wait(() => {
      jest.runAllTimers()
    })

    expect(queryByTestId('logo-redirect')).toBeNull()
    expect(queryByTestId('name-redirect')).toBeDefined()
  })

  it('brand image should have a link when withLink equals logoAndText', async () => {
    const { queryByTestId } = renderComponent({
      withLink: 'logoAndText',
    })

    await wait(() => {
      jest.runAllTimers()
    })

    expect(queryByTestId('logo-redirect')).toBeDefined()
    expect(queryByTestId('name-redirect')).toBeNull()
  })

  it('brand should fallback to text and not have a link when withLinks equals logo', async () => {
    const { queryByTestId } = renderComponentWithoutImage({
      withLink: 'logo',
    })

    await wait(() => {
      jest.runAllTimers()
    })

    expect(queryByTestId('logo-redirect')).toBeNull()
    expect(queryByTestId('name-redirect')).toBeNull()
  })

  it('brand should fallback to text and have a link when withLinks equals text', async () => {
    const { queryByTestId } = renderComponentWithoutImage({
      withLink: 'text',
    })

    await wait(() => {
      jest.runAllTimers()
    })

    expect(queryByTestId('logo-redirect')).toBeNull()
    expect(queryByTestId('name-redirect')).toBeDefined()
  })

  it('brand should fallback to text and have a text link when withLink equals logoAndText', async () => {
    const { queryByTestId } = renderComponentWithoutImage({
      withLink: 'logoAndText',
    })

    await wait(() => {
      jest.runAllTimers()
    })

    expect(queryByTestId('logo-redirect')).toBeNull()
    expect(queryByTestId('name-redirect')).toBeDefined()
  })
})
