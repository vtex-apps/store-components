> 📢 **Disclaimer** Don't fork this project. Use it, [contribute](https://github.com/vtex-apps/store-components) to it or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion) to help us evolve it.

# Product Images

The `product-images` block renders a product image or video.

![image](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-store-components-productimages-0.png)

## Configuration

1. Import the `vtex.store-components` app to your theme dependencies in the `manifest.json` file, as in the following example:

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `product-images` block to any child of the `store.product` template (Product Details page template). For example:

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

3. Then, declare the `product-images` block using the props stated in the [Props](#props) table. For example:

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
| `aspectRatio`             | `string`                                 | Sets the aspect ratio of the image; whether the image should be square, portrait, landscape, etc. The value should follow the [common aspect ratio notation](https://en.wikipedia.org/wiki/Aspect_ratio_(image)) i.e. two numbers separated by a colon, such as `1:1` for square, `3:4` for upright portrait, or `1920:1080` for even large values).                                                                                                                                            | `"auto"`         |
| `blockClass`             | `string`                                 | Serves as the block's unique identifier for customization.                                                                                                                                             |
| `contentOrder`            | `'videos-first'` &#124; `'images-first'` | Controls the order in which the images and videos are displayed.                                                                                                                                                                                                                                                                                                                                                                                                                                | `'images-first'` |
| `contentType`             | `enum`                                   | Controls the type of content that will be displayed in the block. Possible values are: `images`, `videos`, or `all`.                                                                                                                                                                                                                                                                                                                                                                            | `all`            |
| `displayMode`             | `enum`                                   | Defines how the product media should be displayed. Possible values are `carousel` (displays the product images and videos in a carousel), `list` (displays only the product images inline, with no extra markup), and `first-image` (displays only the first image available). *Caution*: The `list` and `first-image` values do not display product videos and are only compatible with the `maxHeight`, `hiddenImages`, `zoomFactor`, `aspectRatio`,`ModalZoomElement`, and `zoomMode` props. | `carousel`       |
| `displayThumbnailsArrows` | `boolean`                                | Displays navigation arrows on the thumbnail media (if there are enough thumbnails for them to scroll).                                                                                                                                                                                                                                                                                                                                                                                          | `false`          |
| `hiddenImages`            | `string`                                 | Hides images whose labels match the values listed in this prop. Intended to be used with the `product-summary-sku-selector` block. To learn more, please read the [SKU Selector](https://developers.vtex.com/docs/apps/vtex.store-components/skuselector) documentation.                                                                                                                                                                                                                      | `skuvariation`   |
| `maxHeight`               | `number`                                 | Maximum height for individual product images (in pixels).                                                                                                                                                                                                                                                                                                                                                                                                                                       | `600`            |
| `ModalZoom`               | `block`                                  | Opens a modal for product image zooming. This prop value must match the name of the block responsible for triggering the modal containing the product image for zooming (e.g., `modal-layout` from [Modal layout](https://developers.vtex.com/apps/vtex.modal-layout) app). Please note that the `ModalZoom` prop will only work if the `zoomMode` prop is set as `open-modal`. To learn more, please see the [Advanced Configuration section](#Advanced-Configuration).                 | `undefined`      |
| `placeholder`             | `string`                                 | Sets the URL for a placeholder image to be used if there is no available image or video of the product.                                                                                                                                                                                                                                                                                                                                                                                         | `undefined`      |
| `position`                | `enum`                                   | Sets the position of the thumbnails (`left` or `right`). Only used when `thumbnailsOrientation` is `vertical`                                                                                                                                                                                                                                                                                                                                                                                   | `left`           |
| `showNavigationArrows`    | `boolean`                                | Defines if the navigation arrows should be displayed.                                                                                                                                                                                                                                                                                                                                                                                                                                           | `true`           |
| `showPaginationDots`      | `boolean`                                | Defines if the pagination dots should be displayed.
| `showImageLabel`          | `boolean`                                | Controls if the image label text should be rendered above each image                                                                                                                                                                                                                                                                                                                                                                                                                                             | `true`           |
| `thumbnailVisibility`     | `visible` or `hidden`                    | Defines if the thumbnails should be displayed in `carousel` displayMode.                                                                                                                                                                                                                                                                                                                                                                                                                        | `visible`        |
| `thumbnailAspectRatio`    | `string`                                 | Sets the aspect ratio of the thumbnail image. For more information about aspect ratio, check out the `aspectRatio` prop                                                                                                                                                                                                                                                                                                                                                                         | `"auto"`         |
| `thumbnailMaxHeight`      | `number`                                 | Maximum height of the thumbnail image (in pixels).                                                                                                                                                                                                                                                                                                                                                                                                                                              | `150`            |
| `thumbnailsOrientation`   | `enum`                                   | Defines the orientation of the thumbnails. It can be `vertical` or `horizontal`.                                                                                                                                                                                                                                                                                                                                                                                                                | `vertical`       |
| `zoomFactor`              | `number`                                 | Sets how much the zoom increases the image size (e.g. `2` will make the zoomed-in image twice as large)                                                                                                                                                                                                                                                                                                                                                                                         | 2                |
| `zoomMode`                | `enum`                                   | Defines the image zoom behavior. Possible values are: `disabled` (zoom is disabled), `in-place-click` (zoom is triggered when the image is clicked), `in-place-hover` (zoom is triggered when the image is hovered on), and `open-modal` (image is zoomed using a modal).                                                                                                                                                                                                                       | `in-place-click` |


### Thumbnail configuration options

You can now customize the dimensions of the thumbnails in the product gallery using the following props:

- `thumbnailWidth` (number): Defines the width (in pixels) of the thumbnail images.  
  **Example:** `thumbnailWidth={80}`

- `thumbnailHeight` (number): Defines the height (in pixels) of the thumbnail images.  
  **Example:** `thumbnailHeight={80}`

- `thumbnailAspectRatio` (string): Optional. Keeps the aspect ratio by setting values like `'1:1'`, `'4:3'`, `'16:9'`.  
  **Example:** `thumbnailAspectRatio="1:1"`

- `thumbCustomWidth` (`number`): Custom pixel width of each thumbnail. Overrides `thumbnailWidth`.
  **Example:** `thumbCustomWidth=80`

- `thumbCustomHeight` (`number`): Custom pixel height of each thumbnail. Overrides `thumbnailHeight`.
  **Example:** `thumbCustomHeight=80`

These props allow for greater flexibility and consistency in rendering product thumbnails across your storefront.

### Advanced configuration

In this section, you will learn how to use modal zoom, a property for when you want to open a popup containing a product image for zooming. To use this feature, configure your `product-images` block using the `zoomMode` and `ModalZoom` props with `open-modal` and `modal-layout` set as its values, respectively.

When configured as explained, the `zoomMode` prop allows the trigger of a modal for image zooming. In addition to that, the `MozalZoom` prop will render the block defined as its value. In this case, the `modal-layout` is required. This way, **you will be able to configure a modal containing the product image for zooming**.

Once both props are correctly configured, you must declare the `modal-layout` block and the `product-images.high-quality-image` block as its child.

The `modal-layout` block is responsible for building the modal component and triggering the image zooming in a popup box. The `product-images.high-quality-image` block, in turn, is a *special* block, only meant to render the `product-image` block inside the modal.

For example:

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

Please note that the `product-images.high-quality-image` block must be declared as a child of `modal-layout`. You can also declare other blocks exported by the [Modal Layout app](https://developers.vtex.com/docs/apps/vtex.modal-layout) as children.

The following table shows the props allowed by `product-images.high-quality-image`:

| Prop name     | Type       | Description                                                                                                                                                                                                                                                                                                                                                | Default value |
| ------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `aspectRatio` | `string`   | Defines the aspect ratio of the image; whether the image should be square, portrait, landscape, etc. The value should follow the \[common aspect ratio notation\](https://en.wikipedia.org/wiki/Aspect_ratio_(image) i.e., two numbers separated by a colon such as `1:1` for square, `3:4` for upright portrait, or `1920:1080` for even large values). | `auto`        |
| `defaultSize` | `number`   | Image default size (in `px`).                                                                                                                                                                                                                                                                                                                              | `1200`        |
| `imageSizes`  | `[number]` | Image size(s) (in `px`) to be used in the image [`srcset` HTML attribute](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images). If no value is defined for this prop, the `srcset` will use the original image size.                                                                                            | `undefined`   |
| `maxSize`     | `number`   | Image maximum size (in `px`) for rendering, regardless of the screen size. Please note that this prop only works if you also declare the `imageSizes` prop.                                                                                                                                                                                                | `4096`        |
| `zoomFactor`  | `number`   | Defines how much the zoom increases the image size (e.g. `2` will make the zoomed-in image twice as large).                                                                                                                                                                                                                                                | `2`           |
| `zoomMode`    | `enum`     | Defines the zoom behavior for the `product-images.high-quality-image` block. Possible values are: `disabled` (zoom is disabled), `in-place-click` (zoom is triggered when the image is clicked), and `in-place-hover` (zoom is triggered when the image is hovered on). Unlike the `store-images` prop, this one does not accept the `open-modal` value.   | `disabled`    |

## Customization

To apply CSS customizations to this and other blocks, please see the [Using CSS handles for store customization](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization) guide.

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
