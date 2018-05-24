# Quantity Selector
Quantity Selector is a canonical component that any VTEX app can import.

And to import it into your code: 
```js
import QuantitySelector from 'vtex.storecomponents/QuantitySelector'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<QuantitySelector />`. 
```html
<QuantitySelector
    maxQuantity={5}
    currentQuantity={1}
/>
```

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `maxQuantity`      | `Number!`  | Product's maximum quantity that the client can buy                          |
| `currentQuantity`  | `Number!`  | Current quantity to be setted as the initial value                          |
| `onQuantityChange` | `Func!`    | Called when the client set the quantity selector                            |
| `onMaxReached`     | `Func!`    | Define if can buy more items than the maximum limit                         |

_TODO - Add when an app use it. @brunojdo_ 
See an example at ... app
