# Shipping Simulator
Shipping Simulator is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import ShippingSimulator from 'vtex.store-components/ShippingSimulator'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<ShippingSimulator />`. 

```jsx
<ShippingSimulator
  skuId="3"
  seller="1"
/>
```

| Prop name          | Type      | Description                   |
| ------------------ | --------- | ----------------------------- |
| `skuId`            | `String!` | Id of the current product SKU |
| `seller`           | `String!` | Id of the product seller      |

See an example at [Product Details](https://github.com/vtex-apps/product-details/blob/master/react/ProductDetails.js#L71) app
