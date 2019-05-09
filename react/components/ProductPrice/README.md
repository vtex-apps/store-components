# Product Price

## Description

`ProductPrice` is a VTEX component that shows the price of a product.
This Component can be imported and used by any VTEX app.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](/README.md#usage).

Then, add `product-price` block into your app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json). 

### Blocks API

When implementing this component as a block, various inner blocks may be available. The following interface lists the available blocks within `ProductPrice` and describes if they are required or optional.

```json
  "product-price": {
    "component": "ProductPrice"
  }
```

For now this block does not have any required or optional blocks.

#### Configuration

Through the Storefront, you can change the `ProductPrice`'s behavior and interface. However, you also can make in your theme app, as Store theme does. However, you also can make in your theme app, as Store theme does.

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `labelSellingPrice` | `String` | Product selling price label | null |
| `labelListPrice` | `String` | Product list price label | null |
| `showListPrice` | `Boolean` | Set visibility of list price | true |
| `showLabels` | `Boolean` | Set visibility of labels | true |
| `showInstallments` | `Boolean` | Set visibility of installments | false |
| `showSavings` | `Boolean` | Set visibility of savings | false |

### Styles API
You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces
Below, we describe the namespace that are defined in the `ProductPrice`.

| Class name | Description | Component Source |
| ---------- | ----------- | ---------------- |
| `priceContainer` | The main container of `ProductPrice` | [index](/react/components/ProductPrice/index.js) |
| `listPrice` | The list price container | [index](/react/components/ProductPrice/index.js) |
| `listPriceLabel` | The list price label | [index](/react/components/ProductPrice/index.js) | 
| `listPriceValue` | The list price value | [index](/react/components/ProductPrice/index.js) |
| `sellingPrice` | The selling price container | [index](/react/components/ProductPrice/index.js) | 
| `sellingPriceLabel` | The selling price label | [index](/react/components/ProductPrice/index.js) |
| `sellingPriceValue` | The selling price value | [index](/react/components/ProductPrice/index.js) |
| `savingPrice` | The saving price container | [index](/react/components/ProductPrice/index.js) |
| `savingPriceValue` | The saving price value | [index](/react/components/ProductPrice/index.js) |
| `installmentsPrice` | The installments price container | [Installments](/react/components/ProductPrice/Installments.js) | 
| `interestRatePrice` | The interest rate price | [Installments](/react/components/ProductPrice/Installments.js) |
| `priceLoaderContainer` | The container of the `ProductPrice` loader | [index](/react/components/ProductPrice/index.js) |
| `listPriceLoader` | The list price loader | [index](/react/components/ProductPrice/index.js) |
| `sellingPriceLabelLoader` | The selling price loader label | [index](/react/components/ProductPrice/index.js) |
| `sellingPriceLoader` | The selling price loader | [index](/react/components/ProductPrice/index.js) |
| `installmentsPriceLoader` | The installments price loader | [index](/react/components/ProductPrice/index.js) |
| `savingsPriceLoader` | The savings price loader | [index](/react/components/ProductPrice/index.js) |
