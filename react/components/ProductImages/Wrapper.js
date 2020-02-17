import React, { useMemo } from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { useResponsiveValues } from 'vtex.responsive-values'
import { path, map, pick } from 'ramda'
import { defineMessages } from 'react-intl'

import ProductImages from './index'
import generateImageConfig from './utils/generateImageConfig'
import { THUMBS_ORIENTATION, THUMBS_POSITION_HORIZONTAL } from './utils/enums'

const messages = defineMessages({
  editorProductimagesTitle: {
    id: 'admin/editor.product-images.title',
    from: 'vtex.admin-messages',
  },
  editorProductimagesDescription: {
    id: 'admin/editor.product-images.description',
    from: 'vtex.admin-messages',
  },
  editorProductimagesZoomoptionsTitle: {
    id: 'admin/editor.product-images.zoomOptions.title',
    from: 'vtex.admin-messages',
  },
  editorProductimagesZoomtypeTitle: {
    id: 'admin/editor.product-images.zoomType.title',
    from: 'vtex.admin-messages',
  },
  editorProductimagesGallery: {
    id: 'admin/editor.product-images.gallery',
    from: 'vtex.admin-messages',
  },
  editorProductimagesInpage: {
    id: 'admin/editor.product-images.in-page',
    from: 'vtex.admin-messages',
  },
  editorProductimagesNozoom: {
    id: 'admin/editor.product-images.no-zoom',
    from: 'vtex.admin-messages',
  },
  editorProductimagesBgopacityTitle: {
    id: 'admin/editor.product-images.bgopacity.title',
    from: 'vtex.admin-messages',
  },
  editorProductimagesThumbnailsorientationTitle: {
    id: 'admin/editor.product-images.thumbnailsOrientation.title',
    from: 'vtex.admin-messages',
  },
  editorProductimagesVertical: {
    id: 'admin/editor.product-images.vertical',
    from: 'vtex.admin-messages',
  },
  editorProductimagesHorizontal: {
    id: 'admin/editor.product-images.horizontal',
    from: 'vtex.admin-messages',
  },
  editorProductimagesPositionTitle: {
    id: 'admin/editor.product-images.position.title',
    from: 'vtex.admin-messages',
  },
  editorProductimagesPositionDescription: {
    id: 'admin/editor.product-images.position.description',
    from: 'vtex.admin-messages',
  },
  editorProductimagesLeft: {
    id: 'admin/editor.product-images.left',
    from: 'vtex.admin-messages',
  },
  editorProductimagesRight: {
    id: 'admin/editor.product-images.right',
    from: 'vtex.admin-messages',
  },
  editorProductimagesDisplaythumbnailsarrowsTitle: {
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
  title: messages.editorProductimagesTitle.id,
  description: messages.editorProductimagesDescription.id,
  type: 'object',
  properties: {
    zoomProps: {
      title: messages.editorProductimagesZoomoptionsTitle.id,
      type: 'object',
      properties: {
        zoomType: {
          title: messages.editorProductimagesZoomtypeTitle.id,
          type: 'string',
          enum: ['gallery', 'in-page', 'no-zoom'],
          enumNames: [
            messages.editorProductimagesGallery.id,
            messages.editorProductimagesInpage.id,
            messages.editorProductimagesNozoom.id,
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
            title: messages.editorProductimagesBgopacityTitle.id,
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
      title: messages.editorProductimagesThumbnailsorientationTitle.id,
      type: 'string',
      enum: [THUMBS_ORIENTATION.VERTICAL, THUMBS_ORIENTATION.HORIZONTAL],
      enumNames: [
        messages.editorProductimagesVertical.id,
        messages.editorProductimagesHorizontal.id,
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
      title: messages.editorProductimagesPositionTitle.id,
      description: messages.editorProductimagesPositionDescription.id,
      type: 'string',
      enum: [THUMBS_POSITION_HORIZONTAL.LEFT, THUMBS_POSITION_HORIZONTAL.RIGHT],
      enumNames: [
        messages.editorProductimagesLeft.id,
        messages.editorProductimagesRight.id,
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
      title: messages.editorProductimagesDisplaythumbnailsarrowsTitle.id,
      type: 'boolean',
      default: false,
      isLayout: true,
    },
  },
})

export default ProductImagesWrapper
