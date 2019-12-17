📢 Use this project, [contribute](https://github.com/vtex-apps/store-components) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion). 

# Product Price

The `ProductPrice` is responsible for **displaying the price** of a given product.

![image](https://user-images.githubusercontent.com/284515/70233684-d3ad1100-173d-11ea-8582-4acf52263521.png)

## Configuration

1. Import the `vtex.store-component` app to your theme's dependencies in the `manifest.json`;

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `product-price` block to any block below `store.product` (Product template). For example:

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
  },
   "product-price": {
    "props": {
      "showSavings": true,
      "showListPrice": false
    }
  },
```

| Prop name               | Type      | Description                           | Default value |
| ----------------------- | --------- | ------------------------------------- | ------------- |
| `labelSellingPrice`     | `String`  | Product selling price label           | null          |
| `labelListPrice`        | `String`  | Product list price label              | null          |
| `showListPrice`         | `Boolean` | Set visibility of list price          | `true`          |
| `sellingPrices`         | `Array`   | Product list of selling prices        | `[]`            |
| `showSellingPriceRange` | `Boolean` | Set visibility of selling price range | `false`         |
| `showListPriceRange`    | `Boolean` | Set visibility of list price range    | `false`         |
| `showLabels`            | `Boolean` | Set visibility of labels              | `true`          |
| `showInstallments`      | `Boolean` | Set visibility of installments        | `false`         |
| `showSavings`           | `Boolean` | Set visibility of savings             | `false`         |
| `blockClass`            | `String`  | The set value functions as a customization identifier for any CSS specified in the block | null | 

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

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
