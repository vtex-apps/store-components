# Buy Button

## Description

`BuyButton` is a VTEX Component that is resposible to handle events of adding products in the minicart. This Component can be imported and used by any VTEX App.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents

- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](/README.md#usage).

Then, add `buy-button` block into your app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json).

### Blocks API

When implementing this component as a block, various inner blocks may be available. The following interface lists the available blocks within `BuyButton` and describes if they are required or optional.

```json
  "buy-button": {
    "component": "BuyButton"
  }
```

For now this block does not have any required or optional blocks.

#### Configuration

Through the Storefront, you can change the `BuyButton`'s behavior and interface. However, you also can make in your theme app, as Store theme does.

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

### Styles API

You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces

| Class Name            | Description                                   | Note                                            | Modifiers                  |
| --------------------- | --------------------------------------------- | ----------------------------------------------- | -------------------------- |
| `buyButtonText`       | Contains the text displayed inside buy button |                                                 |                            |
| `buttonDataContainer` | Wraps data inside the buy button              | Only appears when `showItemsPrice` prop is true |                            |
| `buttonItemsPrice`    | Wraps the price displayed inside buy button   | Only appears when `showItemsPrice` prop is true |                            |
