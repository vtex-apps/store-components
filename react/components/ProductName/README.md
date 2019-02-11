# Product Name

## Description

Product Name is a canonical component that any VTEX app can import.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Styles API](#styles-api)
- [Troubleshooting](#troubleshooting)
- [Tests](#tests)

## Usage

To import it into your code: 

```js
import ProductName from 'vtex.store-components/ProductName'
```

You can use it in your code like a React component with the jsx tag: `<ProductName />`. 
```jsx
<ProductName
  showSku
  showBrandName
  name={product.productName}
  skuName={selectedItem.name}
  brandName={product.brand}
/>
```

### Configuration

Every prop that ends with `Class` will be passed to an element of the component, see the code below
```jsx
<ProductName
  skuNameClass="some-other-css-class"
  className="pv4 overflow-hidden"
  brandNameClass="c-muted"
  showSku
  showBrandName
  brandName={product.brand}
  name={product.productName}
  skuName={selectedItem.name}
/>
})
```

| Prop name | Type | Description |
| --- | --- | --- |
| `name` | `String!` | Name of the product |
| `skuName` | `String` | Selected SKU name |
| `showSku` | `Boolean` | Show product SKU |
| `productReference` | `String` | Product reference |
| `showProductReference` | `Boolean` | Show product reference |
| `brandName` | `String` | Brand name |
| `showBrandName` | `Boolean` | Show brand name |
| `className` | `String` | Classes to be applied to root element |
| `brandNameClass` | `String` | Classes to be applied to brandName element |
| `skuNameClass` | `String` | Classes to be applied to skuName element |
| `productReferenceClass` | `String` | Classes to be applied to productReference element |
| `loaderClass` | `String` | Classes to be applied to loader root element |

See an example at [Product Details](https://github.com/vtex-apps/product-details) app

### Styles API
:construction: :construction: :construction:

## Troubleshooting
You can check if others are passing through similar issues [here](https://github.com/vtex-apps/store-components/issues). Also feel free to [open issues](https://github.com/vtex-apps/store-components/issues/new) or contribute with pull requests.

## Tests
:construction: :construction: :construction: