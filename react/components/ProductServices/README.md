# Product Services

## Description

`ProductServices` is a VTEX Component that shows the services of a product.
This Component can be imported and used by any VTEX App.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
  - [CSS namespaces](#css-namespaces)
  - [Styles API](#styles-api)
    - [CSS namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

Then, add `product-services` block into your app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json). 

### Blocks API

This component has an interface that describes which rules must be implemented by a block when you want to use the `ProductServices`.

```json
  "product-services": {
    "component": "ProductServices"
  }
```

### Configuration


Through the Storefront, you can change the `ProductDescription`'s behavior and interface. However, you also can make in your theme app, as Store Theme does.

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `services` | `Array(Services)` | Services of a product | `[]` |


Services:

| Prop name | Type | Description |
| --------- | ---- | ----------- |
| `name` | `String!` | Service name |
| `values` | `Array(String)!` | Service values |


### Styles API

You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces
Below, we describe the namespace that are defined in the `ProductServices`.

| Class name | Description | Component Source |
| ---------- | ----------- | ---------------- |
| `content` | The content of ProductHighlights section. | [index](/react/components/ProductServices/index.js) |
