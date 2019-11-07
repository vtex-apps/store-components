# Product Images

## Description

`ProductImages` is a VTEX component that render a set of Image or Video of a product.
This Component can be imported and used by any VTEX app.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents

- [Product Images](#product-images)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Blocks API](#blocks-api)
    - [Layout API](#layout-api)
    - [Styles API](#styles-api)
      - [CSS Namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](/README.md#usage).

Then, add `product-images` block into your app theme, as we do in our [default store-theme](https://github.com/vtex-apps/store-theme/blob/master/store/blocks/product.json).

### Blocks API

When implementing this component as a block, various inner blocks may be available. The following interface lists the available blocks within `ProductImages` and describes if they are required or optional.

```json
 "product-images":{
   "component": "ProductImages"
 }
```

For now this block does not have any required or optional blocks.

### Layout API

This component accepts props to be configured through storefront or blocks.json

Specification:

| Prop name                 | Type      | Description                                                                                                 | Default Value |
| ------------------------- | --------- | ----------------------------------------------------------------------------------------------------------- | ------------- |
| `thumbnailsOrientation`   | `Enum`    | Choose the orientation of the thumbnails. Set to `vertical` or `horizontal`                                 | `vertical`    |
| `position`                | `Enum`    | Set the position of the thumbnails(`left` or `right`). Only used when `thumbnailsOrientation` is `vertical` | `left`        |
| `displayThumbnailsArrows` | `boolean` | Displays navigation arrows on the thumbnails if there are enough thumbnails for them to scroll              | `false`       |
| `hiddenImages`       | `string`  | Hides images whose labels match the values listed in this prop. Intended to be used along with the `product-summary-sku-selector` block. You can have more information at the [SKUSelector docs](/docs/SKUSelector.md) |
| `aspectRatio`             | `string`                                   | Sets the aspect ratio of the image; that is, whether the image should be square, portrait, landscape, etc. The value should follow the [common aspect ratio notation](https://en.wikipedia.org/wiki/Aspect_ratio_(image)), i.e., two numbers separated by a colon (e.g, "1:1" for square, "3:4" for upright portrait, or even large values such as "1920:1080") | `"auto"`          |
| `zoomMode`                | `disabled\|in-place-click\|in-place-hover` | Sets the zoom behavior.                                                                                                                                                                                                                                                                                                                                         | `in-place-click` |
| `zoomFactor`              | `number`                                   | Sets how much the zoom increases the image size (e.g. `2` will make the zoomed-in image twice as large)                                                                                                                                                                                                                                                              | 2                |

### Styles API

You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces

Below, we describe the namespace that are defined in the `ProductImages`.

| Class name                | Description                                                                             | Component Source                                                                            |
| ------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `.content`                | The wrapper of `Carousel` scope                                                         | [index](/react/components/ProductImages/index.js)                                           |
| `.video`                  | The wrapper of `Video` scope                                                            | [Video](/react/components/ProductImages/components/Video/index.js)                          |
| `.image`                  | The wrapper container to `ProductImage` component                                      | [ProductImage](/react/components/ProductImages/components/ProductImage.tsx)          |
| `carouselCursorDefault`   | Specification that define the default customization for the cursor in `Swipe` Component | [Carousel](/react/components/ProductImages/components/Carousel/index.js)                    |
| `carouselInconCaretRight` | Customization to the right caret icon in `IconCaret` component                          | [Carousel](/react/components/ProductImages/components/Carousel/index.js)                    |
| `carouselIconCaretLeft`   | Customization to the left caret icon in `IconCaret` component                           | [Carousel](/react/components/ProductImages/components/Carousel/index.js)                    |
| `carouselGaleryThumbs`    | The container of Thumbs area                                                            | [Carousel](/react/components/ProductImages/components/Carousel/index.js)                    |
| `carouselThumbBorder`     | Define the border of Thumb area                                                         | [Carousel](/react/components/ProductImages/components/Carousel/index.js)                    |
| `carouselGaleryCursor`    | Define the svg icon that will show when hover the `Carousel`                            | [Carousel](/react/components/ProductImages/components/Carousel/index.js)                    |
| `carouselImagePlaceholder`   | Define the icon that will show when the user wants a custom placeholder                 | [ImagePlaceholder](/react/components/ProductImages/components/Carousel/ImagePlaceholder.js) |
