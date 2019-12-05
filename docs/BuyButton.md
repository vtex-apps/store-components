📢 Don't fork this project. Use, [contribute](https://github.com/vtex-apps/awesome-io#contributing), or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Buy Button

`BuyButton` is a VTEX Component that is resposible to handle events of adding products in the minicart. This Component can be imported and used by any VTEX App.

![image](https://user-images.githubusercontent.com/284515/70233985-69e13700-173e-11ea-91f7-6675a6a0e73b.png)

## Configuration

1. Import the vtex.store-component's app to your theme's dependencies in the manifest.json, for example:

```json
  dependencies: {
    "vtex.store-components": "3.x"
  }
```

2. Add the `buy-button` block to any block bellow `store.product`. For example:

```json
  "store.product": {
    "children": [
      "flex-layout.row#product",
    ]
  },
  "flex-layout.row#product": {
    "children": [
      "buy-button"
    ]
  }
```

| Prop name            | Type      | Description                                                                      | Default value      |
| -------------------- | --------- | -------------------------------------------------------------------------------- | ------------------ |
| `isOneClickBuy`      | `Boolean` | Should redirect to the checkout page or not                                      | `false`              |
| `shouldOpenMinicart` | `Boolean` | Should open the Minicart after clicking the button                               | `false`              |
| `large`              | `Boolean` | Sets button to large style, filling whole width (like a `block`)                 | -                  |
| `available`          | `Boolean` | If component is available or not                                                 | `true`               |
| `showToast`          | `Boolean` | If toast with feedback should be shown after add item request is processed       | -                  |
| `showItemsPrice`     | `Boolean` | If you want to show the total price of items to be added to cart                 | `false`              |
| `customToastURL`     | `String`  | Set the link associated with the Toast created when adding an item to your cart. | `/checkout/#/cart` |
| `shouldAddToCart`    | `Boolean` | If it should add to cart when clicked                                             | true          |
| `showTooltipOnSkuNotSelected` | `Boolean` | If it should show a tooltip when you click the button but there's no SKU selected | `true` |

## Customization

| CSS Handles |
| --- |
| `buyButtonText`       |
| `buttonDataContainer` |
| `buttonItemsPrice`    |
