# Product Name

## Description

`ProductName` is a VTEX Component that shows the name of the product with other informations such as SKU or brand.
This Component can be imported and used by any VTEX App.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
  - [Configuration](#configuration)
  - [Styles API](#styles-api)

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

Then, add `product-name` block into our app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json). 

### Blocks API

This component has an interface that describes which rules must be implemented by a block when you want to use the `ProductName`.

```json
  "product-name": {
    "component": "ProductName"
  }
```

### Configuration

Through the Storefront, you can change the `ProductName`'s behavior and interface. However, you also can make in your theme app, as Dreamstore does.

| Prop name | Type | Description |
| --- | --- | --- |
| `showSku` | `Boolean` | Show product SKU |
| `showProductReference` | `Boolean` | Show product reference |
| `showBrandName` | `Boolean` | Show brand name |

### Styles API
:construction: :construction: :construction: