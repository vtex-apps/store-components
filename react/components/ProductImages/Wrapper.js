import React, { useContext, useMemo } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty, values, map } from 'ramda'

import ProductImages from './index'
import generateImageConfig from './utils/generateImageConfig'

const thumbnailsPosition = {
  DISPLAY_LEFT: {
    name: 'admin/editor.product-details.thumbnailsPosition.left',
    value: 'left',
  },
  DISPLAY_RIGHT: {
    name: 'admin/editor.product-details.thumbnailsPosition.right',
    value: 'right',
  },
}

const ProductImagesWrapper = ({ thumbnailPosition, ...props}) => {
  const valuesFromContext = useContext(ProductContext)

  const productImagesProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) {
      return {
        position: thumbnailPosition,
        ...props,
      }
    }

    const { selectedItem } = valuesFromContext
    const images = path(['images'], selectedItem || {})

    return {
      images: map(generateImageConfig, images || []),
      position: thumbnailPosition,
    }
  }

  return (
    <ProductImages { ...productImagesProps() } />
  )
}

ProductImagesWrapper.schema = {
  // @TODO review title and description
  title: 'admin/editor.product-details.title',
  description: 'admin/editor.product-details.description',
  type: 'object',
  properties: {
    thumbnailPosition: {
      title: 'admin/editor.product-details.thumbnailsPosition.title',
      type: 'string',
      enum: map(opt => opt.value, values(thumbnailsPosition) || []),
      enumNames: map(opt => opt.name, values(thumbnailsPosition) || []),
      default: thumbnailsPosition.DISPLAY_LEFT.value,
      isLayout: false,    
    },
  },
}

export default ProductImagesWrapper