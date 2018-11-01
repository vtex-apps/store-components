# Product Name
Product Name is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import ProductName from 'vtex.store-components/ProductName'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<ProductName />`. 
```jsx
// ...

<ProductName
  name={product.productName}
  skuName={selectedItem.name}
  brandName={product.brand}
  renderName={({ name, large }) => {
      let classes = 'vtex-product-name__brand c-on-base'
      if (large) {
        classes = classNames(classes, 'some-css-class-for-large-typograhy')
      } else {
        classes = classNames(classes, 'some-css-class-for-small-typography')
      }
      return (
        <span className={classes}>{name}</span>
      )
  }}
/>

// The others render props functions should be very similar with this one
```

| Prop name               | Type       | Description                                                                                                       |
| ----------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------- |
| `brandName`             | `String`   | Brand name                                                                                                        |
| `large`                 | `Boolean`  | Displays large font                                                                                               |
| `name`                  | `String!`  | Name of the product                                                                                               |
| `productReference`      | `String`   | Product reference                                                                                                 |
| `renderName`            | `func`     | Render function for name field, this function should expect a name string and large prop                          |
| `renderSku`             | `func`     | Render function for sku field, this function should expect a skuName string and large prop                        |
| `renderProductReference`| `func`     | Render function for product reference field, this function should expect a productReference string and large prop |
| `showBrandName`         | `Boolean`  | Show brand name                                                                                                   |
| `showProductReference`  | `Boolean`  | Show product reference                                                                                            |
| `showSku`               | `Boolean`  | Show product SKU                                                                                                  |
| `skuName`               | `String`   | Selected SKU name                                                                                                 |

See an example at [Product Details](https://github.com/vtex-apps/product-summary/blob/master/react/index.js) app
