import React from 'react'
import { render } from '@vtex/test-tools/react'
import PropTypes from 'prop-types'

import ProductName from '../../ProductName'

describe('<ProductName />', () => {
  const defaultProps = {
    loaderClass: '',
    name: 'ProductTest',
  }

  const context = { culture: { currency: 'USD' } }

  const renderComponent = (customProps: any) => {
    const props = {
      ...defaultProps,
      ...customProps,
    }

    return render(<ProductName {...props} />, {
      // @ts-expect-error ts-migrate(2345) FIXME: Object literal may only specify known properties, ... Remove this comment to see the full error message
      context,
      childContextTypes: {
        culture: PropTypes.object,
      },
    })
  }

  it('should be mounted', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const { asFragment } = renderComponent()

    expect(asFragment()).toBeDefined()
  })

  it('should match the snapshot with only Name', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match the snapshot with Name and SkuName', () => {
    const { asFragment } = renderComponent({
      skuName: 'ProductSkuName',
      showSku: true,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match the snapshot with Name and Brand', () => {
    const { asFragment } = renderComponent({
      brandName: 'ProductBrandName',
      showBrandName: true,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match the snapshot with Name and Product Reference', () => {
    const { asFragment } = renderComponent({
      productReference: 'productReferenceTest',
      showProductReference: true,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match the snapshot with all options', () => {
    const { asFragment } = renderComponent({
      skuName: 'ProductSkuName',
      showSku: true,
      brandName: 'ProductBrandName',
      showBrandName: true,
      productReference: 'productReferenceTest',
      showProductReference: true,
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match the snapshot Loader', () => {
    const { asFragment } = renderComponent({ name: undefined })

    expect(asFragment()).toMatchSnapshot()
  })
})
