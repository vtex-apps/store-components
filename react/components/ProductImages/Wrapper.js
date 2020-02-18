import React, { useMemo } from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { useResponsiveValues } from 'vtex.responsive-values'
import { path, map, pick } from 'ramda'
import { defineMessages } from 'react-intl'

import ProductImages from './index'
import generateImageConfig from './utils/generateImageConfig'
import { THUMBS_ORIENTATION, THUMBS_POSITION_HORIZONTAL } from './utils/enums'

const messages = defineMessages({
  editorProductImagesTitle: {
    id: 'admin/editor.product-images.title',
    from: 'vtex.admin-messages',
  },
  editorProductImagesDescription: {
    id: 'admin/editor.product-images.description',
    from: 'vtex.admin-messages',
  },
  editorProductImagesZoomOptionsTitle: {
    id: 'admin/editor.product-images.zoomOptions.title',
    from: 'vtex.admin-messages',
  },
  editorProductImagesZoomTypeTitle: {
    id: 'admin/editor.product-images.zoomType.title',
    from: 'vtex.admin-messages',
  },
  editorProductImagesGallery: {
    id: 'admin/editor.product-images.gallery',
    from: 'vtex.admin-messages',
  },
  editorProductImagesInpage: {
    id: 'admin/editor.product-images.in-page',
    from: 'vtex.admin-messages',
  },
  editorProductImagesNoZoom: {
    id: 'admin/editor.product-images.no-zoom',
    from: 'vtex.admin-messages',
  },
  editorProductImagesBgopacityTitle: {
    id: 'admin/editor.product-images.bgopacity.title',
    from: 'vtex.admin-messages',
  },
  editorProductImagesThumbnailsOrientationTitle: {
    id: 'admin/editor.product-images.thumbnailsOrientation.title',
    from: 'vtex.admin-messages',
  },
  editorProductImagesVertical: {
    id: 'admin/editor.product-images.vertical',
    from: 'vtex.admin-messages',
  },
  editorProductImagesHorizontal: {
    id: 'admin/editor.product-images.horizontal',
    from: 'vtex.admin-messages',
  },
  editorProductImagesPositionTitle: {
    id: 'admin/editor.product-images.position.title',
    from: 'vtex.admin-messages',
  },
  editorProductImagesPositionDescription: {
    id: 'admin/editor.product-images.position.description',
    from: 'vtex.admin-messages',
  },
  editorProductImagesLeft: {
    id: 'admin/editor.product-images.left',
    from: 'vtex.admin-messages',
  },
  editorProductImagesRight: {
    id: 'admin/editor.product-images.right',
    from: 'vtex.admin-messages',
  },
  editorProductImagesDisplayThumbnailsArrowsTitle: {
    id: 'admin/editor.product-images.displayThumbnailsArrows.title',
    from: 'vtex.admin-messages',
  },
})

const ProductImagesWrapper = props => {
  const valuesFromContext = useProduct() || {}
  const {
    aspectRatio,
    maxHeight,
    showNavigationArrows,
    showPaginationDots,
    contentOrder,
  } = useResponsiveValues(
    pick(
      [
        'aspectRatio',
        'maxHeight',
        'showNavigationArrows',
        'showPaginationDots',
        'contentOrder',
      ],
      props
    )
  )
  const { selectedItem } = valuesFromContext
  const images = useMemo(
    () =>
      props.images != null
        ? props.images
        : map(generateImageConfig, path(['images'], selectedItem) || []),
    [props.images, selectedItem]
  )

  const videos = useMemo(
    () =>
      props.videos != null
        ? props.videos
        : path(['videos'], selectedItem) || [],
    [props.videos, selectedItem]
  )

  return (
    <ProductImages
      images={images}
      videos={videos}
      hiddenImages={props.hiddenImages}
      // thumbnailPosition is a legacy prop from product-details
      position={props.position || props.thumbnailPosition}
      displayThumbnailsArrows={props.displayThumbnailsArrows}
      thumbnailsOrientation={props.thumbnailsOrientation}
      zoomMode={props.zoomMode}
      zoomFactor={props.zoomFactor}
      aspectRatio={aspectRatio}
      maxHeight={maxHeight}
      thumbnailAspectRatio={props.thumbnailAspectRatio}
      thumbnailMaxHeight={props.thumbnailMaxHeight}
      showNavigationArrows={showNavigationArrows}
      showPaginationDots={showPaginationDots}
      contentOrder={contentOrder}
      // Deprecated
      zoomProps={props.zoomProps}
    />
  )
}

ProductImagesWrapper.getSchema = ({ zoomProps: { zoomType } = {} }) => ({
  title: messages.editorProductImagesTitle.id,
  description: messages.editorProductImagesDescription.id,
  type: 'object',
  properties: {
    zoomProps: {
      title: messages.editorProductImagesZoomOptionsTitle.id,
      type: 'object',
      properties: {
        zoomType: {
          title: messages.editorProductImagesZoomTypeTitle.id,
          type: 'string',
          enum: ['gallery', 'in-page', 'no-zoom'],
          enumNames: [
            messages.editorProductImagesGallery.id,
            messages.editorProductImagesInpage.id,
            messages.editorProductImagesNoZoom.id,
          ],
          widget: {
            'ui:options': {
              inline: false,
            },
            'ui:widget': 'radio',
          },
          default: 'no-zoom',
        },
        ...(zoomType === 'gallery' && {
          bgOpacity: {
            title: messages.editorProductImagesBgopacityTitle.id,
            type: 'number',
            minimum: 0,
            maximum: 1,
            multipleOf: 0.01,
            default: 0.8,
          },
        }),
      },
    },
    thumbnailsOrientation: {
      title: messages.editorProductImagesThumbnailsOrientationTitle.id,
      type: 'string',
      enum: [THUMBS_ORIENTATION.VERTICAL, THUMBS_ORIENTATION.HORIZONTAL],
      enumNames: [
        messages.editorProductImagesVertical.id,
        messages.editorProductImagesHorizontal.id,
      ],
      widget: {
        'ui:options': {
          inline: false,
        },
        'ui:widget': 'radio',
      },
      default: THUMBS_ORIENTATION.VERTICAL,
      isLayout: true,
    },
    position: {
      title: messages.editorProductImagesPositionTitle.id,
      description: messages.editorProductImagesPositionDescription.id,
      type: 'string',
      enum: [THUMBS_POSITION_HORIZONTAL.LEFT, THUMBS_POSITION_HORIZONTAL.RIGHT],
      enumNames: [
        messages.editorProductImagesLeft.id,
        messages.editorProductImagesRight.id,
      ],
      widget: {
        'ui:options': {
          inline: false,
        },
        'ui:widget': 'radio',
      },
      default: THUMBS_POSITION_HORIZONTAL.LEFT,
      isLayout: true,
    },
    displayThumbnailsArrows: {
      title: messages.editorProductImagesDisplayThumbnailsArrowsTitle.id,
      type: 'boolean',
      default: false,
      isLayout: true,
    },
  },
})

export default ProductImagesWrapper
