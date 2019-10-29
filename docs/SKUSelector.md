# SKU Selector

## Description

`SKUSelector` is a VTEX Component that is resposible to handle events of sku selection for a product. This component can be imported and used by any VTEX App.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents

- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](/README.md#usage).

Then, add `sku-selector` block into your app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json).

### Blocks API

When implementing this component as a block, various inner blocks may be available. The following interface lists the available blocks within `SKUSelector` and describes if they are required or optional.

```json
  "sku-selector": {
    "component": "SKUSelector"
  }
```

For now this block does not have any required or optional blocks.

#### Configuration

Through the Storefront, you can change the `SKUSelector` behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name     | Type        | Description                                    | Default value                                                             |
| ------------- | ----------- | ---------------------------------------------- | ------------------------------------------------------------------------- |
| skuSelected   | SKU!        | SKU selected                                   | -                                                                         |
| skuItems      | Array(SKU)! | List of SKU Items                              | -                                                                         |
| onSKUSelected | Function!   | Callback that is called when a SKU is selected | Function that redirects to the page with the product and the selected SKU |

SKU

| Prop name | Type          | Description           | Default value |
| --------- | ------------- | --------------------- | ------------- |
| name      | String!       | Name of the sku       | -             |
| itemId    | String!       | The SKU id            | -             |
| images    | Array(Image)! | The images of the SKU | -             |

Image

| Prop name  | Type    | Description            | Default value |
| ---------- | ------- | ---------------------- | ------------- |
| imageUrl   | String! | The URL of the image   | -             |
| imageLabel | String  | The label of the image | -             |

#### Layout API

These are properties that you can customize in your `blocks.json` file.

| Prop name                      | Type    | Description                                                                                                                                                                                         | Default value |
| ------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| hideImpossibleCombinations     | `boolean` | If true, if a variation option leads to a combination that does not exist, that option won't appear. If false, it will appear but won't be pressable and will appear faded, will much less opacity. | `true`        |
| maxItems                       | `number`  | The maximum number of items to be displayed of a variation before showing the see more button. If the see more button should appear, it will be displayed `maxItems` - 2 options before the button  | `10`          |
| showValueNameForImageVariation | `boolean` | If true, show the name for the selected image variation to the right of the variation name. For example: `Color Red`, if the red color variation is selected.                                       | `false`       |
| thumbnailImage | If you pass this prop it will show the first image that has this text on the image's attribute `imageText` | `undefined` |
| visibleVariations | `string[]` | If you pass this array it will only display the passed names, if you pass a name that doesn't represent a variation it just doesn't show anything, which means that passing a empty array doesn't display any variation | Is `undefined`, but shows every variation |
| variationsSpacing | `number` | This prop represents how much `margin-bottom` you want to put in all variation blocks. The value is not in px, every value represent a tachyons class, so the value numbers are from 0-11  | `7` |
| imageHeight | `number | object` | Height of the thumbnail, if you pass an object it expects two attributes, `desktop` and `mobile`, and the value of both is the height on each type of device | `'auto'` |
| imageWidth | `number | object` | It works same way as `imageHeight` | `'auto'` |
| showVariationsLabels | `boolean` | If should show the variations name | `true` |

#### Content API

These properties can be set via Storefront

| Prop name    | Type   | Description                                                                                                                                                                                                                              | Default value         |
| ------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| seeMoreLabel | String | Label of see more button that appears when more than `maxItems` items are available for one variation. The string must have a {quantity} placeholder to show the appropriate remaining items available. Example: \"See {quantity} more\" | `See {quantity} more` |

### Styles API

You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces

| ClassName                     | Description                                                                     | Component Source                                                                |
| ----------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| skuSelectorContainer          | `SKUSelector` container                                                         | [SKUSelectorContainer](/react/components/SKUSelector/components/SKUSelector.js) |
| skuSelectorSubcontainer       | `SKUSelector` inner container                                                   | [Variation](/react/components/SKUSelector/components/Variation.js)              |
| skuSelectorName               | `SKUSelector` name                                                              | [Variation](/react/components/SKUSelector/components/Variation.js)              |
| skuSelectorNameContainer      | `SKUSelector` name container                                                    | [Variation](/react/components/SKUSelector/components/Variation.js)              |
| skuSelectorTextContainer      | `SKUSelector` Text container, containing name and selected item, if requested   | [Variation](/react/components/SKUSelector/components/Variation.js)              |
| seeMoreButton                 | `SKUSelector` see more button container                                         | [Variation](/react/components/SKUSelector/components/Variation.js)              |
| skuSelectorSelectorImageValue | Name of selected image variation beside the variation name                      | [Variation](/react/components/SKUSelector/components/Variation.js)              |
| skuSelectorNameSeparator      | Separator of between skuSelectorTextContainer and skuSelectorSelectorImageValue | [Variation](/react/components/SKUSelector/components/Variation.js)              |
| skuSelectorOptionsList        | [Variation](/react/components/SKUSelector/components/Variation.js)              |
| skuSelectorItemTextValue      | [SelectorItem](/react/components/SKUSelector/components/SelectorItem.js)        |
| skuSelectorItemImageValue     | [SelectorItem](/react/components/SKUSelector/components/SelectorItem.js)        |
