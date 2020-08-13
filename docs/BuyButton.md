📢 Use this project, [contribute](https://github.com/vtex-apps/store-components) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion). 

# Buy Button

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

The `buy-button` block allows users to add products in the [Minicart](https://vtex.io/docs/components/all/vtex.minicart@2.46.1/) (`minicart.v1`).

:warning: **The Buy Button block only effectively function i.e. only adds products to the Minicart if the store uses the Minicart v1**. When using the Minicart v2, use the [Add To Cart Button](https://vtex.io/docs/components/all/vtex.add-to-cart-button@0.9.0/) instead.

![image](https://user-images.githubusercontent.com/284515/70233985-69e13700-173e-11ea-91f7-6675a6a0e73b.png)

## Configuration

1. Import the `vtex.store-component` app to your theme's dependencies in the `manifest.json`;

```diff
  "dependencies": {
+   "vtex.store-components": "3.x"
  }
```

2. Add the `buy-button` to other theme block using the product context, such as the `product-summary.shelf`. In the example below, the `buy-button` is added to the `flex-layout.row` block from the `store.product` template (which uses the product context):

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
| `isOneClickBuy`      | `boolean` | Whether the user should be redirected to the checkout page (`true`) or not (`false`) when the Add To Cart Button is clicked on.        |  `false`              |
| `customToastURL`     | `string`  | Defines the link to where users will be redirected when the Buy Button is clicked on and the `isOneClickBuy` prop is set to `true`. | `/checkout/#/cart` |
| `shouldOpenMinicart` | `boolean` | Whether the Minicart should be opened when the Buy Button is clicked on (`true`) or not (`false`).                              | `false`              |
| `large`              | `boolean` | Whether the Buy Button should fill its whole width (`true`) or not (`false`). | `false`    |
| `available`          | `boolean` | Whether the Buy Button block is available for using (`true`) or not (`false`). | `true` |
| `showToast`          | `boolean` | Whether a Toast (pop-up notification) should be displayed when adding an item to the minicart (`true`) or not (`false`)    | `false`                 |
| `showItemsPrice`     | `boolean` | Whether the total price of items added to the cart should be displayed (`true`) or not (`false`).                 | `false`              |
| `shouldAddToCart`    | `boolean` | Whether the Buy Button should add products to the minicart when clicked on (`true`) or not (`false`).         | `true`          |
| `showTooltipOnSkuNotSelected` | `boolean` | Whether a tooltip should be displayed when the Buy Button is clicked on with no SKU was selected (`true`) or not (`false`). | `true` |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `buyButtonText`       |
| `buttonDataContainer` |
| `buttonItemsPrice`    |

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
