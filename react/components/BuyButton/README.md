# BuyButton
BuyButton is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import BuyButton from 'vtex.store-components/BuyButton'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<BuyButton />`. 
```html
<BuyButton skuItems={[{ id: '1', quantity: 1, seller: 1 }]}> 
  Buy!
</BuyButton>
```

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `skuItems`         | `Array!`   | SKU Items to be added to the cart                                           |
| `message`          | `Node!`    | Component children that will be displayed inside of the button              |
| `quantity`         | `Number`   | Quantity of the product sku to be added to the cart                         |
| `seller`           | `Number`   | Which seller is being referenced by the button                              |
| `isOneClickBuy`    | `Boolean`  | Should redirect to the checkout page or not                                 |
| `intl`             | `Object`   | Internationalization property to format text                                |

#### SKU Items Props

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `skuId`            | `String!`  | Specification of which product will be added to the cart                    |
| `quantity`         | `Number!`  | Quantity of the product sku to be added to the cart                         |
| `seller`           | `Number!`  | Which seller is being referenced by the button                              |


