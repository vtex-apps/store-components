import * as React from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'

import ProductImages from './index'
import { changeImageUrlSize } from './utils/generateUrl'
import { 
  getThumbnailsPositionNames, 
  getThumbnailsPositionValues, 
  thumbnailsPosition ,
} from './utils/thumbnailPositionEnum'

const thresholds = [640]
const imageSizes = [1280, 1920]
const thumbnailSize = 160

const ProductImagesWrapper = ({ thumbnailPosition, ...props}) => {
  const valuesFromContext = React.useContext(ProductContext)

  const productImagesProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) 
      return {
        ...props,
        position: thumbnailPosition,
      }

    return {
      images: getImages(),
      position: thumbnailPosition,
    }
  }

  const getImages = () => {
    const { selectedItem } = valuesFromContext

    const images = path(['images'], selectedItem)

    if (!images) return []
    return images.map(image => ({
      imageUrls: imageSizes.map(size =>
        changeImageUrlSize(image.imageUrl, size)
      ),
      thresholds,
      thumbnailUrl: changeImageUrlSize(image.imageUrl, thumbnailSize),
      imageText: image.imageText,
    }))
  }

  return (
    <ProductImages { ...productImagesProps() } />
  )
}

ProductImagesWrapper.schema = {
  // @TODO review title and description
  title: 'editor.product-details.title',
  description: 'editor.product-details.description',
  type: 'object',
  properties: {
    thumbnailPosition: {
      title: 'editor.product-details.thumbnailsPosition.title',
      type: 'string',
      enum: getThumbnailsPositionValues(),
      enumNames: getThumbnailsPositionNames(),
      default: thumbnailsPosition.DISPLAY_LEFT.value,
      isLayout: false,    
    },
  },
}

export default ProductImagesWrapper