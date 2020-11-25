import React from 'react'
import { render, wait } from '@vtex/test-tools/react'

import ProductBrand from '../../ProductBrand'
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

describe('<ProductBrand /> component', () => {
  const renderComponent = (logoRedirect: boolean) => {
    const props = {
      fallbackToText: true,
      height: 100,
      excludeBrands: [],
      logoWithLink: logoRedirect,
    }

    const comp = (
      <ProductBrand {...props} displayMode="logo" loadingPlaceholder="logo" />
    )

    return render(comp, { graphql: { mocks } })
  }

  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('brand image should not have a link', async () => {
    const { queryByTestId } = renderComponent(false)

    await wait(() => {
      jest.runAllTimers()
    })
    expect(queryByTestId('logo-redirect')).toBeNull()
  })

  it('brand image should have a link', async () => {
    const { getByTestId } = renderComponent(true)

    await wait(() => {
      jest.runAllTimers()
    })

    expect(getByTestId('logo-redirect')).toBeDefined()
  })
})
