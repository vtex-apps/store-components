>📢 **Disclaimer** Don't fork this project. Use it, [contribute](https://github.com/vtex-apps/store-components) to it or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion) to help us evolve it.

# Product Highlights

![https://img.shields.io/badge/-Deprecated-red](https://img.shields.io/badge/-Deprecated-red)

> ⚠️ Warning
>
> **The Product Highlights block has been deprecated in favor of the [Product Specifications app](https://developers.vtex.com/vtex-developer-docs/docs/vtex-product-specifications/).** Although support for this block is still granted, we strongly recommend you to update your store theme with the Product Specification's blocks in order to keep up with the component's evolution.


The `product-highlights` block shows the general specifications of a product.

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json` file as in the following example:

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `product-highlights` block to any child of the `store.product` or `product-summary` templates. For example:

```diff
  "store.product": {
    "children": [
+     "product-highlights",
    ]
  },
```

3. Then, declare the `product-highlights` block using the props stated in the [Props](#props) table.

### Props

| Prop name    | Type                | Description             | Default value |
| ------------ | ------------------- | ----------------------- | ------------- |
| `highlights` | `Array(Highlights)` | Highlights of a product. | `[]`          |

#### `highlights` props

| Prop name | Type             | Description       |
| --------- | ---------------- | ----------------- |
| `name`    | `String!`        | Highlights name.   |
| `values`  | `Array(String)!` | Highlights values. |

## Customization

To apply CSS customizations in this and other blocks, follow the [Using CSS handles for store customization](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-using-css-handles-for-store-customization) guide.

| CSS Handles                     |
| ------------------------------- |
| `highlightContent` |
| `itemHighlight` |
| `highlightTitle` |
| `highlightValue` |
