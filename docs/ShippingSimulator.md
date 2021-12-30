>📢 **Disclaimer** Don't fork this project. Use it, [contribute](https://github.com/vtex-apps/store-components) to it or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion) to help us evolve it.

# Shipping Simulator

The `shipping-simulator` block estimates the shipping fee based on a zip code input.

![shipping](https://user-images.githubusercontent.com/52087100/70262606-6ddb7c00-1773-11ea-91af-ededfd27aa95.png)

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json` file as in the following example:

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `shipping-simulator` block to any child of the `store.product` template (Product Details Page template). For example:

```diff
  "store.product": {
    "children": [
      "flex-layout.row#product",
    ]
  },
  "flex-layout.row#product": {
    "children": [
+     "shipping-simulator"
    ]
  },
```

3. Then, declare the `shipping-simulator` block using the props stated in the [Props](#props) table. For example:

```json
   "shipping-simulator": {
    "props": {
      "skuID": "342"
    }
  },
```

### Props

| Prop name               | Type      | Description                                                                                   | Default value |
| ----------------------- | --------- | --------------------------------------------------------------------------------------------- | ------------- |
| `pricingMode`           | `enum`    | If the product has gifts or attachments, for example, you can choose whether the shipping information will be grouped (`grouped`) by shipping type or showing the shipping prices for each of the items individually (`individualItems`). | `individualItems`       |
| `seller`                | `String`  | ID of the product seller.                                                                      | -             |
| `shouldUpdateOrderForm` | `Boolean` | Whether interacting with the simulator should update the shopper's address in their `orderForm`. | `true`        |
| `skuId`                 | `String`  | ID of the current product SKU.                                                                 | -             |

## Customization

To apply CSS customizations in this and other blocks, follow the [Using CSS handles for store customization](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-using-css-handles-for-store-customization) guide.

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
