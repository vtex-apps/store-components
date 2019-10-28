# Product Specifications

## Description

`ProductImages` is a VTEX component that render a set of Image or Video of a product.
This Component can be imported and used by any VTEX app.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents

- [Product Specifications](#product-specifications)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
    - [Styles API](#styles-api)
      - [CSS Namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](/README.md#usage).

Then, add `product-images` block into your app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json).

### Blocks API

When implementing this component as a block, various inner blocks may be available. The following interface lists the available blocks within `ProductSpecifications` and describes if they are required or optional.

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
| `zoomProps`               | `Zoom`    | Configure the zoom behaviour of the main image                                                              | NA            |
| `hiddenImages`       | `string`  | Hides images whose labels match the values listed in this prop. Intended to be used along with the `product-summary-sku-selector` block. You can have more information at the [SKUSelector docs](/docs/SKUSelector.md) |

`Zoom` type:
| Prop name | Type | Description | Default Value |
| ------------------------- | --------- | ----------------------------------------------------------------------------------------------------------- | ------------- |
| `zoomType` | `Enum` | Choose the the type of zoom. Values: `gallery`, `in-page` or `no-zoom` | `no-zoom` |
| `bgOpacity` | `Number` | Set background opacity when gallery zoom is displayed. Minimum value is 0.0, maximum is 1. | `0.8` |

### Styles API

You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces

Below, we describe the namespace that are defined in the `ProductImages`.

| Class name                | Description                                                                             | Component Source                                                                            |
| ------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `.content`                | The wrapper of `Carousel` scope                                                         | [index](/react/components/ProductImages/index.js)                                           |
| `.video`                  | The wrapper of `Video` scope                                                            | [Video](/react/components/ProductImages/components/Video/index.js)                          |
| `.image`                  | The wrapper container to `BlurredLoader` component                                      | [BlurredLoader](/react/components/ProductImages/components/BlurredLoader/index.js)          |
| `carouselCursorDefault`   | Specification that define the default customization for the cursor in `Swipe` Component | [Carousel](/react/components/ProductImages/components/Carousel/index.js)                    |
| `carouselInconCaretRight` | Customization to the right caret icon in `IconCaret` component                          | [Carousel](/react/components/ProductImages/components/Carousel/index.js)                    |
| `carouselIconCaretLeft`   | Customization to the left caret icon in `IconCaret` component                           | [Carousel](/react/components/ProductImages/components/Carousel/index.js)                    |
| `carouselGaleryThumbs`    | The container of Thumbs area                                                            | [Carousel](/react/components/ProductImages/components/Carousel/index.js)                    |
| `carouselThumbBorder`     | Define the border of Thumb area                                                         | [Carousel](/react/components/ProductImages/components/Carousel/index.js)                    |
| `carouselGaleryCursor`    | Define the svg icon that will show when hover the `Carousel`                            | [Carousel](/react/components/ProductImages/components/Carousel/index.js)                    |
| `carouselImageUploader`   | Define the icon that will show when the user wants a custom placeholder                 | [ImagePlaceholder](/react/components/ProductImages/components/Carousel/ImagePlaceholder.js) |
| `imageBlur30`             | Blur of the Image                                                                       | [BlurredLoader](/react/components/ProductImages/components/BlurredLoader/index.js)          |
| `imageTransitionOpacity`  | Time transition between images                                                          | [BlurredLoader](/react/components/ProductImages/components/BlurredLoader/index.js)          |
