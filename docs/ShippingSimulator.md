📢 Don't fork this project. Use, [contribute](https://github.com/vtex-apps/awesome-io#contributing), or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Shipping Simulator

The Shipping Simulator block estimates the shipping fee based on a zip code input. 

![shipping](https://user-images.githubusercontent.com/52087100/70262606-6ddb7c00-1773-11ea-91af-ededfd27aa95.png)

## Configuration

1. Import the `vtex.store-component` app to your theme's dependencies in the `manifest.json`;

```json
  dependencies: {
    "vtex.store-components": "3.x"
  }
```

2. Add the `shipping-simulator` block to any block bellow store.product. For example:

```json
  "store.product": {
    "children": [
      "flex-layout.row#product",
    ]
  },
  "flex-layout.row#product": {
    "children": [
      "shipping-simulator"
    ]
  }
```

| Prop name          | Type      | Description                   | Default value |
| ------------------ | --------- | ----------------------------- | ------------- |
| `skuId`            | `String` | ID of the current product SKU | - |
| `seller`           | `String` | ID of the product seller      | - |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| ---------- | 
| `shippingContainer` |
| `shippingContainerLoader` | 
| `shippingZipcodeLabelLoader` |
| `shippingInputLoader` |
| `shippingZipcodeLabel` | 
| `shippingCTA` |
| `shippingNoMessage` |
| `shippingTable` |
| `shippingTableCell` |
| `shippingTableLabel` |
| `shippingTableRadioBtn` |
