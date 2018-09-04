## Discount Badge
Discount Badge is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import DiscountBadge from 'vtex.store-components/DiscountBadge'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<DiscountBadge />`. 
```jsx
<DiscountBadge listPrice={commertialOffer.ListPrice}
                sellingPrice={commertialOffer.Price}
                label={badgeText}> 
  <img src="" alt="">
</DiscountBadge>
```

And it will render an image with the list of collection badges located at the bottom.

| Prop name              | Type       | Description                                                                 |
| ---------------------- | ---------- | --------------------------------------------------------------------------- |
| `listPrice`            | `Number!`  | Product's default price                                                     |
| `sellingPrice`         | `Number!`  | Product's price with discount                                               |
| `label`                | `String`   | Label to track the discount percent                                         |
| `image`                | `Node`     | Image element where the badge is displayed                                  |

See an example at [Product Summary](https://github.com/vtex-apps/product-summary/blob/master/react/ProductSummary.js#L60) app
