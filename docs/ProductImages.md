> 📢 **Disclaimer** Don't fork this project. Use it, [contribute](https://github.com/vtex-apps/store-components) to it, or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion) to help us evolve it.

# Product Images

The `product-images` block renders an image or video configured in the SKU settings. To learn which media formats are supported, see the [Media](https://help.vtex.com/en/tutorial/media-overview--31fhjHTt4TBoo50AmGQ9b2) section in the [Adding or editing SKUs](https://help.vtex.com/en/tutorial/adding-or-editing-skus--4ryZ6J45kwn3jDiQBxGiiN) guide.

![image](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-store-components-productimages-0.png)

## Configuration

1. Import the `vtex.store-components` app to your theme dependencies in the `manifest.json` file, as in the following example:

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `product-images` block to any child of the `store.product` template (Product Details Page template). For example:

```diff
  "store.product": {
    "children": [
      "flex-layout.row#product",
    ]
  },
  "flex-layout.row#product": {
    "children": [
+     "product-images"
    ]
  },
```

3. Declare the `product-images` block using the props stated in the [Props](#props) table. Example:

```json
  "product-images": {
    "props": {
      "displayThumbnailsArrows": true
    }
  },
```

### Props

| Prop name                 | Type                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default value    |
| ------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `aspectRatio`             | `string`                                 | Sets the image aspect ratio, determining whether it should be square, portrait, landscape, etc. Follow the [common aspect ratio notation](https://en.wikipedia.org/wiki/Aspect_ratio_(image)), represented by two numbers separated by a colon, such as `1:1` for square, `3:4` for portrait, or `1920:1080` for widescreen.                                                                                                                                            | `"auto"`         |
| `blockClass`             | `string`                                 | Serves as the block's unique identifier for customization.                                                                                                                                             |
| `contentOrder`            | `'videos-first'` &#124; `'images-first'` | Controls the order in which the images and videos are displayed.                                                                                                                                                                                                                                                                                                                                                                                                                                | `'images-first'` |
| `contentType`             | `enum`                                   | Controls the type of content that will be displayed in the block. Possible values are `images`, `videos`, or `all`.                                                                                                                                                                                                                                                                                                                                                                            | `all`            |
| `displayMode`             | `enum`                                   | Defines how the product media should be displayed. Possible values are `carousel` (displays the product images and videos in a carousel), `list` (displays only the product images inline, with no extra markup), and `first-image` (displays only the first image available). **The `list` and `first-image` values don't display product videos and are only compatible with the `maxHeight`, `hiddenImages`, `zoomFactor`, `aspectRatio`,`ModalZoomElement`, and `zoomMode` props**. | `carousel`       |
| `displayThumbnailsArrows` | `boolean`                                | Displays navigation arrows on the thumbnail media (if there are enough thumbnails for them to scroll).                                                                                                                                                                                                                                                                                                                                                                                          | `false`          |
| `hiddenImages`            | `string`                                 | Hides images with labels that match the values listed in this prop. Intended to be used with the `product-summary-sku-selector` block. To learn more, see the [SKU Selector](https://developers.vtex.com/docs/apps/vtex.store-components/skuselector) documentation.                                                                                                                                                                                                                      | `skuvariation`   |
| `maxHeight`               | `number`                                 | Maximum height for individual product images (in pixels).                                                                                                                                                                                                                                                                                                                                                                                                                                       | `600`            |
| `ModalZoom`               | `block`                                  | Opens a modal to zoom in on the product image. This prop value must match the name of the block that triggers the modal containing the product image for zooming (for example, `modal-layout` from [Modal layout](https://developers.vtex.com/apps/vtex.modal-layout) app). The `ModalZoom` prop will only work if the `zoomMode` prop is set as `open-modal`. To learn more, see the [Advanced configuration section](#Advanced-configuration).                 | `undefined`      |
| `placeholder`             | `string`                                 | Sets the URL for a placeholder image to be displayed when no product image or video is available.                                                                                                                                                                                                                                                                                                                                                                                         | `undefined`      |
| `position`                | `enum`                                   | Sets the position of the thumbnails (`left` or `right`). Only used when `thumbnailsOrientation` is `vertical`.                                                                                                                                                                                                                                                                                                                                                                                   | `left`           |
| `showNavigationArrows`    | `boolean`                                | Defines if the navigation arrows should be displayed.                                                                                                                                                                                                                                                                                                                                                                                                                                           | `true`           |
| `showPaginationDots`      | `boolean`                                | Defines if the pagination dots should be displayed.
| `showImageLabel`          | `boolean`                                | Controls if the image label text should be rendered above each image.                                                                                                                                                                                                                                                                                                                                                                                                                                             | `true`           |
| `thumbnailVisibility`     | `visible` or `hidden`                    | Defines if the thumbnails should be displayed in `carousel` displayMode.                                                                                                                                                                                                                                                                                                                                                                                                                        | `visible`        |
| `thumbnailAspectRatio`    | `string`                                 | Sets the aspect ratio of the thumbnail image. For more information about aspect ratio, check out the `aspectRatio` prop.                                                                                                                                                                                                                                                                                                                                                                         | `"auto"`         |
| `thumbnailMaxHeight`      | `number`                                 | Maximum height of the thumbnail image (in pixels).                                                                                                                                                                                                                                                                                                                                                                                                                                              | `150`            |
| `thumbnailsOrientation`   | `enum`                                   | Sets the orientation of the thumbnails. It can be `vertical` or `horizontal`.                                                                                                                                                                                                                                                                                                                                                                                                                | `vertical`       |
| `zoomFactor`              | `number`                                 | Sets how much the zoom increases the image size (for example, `2` will make the zoomed-in image twice as large).                                                                                                                                                                                                                                                                                                                                                                                         | 2                |
| `zoomMode`                | `enum`                                   | Sets the image zoom behavior. Possible values are `disabled` (zoom is disabled), `in-place-click` (zoom is triggered when the image is clicked), `in-place-hover` (zoom is triggered when the image is hovered on), and `open-modal` (image is zoomed using a modal).                                                                                                                                                                                                                       | `in-place-click` |

### Advanced configuration

In this section, you’ll learn how to use modal zoom, a property that allows you to open a popup displaying a product image for zooming. To use this feature, configure the `product-images` block by setting the `zoomMode` and `ModalZoom` props to `open-modal` and `modal-layout`, respectively.

When configured as explained, the `zoomMode` prop allows the image to trigger a modal for zooming. Additionally, the `MozalZoom` prop will render the block defined as its value. In this case, the `modal-layout` is required. This allows you to configure a modal containing the product image for zooming.

Once both props are correctly configured, you must declare the `modal-layout` block and the `product-images.high-quality-image` block as its child.

The `modal-layout` block renders the modal component and triggers the image zoom in a popup box. The `product-images.high-quality-image` block, in turn, is a *special* block used exclusively to render the `product-image` block inside the modal.

Example:

```jsonc
{
  "product-images.high-quality-image": {
    "props": {
      "zoomMode": "in-place-click",
      "zoomFactor": 2
    }
  },
  "modal-layout#product-zoom": {
    "children": [
      // you can put any other block inside the modal,
      // this is just a normal modal
      "flex-layout.row#product-name",
      "product-images.high-quality-image"
    ]
  },
  "product-images": {
    "props": {
      "ModalZoom": "modal-layout#product-zoom",
      // to use the ModalZoom, the product-images zoomMode value must be set as open-modal
      "zoomMode": "open-modal",
      "aspectRatio": {
        "desktop": "auto",
        "phone": "16:9"
      }
    }
  }
}
```

The `product-images.high-quality-image` block must be declared as a child of `modal-layout`. You can also declare other blocks exported by the [Modal Layout app](https://developers.vtex.com/docs/apps/vtex.modal-layout) as children.

The following table shows the props allowed by `product-images.high-quality-image`:

| Prop name     | Type       | Description                                                                                                                                                                                                                                                                                                                                                | Default value |
| ------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `aspectRatio` | `string`   | Sets the image aspect ratio, determining whether it should be square, portrait, landscape, etc. Follow the [common aspect ratio notation](https://en.wikipedia.org/wiki/Aspect_ratio_(image)), represented by two numbers separated by a colon, such as `1:1` for square, `3:4` for portrait, or `1920:1080` for widescreen. | `auto`        |
| `defaultSize` | `number`   | Image default size (in `px`).                                                                                                                                                                                                                                                                                                                              | `1200`        |
| `imageSizes`  | `[number]` | Image sizes (in `px`) to be used in the image [`srcset` HTML attribute](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images). If no value is defined for this prop, the `srcset` will use the original image size.                                                                                            | `undefined`   |
| `maxSize`     | `number`   | Image maximum size (in `px`) for rendering, regardless of screen size. This prop only works if you also declare the `imageSizes` prop.                                                                                                                                                                                                | `4096`        |
| `zoomFactor`  | `number`   | Sets how much the zoom increases the image size (for example, `2` will make the zoomed-in image twice as large).                                                                                                                                                                                                                                                | `2`           |
| `zoomMode`    | `enum`     | Sets the zoom behavior for the `product-images.high-quality-image` block. Possible values are `disabled` (no zoom), `in-place-click` (zoom on click), and `in-place-hover` (zoom on hover). Unlike the `store-images` prop, this one doesn’t accept the `open-modal` value.   | `disabled`    |

## Customization

To apply CSS customizations to this and other blocks, see the guide [Using CSS handles for store customization](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization).

| CSS Handles                                        |
| -------------------------------------------------- |
| `carouselContainer`                                |
| `carouselCursorDefault`                            |
| `carouselGaleryCursor`                             |
| `carouselGaleryThumbs`                             |
| `carouselIconCaretLeft`                            |
| `carouselIconCaretRight`                           |
| `carouselImagePlaceholder`                         |
| `carouselInconCaretRight`                          |
| `carouselThumbBorder`                              |
| `figure`                                           |
| `figure--video`                                    |
| `highQualityContainer`                             |
| `image`                                            |
| `imgZoom`                                          |
| `productImagesContainer` (`content` is deprecated) |
| `productImagesContainer--carousel`                 |
| `productImagesContainer--list`                     |
| `productImagesGallerySlide`                        |
| `productImagesGallerySwiperContainer`              |
| `productImagesThumb`                               |
| `productImagesThumbActive`                         |
| `productImagesThumbCaret`                          |
| `productImagesThumbsSwiperContainer`               |
| `productImageTag--main`                            |
| `productImageTag--zoon`                            |
| `productImageTag`                                  |
| `productImageLabel`                                |
| `productVideo`                                     |
| `swiper-pagination`                                |
| `swiperBullet--active`                             |
| `swiperBullet`                                     |
| `swiperCaret`                                      |
| `swiperCaretNext`                                  |
| `swiperCaretPrev`                                  |
| `thumbImg`                                         |
| `thumbImg--video`                                  |
| `video`                                            |
| `video`                                            |
| `videoContainer`                                   |
