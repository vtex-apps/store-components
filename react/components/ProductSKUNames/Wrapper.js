import React from 'react'
import { isEmpty } from 'ramda'
import useProduct from 'vtex.product-context/useProduct'

import ProductSKUNames from './index'

const styles = {
  'vtex-product-sku-names--loader': {
    x: 0,
    y: '2.569em',
    width: '10.311em',
    height: '1.045em',
  },
}

const getVariationsFromSelectedItem = productContext => {
  const { selectedImageVariationSKU } = productContext.skuSelector

  if (selectedImageVariationSKU) {
    const selected = productContext.product.items.filter(item => {
      return item.itemId === selectedImageVariationSKU
    })

    if (selected.length) {
      const [item] = selected

      return item.variations
    }
  }

  return productContext.selectedItem.variations
}

const ProductSKUNamesWrapper = props => {
  const valuesFromContext = useProduct()

  const productSKUNamesProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) {
      return props
    }

    return {
      ...props,
      skuVariations:
        props.skuVariations || getVariationsFromSelectedItem(valuesFromContext),
      styles: props.styles || styles,
      className: props.className,
    }
  }

  return <ProductSKUNames {...productSKUNamesProps()} />
}

export default ProductSKUNamesWrapper
