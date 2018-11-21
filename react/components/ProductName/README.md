# Product Name
Product Name is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import ProductName from 'vtex.store-components/ProductName'
```

## Usage
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

## Passing classes to the elements of the component
The `classes` prop has the following structure
```js
classes: PropTypes.shape({
  root: PropTypes.string,
  brandName: PropTypes.string,
  skuName: PropTypes.string,
  productReference: PropTypes.string,
  rootLoader: PropTypes.string
})
```
Every attribute of the `classes` object represent a element of the component. To understand better see the following example of how to pass classes to every element
```jsx
const classes = {
  root: 'some-css-class pt4',
  brandName: 'f5',
  skuName: 'f6',
  rootLoader: 'pt5 overflow-hidden'
}
<ProductName
  showSku
  showBrandName
  name={product.productName}
  skuName={selectedItem.name}
  brandName={product.brand}
  classes={classes}
/>
```
See that we are not passing classes to `productReference`, beacause we don't need  it, since we are not rendering it. If you have any doubt check the [Component implementation](https://github.com/vtex-apps/store-components/tree/master/react/components/ProductName).

| Prop name | Type | Description |
| --------- | ---- | ----------- |
| `name` | `String!` | Name of the product |
| `skuName` | `String` | Selected SKU name |
| `showSku` | `Boolean` | Show product SKU |
| `productReference` | `String` | Product reference |
| `classes` | `Object` | Classes to apply to elements of the component |
| `showProductReference` | `Boolean` | Show product reference |
| `brandName` | `String` | Brand name |
| `showBrandName` | `Boolean` | Show brand name |

See an example at [Product Details](https://github.com/vtex-apps/product-details/blob/master/react/ProductDetails.js#L49) app
