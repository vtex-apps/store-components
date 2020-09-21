📢 Use this project, [contribute](https://github.com/vtex-apps/store-components) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion). 

# Product SKU Attributes

The `ProductSKUAttributes` is a block responsible for **displaying a list of the currrent SKU variations** for the product.

## Configuration

1. Add the `vtex.store-components` app to your theme's dependencies in the `manifest.json` file:

```json
  "dependencies: {
    "vtex.store-components": "3.x"
  }
```

2. Add the `product-sku-attributes` block to any block below `store.product` (Product template). For example:

```json
  "store.product": {
    "children": [
      "flex-layout.row#product",
    ]
  },
  "flex-layout.row#product": {
    "children": [
      "product-sku-attributes"
    ]
  },
```

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `ProductSKUAttributesContainer` |
| `attributeValue` |
| `attributeName` |
| `attributeLine` |
