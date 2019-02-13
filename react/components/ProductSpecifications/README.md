# Product Specifications

## Description

`ProductSpecifications` is a VTEX component that shows the technical specifications of a product.
This Component can be imported and used by any VTEX app.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
  - [Configuration](#configuration)
  - [Styles API](#styles-api)

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

Then, add `product-specifications` block into your app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json). 

### Blocks API

This component has an interface that describes which rules must be implemented by a block when you want to use the `ProductSpecifications`.

 ```json
  "product-specifications":{
    "component": "ProductSpecifications"
  }
```	

### Configuration

Through the Storefront, you can change the `ProductSpecifications`'s behavior and interface. However, you also can make in your theme app, as Dreamstore does.

| Prop name | Type | Description |
| --------- | ---- | ----------- |
| `specifications` | `Array(Specification)` | Specifications of a product |
| `tabsMode` | `Boolean` | `true`: displays the specifications in tab mode; `false`: displays the specifications in table mode (default: `false`) |

Specification:

| Prop name | Type | Description |
| --------- | ---- | ----------- |
| `name` | `String!` | Specification name |
| `values` | `Array(String)!` | Specification values |


### Styles API
You should follow the Styles API instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#styles-api).

| Token name | Component | Description |
| ---------- | --------- | ----------- |
| `specificationsTitle` | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/ProductSpecifications/index.js) | The title of the specifications section |
| `specificationsTableContainer` | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/ProductSpecifications/index.js) | The main container of the product specifications in table view including the `specificationsTable` and the `specificationTitle` |
| `specificationsTable` | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/ProductSpecifications/index.js) | The table of specifications |
| `specificationsTabsContainer` | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/ProductSpecifications/index.js) | The main container of the product specifications in tabs view including the `specificationsTable` and the `specificationTitle` |
| `specificationsTab` | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/ProductSpecifications/index.js) | The content inside a tab of the product |