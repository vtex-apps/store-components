📢 Use this project, [contribute](https://github.com/vtex-apps/store-components) to it or comment on issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion). 

# Product Images

`ProductImages` is a VTEX block responsible for **rendering a product image or video**.

![image](https://user-images.githubusercontent.com/284515/70234551-a5c8cc00-173f-11ea-87d9-9f95c79761c8.png)

## Configuration

1. Import the `vtex.store-component` app to your theme's dependencies in the `manifest.json`;

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `product-images` block to any block below `store.product` (Product template). For example:

```json
  "store.product": {
    "children": [
      "flex-layout.row#product",
    ]
  },
  "flex-layout.row#product": {
    "children": [
      "product-images"
    ]
  },
  "product-images": {
    "props": {
      "displayThumbnailsArrows": true
    }
  },
```

| Prop name                 | Type      | Description                                                                                                 | Default Value |
| ------------------------- | --------- | ----------------------------------------------------------------------------------------------------------- | ------------- |
| `thumbnailsOrientation`   | `Enum`    | Choose the orientation of the thumbnails. Can be set to `vertical` or `horizontal`                                 | `vertical`    | 
| `position`                | `Enum`    | Set the position of the thumbnails (`left` or `right`). Only used when `thumbnailsOrientation` is `vertical` | `left`        |
| `displayThumbnailsArrows` | `boolean` | Displays navigation arrows on the thumbnails media (if there are enough thumbnails for them to scroll)              | `false`       |
| `hiddenImages`       | `string`  | Hides images whose labels match the values listed in this prop. Intended to be used along with the `product-summary-sku-selector` block. You can have more information at the [SKU Selector](https://vtex.io/docs/components/all/vtex.store-components/sku-selector) documentation | `skuvariation` |
| `aspectRatio`             | `string`                                   | Sets the aspect ratio of the image, that is, whether the image should be square, portrait, landscape, etc. The value should follow the [common aspect ratio notation](https://en.wikipedia.org/wiki/Aspect_ratio_(image)) i.e. two numbers separated by a colon such as `1:1` for square, `3:4` for upright portrait, or `1920:1080` for even large values) | `"auto"`          |
| `showNavigationArrows`             | `boolean`                                   | Controls if the navigation arrows should appear | `true`          |
| `showPaginationDots`             | `boolean`                                   | Controls if the pagination dots should appear | `true`          |
| `thumbnailAspectRatio`             | `string`                                   | Sets the aspect ratio of the thumbnail image; For more information about aspect ratio, check the `aspectRatio` prop | `"auto"`          |
| `thumbnailMaxHeight`             | `number`                                   | The max height for the thumbnail image | `true`          |
| `zoomMode` | `disabled\|in-place-click\|in-place-hover` | Sets the zoom behavior. | `in-place-click` |
| `zoomFactor` | `number` | Sets how much the zoom increases the image size (e.g. `2` will make the zoomed-in image twice as large) | 2 |

#### Customization

In order to apply CSS customizations on this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `productImagesContainer` (`content` is deprecated) |
| `carouselContainer` |
| `productImagesThumbsSwiperContainer` |
| `productImagesGallerySwiperContainer` |
| `productImagesGallerySlide` |
| `swiperCaret` |
| `productImagesThumbCaret` |
| `productImageTag`|
| `video`|
| `videoContainer` |
| `productVideo` |
| `figure` |
| `thumbImg` |
| `video` |
| `image` |
| `productImagesThumb` |
| `productImagesThumbActive` |
| `carouselCursorDefault` |
| `carouselInconCaretRight` |
| `carouselIconCaretLeft` |
| `carouselGaleryThumbs` |
| `carouselThumbBorder` |
| `carouselGaleryCursor` |
| `carouselImagePlaceholder` |
