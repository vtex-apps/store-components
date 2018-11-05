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
  showSku
  showBrandName
  brandName={product.brand}
  name={product.productName}
  skuName={selectedItem.name}
>
  {({ name, large, skuName, brandName }) => {
      const classes = classNames('vtex-product-name__brand c-on-base', {
        'some-css-class-for-large-typograhy': large,
        'some-css-class-for-small-typography': !large,
      })
      return (
        <div className="container">
          <span className={classes}>{name} - {brandName}</span>
          <span className="pv4 muted-1">{skuName}</span>
        </div>
      )
  }}
</ProductName>

// The others render props functions should be very similar with this one
```

| Prop name               | Type       | Description                       |
| ----------------------- | ---------- | --------------------------------- |
| `name`                  | `String!`  | Name of the product               |
| `large`                 | `Boolean`  | Displays large font               |
| `brandName`             | `String`   | Brand name                        |
| `productReference`      | `String`   | Product reference                 |
| `children`              | `func!`    | Render all fields of the component|
| `showBrandName`         | `Boolean`  | Show brand name                   |
| `showSku`               | `Boolean`  | Show product SKU                  |
| `skuName`               | `String`   | Selected SKU name                 |
| `showProductReference`  | `Boolean`  | Show product reference            |

See an example at [Product Details](https://github.com/vtex-apps/product-summary/blob/master/react/index.js) app
