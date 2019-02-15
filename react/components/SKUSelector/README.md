# SKUSelector

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

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| productSlug | String | Product's slug | Required | 
| skuSelected | SKU | SKU selected | Required |
| skuItems | Array(SKU) | List of SKU Items | Required |
| onSKUSelected | Function | Callback that is called when a SKU is selected | Function that redirects to the page with the product and the selected SKU |

SKU

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| name | String| Name of the sku | Required |
| itemId | String | The SKU id | Required |
| images | Array(Image)| The images of the SKU | Required |

Image

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| imageUrl | String | The URL of the image | Required |
| imageLabel | String | The label of the image | `undefined` |

### Styles API

You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces

| ClassName | Description | Component Source
| --------- | ----------- | ----------------
| skuSelectorContainer | `SKUSelector` container| [SKUSelectorContainer](https://github.com/vtex-apps/store-components/blob/master/react/components/SKUSelector/components/SKUSelector.js)|
| skuSelectorSubcontainer | `SKUSelector` inner container | [Variation](https://github.com/vtex-apps/store-components/blob/master/react/components/SKUSelector/components/Variation.js) |
| skuSelectorName | `SKUSelector` name | [Variation](https://github.com/vtex-apps/store-components/blob/master/react/components/SKUSelector/components/Variation.js)|
| skuSelectorNameContainer | `SKUSelector` name container| [Variation](https://github.com/vtex-apps/store-components/blob/master/react/components/SKUSelector/components/Variation.js)|