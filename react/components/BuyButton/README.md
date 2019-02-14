# Buy Button

## Description

`BuyButton` is a VTEX Component that is resposible to handle events of adding productins in the minicart. This Component can be imported and used by any VTEX App.

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

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `skuItems` | `Array(SkuItem)!` | SKU Items to be added to the cart | - |
| `isOneClickBuy` | `Boolean` | Should redirect to the checkout page or not | false |
| `large` | `Boolean` | Sets button to large style, filling whole width (like a `block`) | - |
| `available` | `Boolean` | If component is available or not | true |
| `showToast` | `Boolean` | If toast with feedback should be shown after add item request is processed | - |
| `onAddStart` | `Function: () => void` | Function called before add item request starts | - |
| `onAddFinish` | `Function: () => void` | Function called after add item request ends | - |

SKUItem:

| Prop name          | Type                 | Description                                                                 |
| ------------------ | -------------------- | --------------------------------------------------------------------------- |
| `skuId`            | `String!`            | Specification of which product will be added to the cart |
| `quantity`         | `Number!`            | Quantity of the product sku to be added to the cart |
| `seller`           | `Number!`            | Which seller is being referenced by the button  |
| `name`             | `String!`            | Product name |
| `price`            | `Number!`            | Product price |
| `brand`            | `String!`            | Product brand |
| `variant`          | `String`             | Product variant |
| `options`          | `Array(OptionType)`  | Items to be added as assembly options of this parent product |

OptionType:

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `id`               | `String!`  | Id of assembly option |
| `quantity`         | `Number!`  | Quantity of assembly option to be added |
| `assemblyId`       | `String!`  | parentAssemblyBinding of assembly option |
| `seller`           | `String!`  | seller of assembly option |

### Styles API

You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces

:construction: :construction: :construction: