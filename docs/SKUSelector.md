📢 Don't fork this project. Use, [contribute](https://github.com/vtex-apps/awesome-io#contributing), or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).


# SKU Selector

`SKUSelector` is a block that shows every sku specification available for a product in its product page.

![image](https://user-images.githubusercontent.com/12139385/70264113-931db980-1776-11ea-9a7e-6d4c8f122ad8.png)

## Configuration

Add `sku-selector` block into your app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json).


| Prop name                      | Type    | Description                                                                                                                                                                                         | Default value |
| ------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| hideImpossibleCombinations     | `boolean` | If true, if a variation option leads to a combination that does not exist, that option won't appear. If false, it will appear but won't be pressable and will appear faded, will much less opacity. | `true`        |
| maxItems                       | `number`  | The maximum number of items to be displayed of a variation before showing the see more button. If the see more button should appear, it will be displayed `maxItems` - 2 options before the button  | `10`          |
| showValueNameForImageVariation | `boolean` | If true, show the name for the selected image variation to the right of the variation name. For example: `Color Red`, if the red color variation is selected.                                       | `false`       |
| thumbnailImage | `string`| If you pass this prop it will show the first image that has this text on the image's attribute `imageLabel`. If you pass this prop and there is no image with this text in the imageLabel it will show any image of the product. | `undefined` |
| visibleVariations | `string[]` | If you pass this array it will only display the passed names, if you pass a name that doesn't represent a variation it just doesn't show anything, which means that passing a empty array doesn't display any variation | Is `undefined`, but shows every variation |
| variationsSpacing | `number` | This prop represents how much `margin-bottom` you want to put in all variation blocks. The value is not in px, every value represent a tachyons class, so the value numbers are from 0-11  | `7` |
| imageHeight | `number | object` | Height of the thumbnail, if you pass an object it expects two attributes, `desktop` and `mobile`, and the value of both is the height on each type of device | `'auto'` |
| imageWidth | `number | object` | It works same way as `imageHeight` | `'auto'` |
| showVariationsLabels | `boolean` | If should show the variations name | `true` |
| initialSelection | See `InitialSelectionEnum` options | Control the initial selection chosen for the variations when page is loaded. | `complete` |
| showVariationsErrorMessage | `boolean`| If should show an error message when you click in the `BuyButton` but didn't select an option of each variation | `true` |
| displayMode | See `DisplayMode` options | How the variations will be displayed. Doesn't apply to variations of images | `default` |


Options for `DisplayMode`:

| Value | Name | Description |
| --- | --- | --- |
| `default` | default | Shows all variations like the images variations |
| `select` | select | Shows all variations except for image ones as `Select`components |


Options for `InitialSelectionEnum`:

| Value | Name | Description |
| ------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `complete` | Complete | It will select the variations values for the first SKU available in the product possible items |
| `image` | Image | It will select the variation for variations with images (like Color). All other variations will be unselected |
| `empty` | Empty | All variations will appear as unselected on first load |


#### Content API

These properties can be set via Storefront

| Prop name | Type | Description | Default value |
| --- | --- | --- | --- |
| seeMoreLabel | String | Label of see more button that appears when more than `maxItems` items are available for one variation. The string must have a {quantity} placeholder to show the appropriate remaining items available. Example: \"See {quantity} more\" | `See {quantity} more` |


## Customization

| CSS Handles                     | Description                                                                     | Component Source                                                                |
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
