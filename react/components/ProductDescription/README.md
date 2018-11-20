# Product Description
Product Description is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import ProductDescription from 'vtex.store-components/ProductDescription'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<ProductDescription />`. 
```jsx
<ProductDescription specifications={product.specs} skuName={product.name}> 
   <span>{product.description}</span>
</ProductDescription>
```

### Passing classes to elements of the component
The `classes` and `rowClasses` props have the following structure:
```js
{
  classes: PropTypes.shape({
    root: PropTypes.string,
    description: PropTypes.shape({
      container: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    }),
    table: PropTypes.shape({
      container: PropTypes.string,
      title: PropTypes.string,
      tableElement: PropTypes.string,
      tableBody: PropTypes.string
    }),
  }),
  rowClasses: PropTypes.shape({
    row: PropTypes.string,
    thName: PropTypes.string,
    tdValue: PropTypes.string
  })
}
```

The attributes of `classes` and `rowClasses` objects represent an element of the component. To understand better see the following example of how to pass classes to elements
```jsx
// ...
const classes = {
  root: 'ma2',
  description: {
    title: 'f4 b ttu mb3',
    text: 'measure-wide'
  },
  table: {
    container: 'mt6',
    title: 'f4 b ttu mb6-ns mb5-s',
    tableElement: 'w-100'
  }
}

const rowClasses = {
  thName: 'dtc-ns bn-s',
  tdValue: 'c-muted-2 db-s'
}

<ProductDescription
  skuName={skuName}
  classes={classes}
  rowClasses={rowClasses}
  description={description}
  specifications={specifications}
/>
```

| Prop name | Type | Description |
| --------- | ---- | ----------- |
| `children` | `Node!` | Children component which contains the product description |
| `specifications` | `Array` | Specifications that will be displayed on the table |
| `specifications[n].name` | `String` | Specification name |
| `specifications[n].value` | `String` | Specifications value |
| `classes` | `Object` | CSS classes to be applied in the elements of the component |
| `rowClasses` | `Object` | CSS classes to be applied in the elements of SpecificationRow component |
| `skuName` | `String` | Name of the SKU |

See an example at [Product Details](https://github.com/vtex-apps/product-details) app
