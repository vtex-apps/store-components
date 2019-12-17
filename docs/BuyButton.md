📢 Use this project, [contribute](https://github.com/vtex-apps/store-components) to it or comment on issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion). 

# Buy Button

The `BuyButton` block allows users to **add products in the minicart**.

![image](https://user-images.githubusercontent.com/284515/70233985-69e13700-173e-11ea-91f7-6675a6a0e73b.png)

## Configuration

1. Import the `vtex.store-component` app to your theme's dependencies in the `manifest.json`;

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `buy-button` block to any block bellow `store.product` (Product template). For example:

```json
  "store.product": {
    "children": [
      "flex-layout.row#product",
    ]
  },
  "flex-layout.row#product": {
    "children": [
      "buy-button#product"
    ]
  },
   "buy-button#product": {
    "props": {
      "isOneClickBuy": true,
      "showTooltipOnSkuNotSelected": false
    }
  },
```

| Prop name            | Type      | Description                                                                      | Default value      |
| -------------------- | --------- | -------------------------------------------------------------------------------- | ------------------ |
| `isOneClickBuy`      | `Boolean` | If the block should redirect the user to the Checkout page or not                                      | `false`              |
| `shouldOpenMinicart` | `Boolean` | If the Minicart should open after the user clicks on the Buy Button                               | `false`              |
| `large`              | `Boolean` | Sets button to large style, filling whole width (like a `block`)                 | -                  |
| `available`          | `Boolean` | If the block is available or not                                                 | `true`               |
| `showToast`          | `Boolean` | If a Toast with feedback should be displayed after an item is added to the cart       | -                  |
| `showItemsPrice`     | `Boolean` | If you want to show the total price of items added to the cart                 | `false`              |
| `customToastURL`     | `String`  | It sets the link associated with the Toast. | `/checkout/#/cart` |
| `shouldAddToCart`    | `Boolean` | If the Buy Button should add the product to the cart when clicked on                                            | `true`          |
| `showTooltipOnSkuNotSelected` | `Boolean` | If it should show a tooltip when you click on the Buy Button but no SKU was selected | `true` |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `buyButtonText`       |
| `buttonDataContainer` |
| `buttonItemsPrice`    |
