📢 Don't fork this project. Use, [contribute](https://github.com/vtex-apps/awesome-io#contributing), or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Price

`ProductPrice` is a VTEX component that shows the price of a product.
This Component can be imported and used by any VTEX app.

## Configuration

1. Import the vtex.store-component's app to your theme's dependencies in the manifest.json, for example:

```json
  dependencies: {
    "vtex.store-components": "3.x"
  }
```

2. Add the `product-price` block to any block bellow `store.product`. For example:

```json
  "store.product": {
    "children": [
      "flex-layout.row#product",
    ]
  },
  "flex-layout.row#product": {
    "children": [
      "product-price"
    ]
  }
```

| Prop name               | Type      | Description                           | Default value |
| ----------------------- | --------- | ------------------------------------- | ------------- |
| `labelSellingPrice`     | `String`  | Product selling price label           | null          |
| `labelListPrice`        | `String`  | Product list price label              | null          |
| `showListPrice`         | `Boolean` | Set visibility of list price          | true          |
| `sellingPrices`         | `Array`   | Product list of selling prices        | []            |
| `showSellingPriceRange` | `Boolean` | Set visibility of selling price range | false         |
| `showListPriceRange`    | `Boolean` | Set visibility of list price range    | false         |
| `showLabels`            | `Boolean` | Set visibility of labels              | true          |
| `showInstallments`      | `Boolean` | Set visibility of installments        | false         |
| `showSavings`           | `Boolean` | Set visibility of savings             | false         |

## Customization

| CSS Handles                 |
| -------------------------- |
| `price_className` |
| `price_loader` |
| `price_listPriceContainer` |
| `price_listPriceLabel` |
| `price_listPrice` |
| `price_listPriceRange` |
| `price_sellingPriceRange` |
| `price_sellingPriceContainer` |
| `price_sellingPriceLabel` |
| `price_sellingPrice` |
| `price_savingsContainer` |
| `price_savings` |
| `price_installment` |
| `price_interestRate` |
| `price_installmentContainer` |
