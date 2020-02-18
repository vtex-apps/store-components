import React, { useContext } from 'react'
import { path, isEmpty } from 'ramda'
import { ProductContext } from 'vtex.product-context'
import { defineMessages } from 'react-intl'

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

const messages = defineMessages({
  editorProductNameTitle: {
    id: 'admin/editor.productName.title',
    from: 'vtex.admin-messages',
  },
  editorProductNameDescription: {
    id: 'admin/editor.productName.description',
    from: 'vtex.admin-messages',
  },
  editorProductNameShowBrandNameTitle: {
    id: 'admin/editor.productName.showBrandName.title',
    from: 'vtex.admin-messages',
  },
  editorProductNameShowSkuTitle: {
    id: 'admin/editor.productName.showSku.title',
    from: 'vtex.admin-messages',
  },
  editorProductNameShowproductReferenceTitle: {
    id: 'admin/editor.productName.showProductReference.title',
    from: 'vtex.admin-messages',
  },
})

const ProductNameWrapper = props => {
  const valuesFromContext = useContext(ProductContext)

  const productNameProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) {
      return props
    }

    const { product, selectedItem } = valuesFromContext
    return {
      ...props,
      tag: props.tag || 'h1',
      name: props.name || path(['productName'], product),
      skuName: props.skuName || path(['name'], selectedItem),
      productReference:
        props.productReference || path(['productReference'], product),
      brandName: props.brandName || path(['brand'], product),
      styles: props.styles || styles,
      className: props.className || 't-heading-4',
    }
  }

  return <ProductName {...productNameProps()} />
}

ProductNameWrapper.schema = {
  title: messages.editorProductNameTitle.id,
  description: messages.editorProductNameDescription.id,
  type: 'object',
  properties: {
    showBrandName: {
      type: 'boolean',
      title: messages.editorProductNameShowBrandNameTitle.id,
      default: false,
      isLayout: true,
    },
    showSku: {
      type: 'boolean',
      title: messages.editorProductNameShowSkuTitle.id,
      default: false,
      isLayout: true,
    },
    showProductReference: {
      type: 'boolean',
      title: messages.editorProductNameShowproductReferenceTitle.id,
      default: false,
      isLayout: true,
    },
  },
}

export default ProductNameWrapper
