# Product Price

Product Price is a canonical component that any VTEX app can import.

To import it into your code:

```js
import ProductPrice from 'vtex.store-components/ProductPrice'
```

## Usage

You can use it in your code like a React component with the jsx tag: `<ProductPrice />`.

```jsx
<ProductPrice
  showLabels={showLabels}
  showListPrice={showListPrice}
  showInstallments={showInstallments}
  sellingPrice={commertialOffer.Price}
  listPrice={commertialOffer.ListPrice}
  installments={commertialOffer.Installments}
/>
```

### Passing classes to the elements of the component
The `classes` and the `installmentsClasses` props have the following structure
```js
{
  classes: PropTypes.shape({
    root: PropTypes.string,
    rootLoader: PropTypes.string,
    listPrice: PropTypes.shape({
      container: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string
    }),
    sellingPrice: PropTypes.shape({
      container: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string
    }),
    savings: PropTypes.shape({
      container: PropTypes.string,
      value: PropTypes.string
    })
  }),
  installmentsClasses: PropTypes.shape({
      root: PropTypes.string,
      installmentValue: PropTypes.string,
      interestRate: PropTypes.string
  })
}
```
The attributes of `classes` and `installmentsClasses` objects represent an element of the component. To understend better see the following example of how to pass classes to elements
```jsx

const classes = {
  root: 'vtex-price some-css-class',
  rootLoader: 'vtex-price vtex-price-loader some-other-css-class',
  sellingPrice: {
    container: 'some-css-class-for-selling-container'
  }
}

const installmentsClasses = {
  root: 'css-class-for-root-of-installments'
}

<ProductPrice
  classes={classes}
  showLabels={showLabels}
  showListPrice={showListPrice}
  showInstallments={showInstallments}
  sellingPrice={commertialOffer.Price}
  listPrice={commertialOffer.ListPrice}
  installmentsClasses={installmentsClasses}
  installments={commertialOffer.Installments}
/>
```

| Prop name                                 | Type       | Description                                                |
| ----------------------------------------- | ---------- | ---------------------------------------------------------- |
| `sellingPrice`                            | `Number`   | Product selling price                                      |
| `listPrice`                               | `Number`   | Product list price                                         |
| `showListPrice`                           | `Boolean!` | Set visibility of list price                               |
| `showLabels`                              | `Boolean!` | Set visibility of labels                                   |
| `showInstallments`                        | `Boolean!` | Set visibility of installments                             |
| `showSavings`                             | `Boolean`  | Set visibility of savings                                  |
| `classes`                                 | `Object`   | CSS classes to be applied in the Price component Component |
| `installments`                            | `Array`    | Available installments                                     |
| `installmentsClasses`                     | `Object`   | CSS classes to be applied in the Installments Component    |
| `installments.Value`                      | `Number!`  | Installment price                                          |
| `installments.InterestRate`               | `Number!`  | Installment interest rate (zero if interest-free)          |
| `installments.TotalValuePlusInterestRate` | `Number`   | Calculated total value                                     |
| `installments.NumberOfInstallments`       | `Number!`  | Number of installments                                     |
| `installments.Name`                       | `String`   | Installment offer name                                     |

See an example at [Product Summary](https://github.com/vtex-apps/product-summary) app
