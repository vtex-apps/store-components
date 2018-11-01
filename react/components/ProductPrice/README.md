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
  listPrice={commertialOffer.ListPrice}
  sellingPrice={commertialOffer.Price}
  installments={commertialOffer.Installments}
  showListPrice={showListPrice}
  showInstallments={showInstallments}
/>
```

| Prop name | Type | Description |
| --- | --- | --- |
| `sellingPrice` | `Number` | Product selling price |
| `listPrice` | `Number` | Product list price |
| `showListPrice` | `Boolean!` | Set visibility of list price |
| `showInstallments` | `Boolean!` | Set visibility of installments |
| `showSavings` | `Boolean` | Set visibility of savings |
| `installments` | `Array` | Available installments |
| `installments.Value` | `Number!` | Installment price |
| `installments.InterestRate` | `Number!` | Installment interest rate (zero if interest-free) |
| `installments.TotalValuePlusInterestRate` | `Number` | Calculated total value |
| `installments.NumberOfInstallments` | `Number!` | Number of installments |
| `installments.Name` | `String` | Installment offer name |

See an example at [Product Summary](https://github.com/vtex-apps/product-summary/blob/master/react/ProductSummary.js#L84) app
