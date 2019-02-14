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
    - [CSS Namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](/README.md#usage).

Then, add `product-specifications` block into your app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json). 

### Blocks API


When implementing this component as a block, various inner blocks may be available. The following interface lists the available blocks within `ProductSpecifications` and describes if they are required or optional.

 ```json
  "product-specifications":{
    "component": "ProductSpecifications"
  }
```	

For now this block does not have any required or optional blocks.

### Configuration

Through the Storefront, you can change the `ProductSpecifications`'s behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `specifications` | `Array(Specification)` | Specifications of a product | `[]` |
| `tabsMode` | `Boolean` | Displays the technical specifications in tab mode. Else displays in table mode | `false`

Specification:

| Prop name | Type | Description |
| --------- | ---- | ----------- |
| `name` | `String!` | Specification name |
| `values` | `Array(String)!` | Specification values |


### Styles API

You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces
Below, we describe the namespace that are defined in the `ProductSpecifications`.

| Class name | Description | Component Source |
| ---------- | ----------- | ---------------- |
| `specificationsTitle` | The title of the specifications section | [index](/react/components/ProductSpecifications/index.js) |
| `specificationsTableContainer` | The main container of the product specifications in table view including the `specificationsTable` and the `specificationTitle` | [index](/react/components/ProductSpecifications/index.js) |
| `specificationsTable` |  The table of specifications | [index](/react/components/ProductSpecifications/index.js) |
| `specificationsTabsContainer` | The main container of the product specifications in tabs view including the `specificationsTable` and the `specificationTitle` | [index](/react/components/ProductSpecifications/index.js) |
| `specificationsTab` | The content inside a tab of the product | [index](/react/components/ProductSpecifications/index.js) |