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
Every prop that ends with `Class` will be passed to an element of the component, see the following code
```jsx
<ProductPrice
  className="pv4 overflow-hidden"
  listPriceLabelClass="c-muted-4"
  savingsClass="h4 ph5 dib"
  showLabels={showLabels}
  showListPrice={showListPrice}
  showInstallments={showInstallments}
  sellingPrice={commertialOffer.Price}
  listPrice={commertialOffer.ListPrice}
  installments={commertialOffer.Installments}
/>
```

| Prop name | Type | Description |
| --------- | ---- | ----------- |
| `sellingPrice` | `Number` | Product selling price |
| `listPrice` | `Number` | Product list price |
| `showListPrice` | `Boolean!` | Set visibility of list price |
| `showLabels` | `Boolean!` | Set visibility of labels |
| `showInstallments` | `Boolean!` | Set visibility of installments |
| `showSavings` | `Boolean` | Set visibility of savings |
| `installments` | `Array` | Available installments |
| `installments.Value` | `Number!` | Installment price |
| `installments.InterestRate` | `Number!` | Installment interest rate (zero if interest-free) |
| `installments.TotalValuePlusInterestRate` | `Number` | Calculated total value |
| `installments.NumberOfInstallments` | `Number!` | Number of installments |
| `installments.Name` | `String` | Installment offer name |
| `className` | `String` | Classes to be applied to root element |
| `loaderClass` | `String` | Classes to be applied to loader root element |
| `listPriceContainerClass` | `String` | Classes to be applied to container of list price |
| `listPriceLabelClass` | `String` | Classes to be applied to label of price |
| `listPriceClass` | `String` | Classes to be applied to price value |
| `sellingPriceContainerClass` | `String` | Classes to be applied to selling price container |
| `sellingPriceLabelClass` | `String` | Classes to be applied to selling price label |
| `sellingPriceClass` | `String` | Classes to be applied to selling price value |
| `savingsContainerClass` | `String` | Classes to be applied to savings container |
| `savingsClass` | `String` | Classes to be applied to savings |
| `installmentClass` | `String` | Classes to be applied to installment element |
| `installmentContainerClass` | `String` | Classes to be applied to installment container |
| `interestRateClass` | `String` | Classes to be applied to interest rate element |

See an example at [Product Summary](https://github.com/vtex-apps/product-summary) app
