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

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

Then, add `product-price` block into your app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json). 

### Blocks API

This component has an interface that describes which rules must be implemented by a block when you want to use the `ProductPrice`.

 ```json
  "product-price": {
    "component": "ProductPrice"
  }
```	

### Configuration

Through the Storefront, you can change the `ProductPrice`'s behavior and interface. However, you also can make in your theme app, as Dreamstore does.

| Prop name | Type | Description |
| --------- | ---- | ----------- |
| `labelSellingPrice` | `String` | Product selling price label |
| `showListPrice` | `Boolean` | Set visibility of list price |
| `showLabels` | `Boolean` | Set visibility of labels |
| `showInstallments` | `Boolean` | Set visibility of installments |
| `showSavings` | `Boolean` | Set visibility of savings |

### Styles API
You should follow the Styles API instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#styles-api).

| Token name | Component | Description |
| ---------- | --------- | ----------- |
