# Product Description
Product Description is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import ProductDescription from 'vtex.store-components/ProductDescription'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<ProductDescription />`. 
```html
<ProductDescription> 
   <span>{product.description}</span>
</ProductDescription>
```

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `component`        | `Node!`    | Children component which contains the product description                   |

See an example at [Product Details](https://github.com/vtex-apps/product-details/blob/master/react/ProductDetails.js#L88) app
