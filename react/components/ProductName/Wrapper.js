import React, { useContext } from 'react'
import { path, isEmpty } from 'ramda'
import { ProductContext } from 'vtex.product-context'

import ProductName from './index'

const ProductNameWrapper = props => {
  const valuesFromContext = useContext(ProductContext)

  const name = props.name
    ? props.name
    : path(['product', 'productName'], valuesFromContext)

  const skuName = props.skuName
    ? props.skuName
    : path(['selectedItem', 'name'], valuesFromContext)

  const productReference = props.productReference
    ? props.productReference
    : path(['product', 'productReference'], valuesFromContext)

  const brandName = props.brandName
    ? props.brandName
    : path(['product', 'brand'], valuesFromContext)

  return (
    <ProductName
      name={name}
      skuName={skuName}
      showSku={props.showSku}
      productReference={productReference}
      showProductReference={props.showProductReference}
      brandName={brandName}
      showBrandName={props.showBrandName}
      styles={props.styles}
      className={props.className || 't-heading-4'}
      brandNameClass={props.brandNameClass}
      skuNameClass={props.skuNameClass}
      productReferenceClass={props.productReferenceClass}
      loaderClass={props.loaderClass}
      tag={props.tag || 'h1'}
    />
  )
}

ProductNameWrapper.schema = {
  title: 'admin/editor.productName.title',
  description: 'admin/editor.productName.description',
  type: 'object',
  properties: {
    showBrandName: {
      type: 'boolean',
      title: 'admin/editor.productName.showBrandName.title',
      default: false,
      isLayout: true,
    },
    showSku: {
      type: 'boolean',
      title: 'admin/editor.productName.showSku.title',
      default: false,
      isLayout: true,
    },
    showProductReference: {
      type: 'boolean',
      title: 'admin/editor.productName.showProductReference.title',
      default: false,
      isLayout: true,
    },
  },
}

export default ProductNameWrapper
