import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty, pathOr } from 'ramda'

import SKUSelector from './index';

const SKUSelectorWrapper = (props) => {
  const valuesFromContext = useContext(ProductContext)

  const skuSelectorProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) return props

    const { product, selectedItem } = valuesFromContext

    return {
      skuItems: pathOr([], ['items'], product),
      skuSelected: selectedItem,
      productSlug: path(['linkText'], product),
      variations: path(['variations'], selectedItem),
    }
  }

  const { variations, ...restProps } = skuSelectorProps()

  if (!variations || !variations.length) return null
  
  return (
    <SKUSelector { ...restProps } />
  )
}

export default SKUSelectorWrapper