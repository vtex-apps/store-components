📢 Use this project, [contribute](https://github.com/vtex-apps/store-components) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Shipping Simulator

The Shipping Simulator block **estimates the shipping fee** based on a zip code input.

![shipping](https://user-images.githubusercontent.com/52087100/70262606-6ddb7c00-1773-11ea-91af-ededfd27aa95.png)

## Configuration

1. Import the `vtex.store-component` app to your theme's dependencies in the `manifest.json`;

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `shipping-simulator` block to any block below store.product. For example:

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
  },
   "shipping-simulator": {
    "props": {
      "skuID": "342"
    }
  },
```

| Prop name               | Type      | Description                                                                                   | Default value |
| ----------------------- | --------- | --------------------------------------------------------------------------------------------- | ------------- |
| `skuId`                 | `String`  | ID of the current product SKU                                                                 | -             |
| `seller`                | `String`  | ID of the product seller                                                                      | -             |
| `shouldUpdateOrderForm` | `Boolean` | Whether interacting with the simulator should update the shopper's address in their orderForm | `true`        |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles                         |
| ----------------------------------- |
| `shippingContainer`                 |
| `shippingContainerLoader`           |
| `shippingCTA`                       |
| `shippingInputLoader`               |
| `shippingNoMessage`                 |
| `shippingTable`                     |
| `shippingTableBody`                 |
| `shippingTableCell`                 |
| `shippingTableCellDeliveryEstimate` |
| `shippingTableCellDeliveryName`     |
| `shippingTableCellDeliveryPrice`    |
| `shippingTableHead`                 |
| `shippingTableHeadDeliveryEstimate` |
| `shippingTableHeadDeliveryName`     |
| `shippingTableHeadDeliveryPrice`    |
| `shippingTableLabel`                |
| `shippingTableRadioBtn`             |
| `shippingTableRow`                  |
| `shippingZipcodeLabel`              |
| `shippingZipcodeLabelLoader`        |
