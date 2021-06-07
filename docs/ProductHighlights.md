📢 Use this project, [contribute](https://github.com/vtex-apps/store-components) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Highlights

![https://img.shields.io/badge/-Deprecated-red](https://img.shields.io/badge/-Deprecated-red)

> :warning: **The Product Highlights block has been deprecated in favor of the [Product Specifications app](https://vtex.io/docs/components/all/vtex.product-specifications/).**
> Although support for this block is still granted, we strongly recommend you to update your store theme with the Product Specification's blocks in order to keep up with the component's evolution.


`product-highlights` is a block that shows the general specifications of a product.

## Configuration

1. Add the `vtex.store-component` app to your theme's dependencies in the `manifest.json`;

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `product-highlights` block to any block below `store.product` template (product page) or `product-summary`. For example:


```json
  "store.product": {
    "children": [
      "product-highlights",
    ]
  },
```

### Props

| Prop name    | Type                | Description             | Default value |
| ------------ | ------------------- | ----------------------- | ------------- |
| `highlights` | `Array(Highlights)` | Highlights of a product | `[]`          |

Highlights:

| Prop name | Type             | Description       |
| --------- | ---------------- | ----------------- |
| `name`    | `String!`        | Highlights name   |
| `values`  | `Array(String)!` | Highlights values |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles                     |
| ------------------------------- |
| `highlightContent` |
| `itemHighlight` |
| `highlightTitle` |
| `highlightValue` |
