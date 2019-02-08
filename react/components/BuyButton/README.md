# BuyButton
BuyButton is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import BuyButton from 'vtex.store-components/BuyButton'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<BuyButton />`. 
```jsx
<BuyButton skuItems={[{ skuId: '1', quantity: 1, seller: 1 }]}> 
  Buy!
</BuyButton>
```

| Prop name          | Type                    | Description                                                                 |
| ------------------ | ----------------------- | --------------------------------------------------------------------------- |
| `skuItems`         | `Array<SkuItem>!`       | SKU Items to be added to the cart |
| `isOneClickBuy`    | `Boolean`               | Should redirect to the checkout page or not |
| `large`            | `Boolean`               | Sets button to large style, filling whole width (like a `block`) |
| `available`        | `Boolean`               | If component is available or not |
| `showToast`        | `Boolean`               | If toast with feedback should be shown after add item request is processed |
| `onAddStart`       | `Function: () => void`  | Function called before add item request starts |
| `onAddFinish`      | `Function: () => void`  | Function called after add item request ends |

#### SKU Items Props

| Prop name          | Type                 | Description                                                                 |
| ------------------ | -------------------- | --------------------------------------------------------------------------- |
| `skuId`            | `String!`            | Specification of which product will be added to the cart |
| `quantity`         | `Number!`            | Quantity of the product sku to be added to the cart |
| `seller`           | `Number!`            | Which seller is being referenced by the button  |
| `name`             | `String!`            | Product name |
| `price`            | `Number!`            | Product price |
| `brand`            | `String!`            | Product brand |
| `variant`          | `String`             | Product variant |
| `options`          | `Array<OptionType>`  | Items to be added as assembly options of this parent product |

#### OptionType
| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `id`               | `String!`  | Id of assembly option |
| `quantity`         | `Number!`  | Quantity of assembly option to be added |
| `assemblyId`       | `String!`  | parentAssemblyBinding of assembly option |
| `seller`           | `String!`  | seller of assembly option |
