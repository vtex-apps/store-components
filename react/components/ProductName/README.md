# Product Name
Product Name is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import ProductName from 'vtex.store-components/ProductName'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<ProductName />`. 
```html
<ProductName
    name={product.productName}
    skuName={selectedItem.name}
    brandName={product.brand}
/>
```

| Prop name             | Type       | Description                                      |
| --------------------- | ---------- | ------------------------------------------------ |
| `name`                | `String!`  | Name of the product                              |
| `skuName`             | `String`   | Selected SKU name                                |
| `showSku`             | `Boolean`  | Show product SKU                                 |
| `productReference`    | `String`   | Product reference                                |
| `showProductReference`| `Boolean`  | Show product reference                           |
| `brandName`           | `String`   | Brand name                                       |
| `showBrandName`       | `Boolean`  | Show brand name                                  |
| `label`               | `Boolean`  | Displays large font                              |

See an example at [Product Details](https://github.com/vtex-apps/product-details/blob/master/react/ProductDetails.js#L49) app
