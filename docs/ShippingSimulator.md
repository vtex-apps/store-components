>📢 **Disclaimer** Don't fork this project. Use it, [contribute](https://github.com/vtex-apps/store-components) to it or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion) to help us evolve it.

# Shipping Simulator

The `shipping-simulator` block estimates the shipping cost based on a postal code input.

![shipping](https://user-images.githubusercontent.com/52087100/70262606-6ddb7c00-1773-11ea-91af-ededfd27aa95.png)

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json` file, as shown in the following example:

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

3. Declare the `shipping-simulator` block using the props stated in the [Props](#props) table. For example:

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
| `pricingMode`           | `enum`    | Defines how shipping information is displayed when a product includes gifts or attachments. You can choose to group shipping information by type (`grouped`) or display shipping costs for each item individually (`individualItems`). | `individualItems`       |
| `seller`                | `String`  | ID of the product seller.                                                                      | -             |
| `shouldUpdateOrderForm` | `Boolean` | Determines whether interacting with the shipping simulator should update the shopper's address in their `orderForm` (`true`). This only works if the [orderform optimization](https://developers.vtex.com/docs/guides/vtex-io-documentation-enabling-order-form-optimization) is enabled; otherwise, it has no effect, even if set to `true`. | `true`        |
| `skuId`                 | `String`  | ID of the current product SKU.                                                                 | -             |

## Customization

To apply CSS customizations to this and other blocks, see the guide[Using CSS handles for store customization](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-using-css-handles-for-store-customization).

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
