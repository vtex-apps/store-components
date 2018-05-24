# Product Price
Product Price is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import ProductPrice from 'vtex.store-components/ProductPrice'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<ProductPrice />`. 
```html
<ProductPrice
    listPrice={commertialOffer.ListPrice}
    sellingPrice={commertialOffer.Price}
    installments={commertialOffer.Installments}
    installmentPrice={commertialOffer.InstallmentPrice}
    showListPrice={showListPrice}
    showLabels={showLabels}
    showInstallments={showInstallments}
/>
```

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `sellingPrice`     | `Number!`  | Product selling price                                                       |
| `listPrice`        | `Number!`  | Product list price                                                          |
| `showListPrice`    | `Boolean!` | Set visibility of list price                                                |
| `showLabels`       | `Boolean!` | Set visibility of labels                                                    |
| `showInstallments` | `Boolean!` | Set visibility of installments                                              |
| `showSavings`      | `Boolean`  | Set visibility of savings                                                   |
| `installments`     | `Number`   | Available number of installments                                            |
| `installmentPrice` | `Number`   | Single installment price                                                    |
| `intl`             | `Object`   | Internationalization property to format data                                |

See an example at [Product Summary](https://github.com/vtex-apps/product-summary/blob/master/react/ProductSummary.js#L84) app
