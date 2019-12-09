📢 Don't fork this project. Use, [contribute](https://github.com/vtex-apps/awesome-io#contributing) or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).

# SKU Selector

The SKU Selector is a Product Details Page block and it is responsible for displaying every SKU available for a given product. 

![image](https://user-images.githubusercontent.com/12139385/70264113-931db980-1776-11ea-9a7e-6d4c8f122ad8.png)

## Configuration

1. Import the `vtex.store-component` app to your theme's dependencies in the `manifest.json`;

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `skuselector` block to any block below `store.product`(Product template). For example:


```json
  "store.product": {
    "children": [
      "flex-layout.row#product",
    ]
  },
  "flex-layout.row#product": {
    "children": [
      "sku-selector"
    ]
  },
  "sku-selector": {
    "props": {
      "hideImpossibleCombinations": false
    }
  },
```

| Prop name                      | Type    | Description                                                                                                                                                                                         | Default value |
| ------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `hideImpossibleCombinations`     | `boolean` | When set to `true` a variation option that leads to a impossible product combination  won't be displayed. If `false`, the variation will be displayed faded (with less opacity), but won't be pressable. | `true`        |
| `maxItems`                       | `number`  | The maximum number of variation items to be displayed before a `See more button` be triggered. The `See more button` will be displayed 2 items before the number set in `maxItems`.| `10`          |
| `showValueNameForImageVariation` | `boolean` | If `true`, the selected image variation name will be displayed. For example: `Color Red` (if the red color variation is selected).                                       | `false`       |
| `thumbnailImage` | `string`| The value set in the string will define which image will be displayed firts, according to the value in the image's `imageLabel`. If you pass this prop and no image with this text in the `imageLabel` can be found, it will show any image of the product. | `undefined` |
| `visibleVariations` | `string[]` | If you pass this array it will only display the passed names. If you pass a name that doesn't represent a variation, the block will not show anything. This means that passing an empty array doesn't display any variation | - |
| `variationsSpacing` | `number` | This prop represents how much of `margin-bottom` you want to put in all variation blocks. The value is not in `px`, every value represent a tachyons class. The value numbers are from 0-11  | `7` |
| `imageHeight` | `number | object` | Height of the thumbnail. If you pass an object it will expect two attributes: `desktop` and `mobile`. The value of both should be the height of each device | `'auto'` |
| `imageWidth` | `number | object` | It works same way as `imageHeight` | `'auto'` |
| `showVariationsLabels` | `boolean` | If the variation names should be displayed | `true` |
| `initialSelection` | `Enum` | Control the user initial selection for available variations when product page is loaded | `complete` |
| `showVariationsErrorMessage` | `boolean`| If an error message should be displayed when the `BuyButton` is clicked on but didn't select an option for each available variation | `true` |
| `displayMode` | `Enum` | How the variations will be displayed. It doesn't apply to image variations | `default` |


- Possible values for `displayMode`:

| Value | Name | Description |
| --- | --- | --- |
| `default` | default | Displays all variations like the image variations|
| `select` | select | Displays all variations, except for image variations as `Select`components |


- Possible values for `initialSelection`:

| Value | Name | Description |
| ------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `complete` | Complete | It will select the variations values of the first SKU available |
| `image` | Image | It will select the first image variation (like Color). All other variations will be unselected |
| `empty` | Empty | All variations will appear as unselected when the page is loaded |


## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles                    | 
| ------------------------------ |
| `skuSelectorContainer`         | 
| `skuSelectorSubcontainer`      | 
| `skuSelectorName`              |
| `skuSelectorNameContainer`     | 
| `skuSelectorTextContainer`     |
| `seeMoreButton`                | 
| `skuSelectorSelectorImageValue`|
| `skuSelectorNameSeparator`     |
| `skuSelectorOptionsList`       |
| `skuSelectorItemTextValue`     |
| `skuSelectorItemImageValue`    | 
