import React, { useContext } from 'react'
import { path, isEmpty } from 'ramda'
import { ProductContext } from 'vtex.product-context'

import ProductName from './index'

const styles = {
  'vtex-product-name__brand--loader': {
    x: 0,
    width: '100%',
    height: '1.631em',
  },
  'vtex-product-name__sku--loader': {
    x: 0,
    y: '2.569em',
    width: '10.311em',
    height: '1.045em',
  },
}

const ProductNameWrapper = props => {
  const { showBrandName, showSku, showProductReference } = props

  const valuesFromContext = useContext(ProductContext)

  const productNameProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) {
      return props
    }

    const { product, selectedItem } = valuesFromContext
    return {
      tag: 'h1',
      name: path(['productName'], product),
      skuName: path(['name'], selectedItem),
      productReference: path(['productReference'], product),
      brandName: path(['brand'], product),
      styles: styles,
      className: 't-heading-4',
      showBrandName,
      showSku,
      showProductReference,
    }
  }

  return <ProductName {...productNameProps()} />
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
