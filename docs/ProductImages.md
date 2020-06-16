📢 Use this project, [contribute](https://github.com/vtex-apps/store-components) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion). 

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
| `aspectRatio`             | `string`                                   | Sets the aspect ratio of the image, that is, whether the image should be square, portrait, landscape, etc. The value should follow the [common aspect ratio notation](https://en.wikipedia.org/wiki/Aspect_ratio_(image)) i.e. two numbers separated by a colon such as `1:1` for square, `3:4` for upright portrait, or `1920:1080` for even large values) | `"auto"`          |
| `contentOrder`   | `'videos-first'` &#124; `'images-first'`    | Controls the order in which the images and videos are displayed.                                 | `'images-first'`    | 
| `displayThumbnailsArrows` | `boolean` | Displays navigation arrows on the thumbnails media (if there are enough thumbnails for them to scroll)              | `false`       |
| `hiddenImages`       | `string`  | Hides images whose labels match the values listed in this prop. Intended to be used along with the `product-summary-sku-selector` block. You can have more information at the [SKU Selector](https://vtex.io/docs/components/all/vtex.store-components/sku-selector) documentation | `skuvariation` |
| `position`                | `Enum`    | Set the position of the thumbnails (`left` or `right`). Only used when `thumbnailsOrientation` is `vertical` | `left`        |
| `showNavigationArrows`             | `boolean`                                   | Controls if the navigation arrows should appear | `true`          |
| `showPaginationDots`             | `boolean`                                   | Controls if the pagination dots should appear | `true`          |
| `thumbnailAspectRatio`             | `string`                                   | Sets the aspect ratio of the thumbnail image; For more information about aspect ratio, check the `aspectRatio` prop | `"auto"`          |
| `thumbnailMaxHeight`             | `number`                                   | The max height for the thumbnail image | `true`          |
| `thumbnailsOrientation`   | `Enum`    | Choose the orientation of the thumbnails. Can be set to `vertical` or `horizontal`                                 | `vertical`    | 
| `zoomFactor` | `number` | Sets how much the zoom increases the image size (e.g. `2` will make the zoomed-in image twice as large) | 2 |
| `zoomMode` | `disabled\|in-place-click\|in-place-hover\|open-modal` | Sets the zoom behavior. | `in-place-click` |
| `ModalZoom` | `vtex.modal-layout:modal-layout` | The `modal-layout` block that will open when you click in the image and `zoomMode` is `open-modal` | `undefined` |
| `contentType`   | `'all'` &#124; `'images'` &#124; `'videos'`   | Controls the type of content that will be displayed.                               | `'all'`    | 

### `product-images.high-quality-image` block

This block is meant to be used when you want that the zoom action open a modal with the current image of the `product-images` in it. In order to use you just have to put it inside the block that you will pass in the prop `ModalZoom` of the `product-images`:


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
      "zoomMode": "open-modal",
      "aspectRatio": {
        "desktop": "auto",
        "phone": "16:9"
      }
    }
  }
}
```

The props of this block are very similar with some props of `product-images`:

| Prop name | Type | Description | Default Value |
| --- | --- | --- | --- |
| `zoomMode` | `'disabled'\|'in-place-click'\|'in-place-hover'` | Same as `zoomMode` of `product-images` but it doesn't accept `'open-modal'` | `'disabled'` |
| `zoomFactor` | `number` | Same as `zoomFactor` from `product-images` | `2` |
| `aspectRatio` | `string` | Same as in `product-images` | `'auto'` |


#### Customization

In order to apply CSS customizations on this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `carouselContainer` |
| `carouselCursorDefault` |
| `carouselGaleryCursor` |
| `carouselGaleryThumbs` |
| `carouselIconCaretLeft` |
| `carouselImagePlaceholder` |
| `carouselInconCaretRight` |
| `carouselThumbBorder` |
| `figure` |
| `image` |
| `productImagesContainer` (`content` is deprecated) |
| `productImagesGallerySlide` |
| `productImagesGallerySwiperContainer` |
| `productImagesThumb` |
| `productImagesThumbActive` |
| `productImagesThumbCaret` |
| `productImagesThumbsSwiperContainer` |
| `productImageTag`|
| `productVideo` |
| `swiperBullet` |
| `swiperCaret` |
| `thumbImg` |
| `video` |
| `video`|
| `videoContainer` |
| `imgZoom` |
| `highQualityContainer` |
