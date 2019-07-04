import React, { useContext, useMemo } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, values, map } from 'ramda'

import ProductImages from './index'
import generateImageConfig from './utils/generateImageConfig'

const thumbnailsPosition = {
  DISPLAY_LEFT: {
    name: 'admin/editor.product-images.thumbnailsPosition.left',
    value: 'left',
  },
  DISPLAY_RIGHT: {
    name: 'admin/editor.product-images.thumbnailsPosition.right',
    value: 'right',
  },
  DISPLAY_BOTTOM: {
    name: 'admin/editor.product-images.thumbnailsPosition.bottom',
    value: 'bottom',
  },
  DISPLAY_TOP: {
    name: 'admin/editor.product-images.thumbnailsPosition.top',
    value: 'top',
  },
}

const ProductImagesWrapper = props => {
  const valuesFromContext = useContext(ProductContext)

  const images = useMemo(
    () =>
      props.images != null
        ? props.images
        : map(
            generateImageConfig,
            path(['images'], valuesFromContext.selectedItem || {}) || []
          ),
    [props.images, valuesFromContext.selectedItem]
  )

  return (
    <ProductImages
      zoomProps={props.zoomProps}
      position={props.position || props.thumbnailPosition}
      direction={props.direction}
      slidesPerView={props.slidesPerView}
      images={images}
    />
  )
}

ProductImagesWrapper.schema = {
  title: 'admin/editor.product-images.title',
  description: 'admin/editor.product-images.description',
  type: 'object',
  properties: {
    thumbnailPosition: {
      title: 'admin/editor.product-images.thumbnailsPosition.title',
      type: 'string',
      enum: map(opt => opt.value, values(thumbnailsPosition) || []),
      enumNames: map(opt => opt.name, values(thumbnailsPosition) || []),
      default: thumbnailsPosition.DISPLAY_LEFT.value,
    },
    direction: {
      title: 'admin/editor.product-images.direction.title',
      type: 'string',
      enum: ['vertical', 'horizontal'],
      enumNames: [
        'admin/editor.product-images.direction.vertical',
        'admin/editor.product-images.direction.horizontal',
      ],
      widget: {
        'ui:options': {
          inline: false,
        },
        'ui:widget': 'radio',
      },
      default: 'vertical',
    },
    slidesPerView: {
      title: 'admin/editor.product-images.slidesPerView.title',
      type: 'string',
      default: 'auto',
    },
  },
}

export default ProductImagesWrapper
