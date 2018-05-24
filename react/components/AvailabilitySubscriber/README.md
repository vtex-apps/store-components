# Availability Subscriber

`AvailabilitySubscriber` is a canonical component that any VTEX app can import.

And to import it into your code:

```jsx
import AvailabilitySubscriber from 'vtex.storecomponents/AvailabilitySubscriber'
```

## Usage

You can use it in your code as the following

```jsx
<AvailabilitySubscriber skuId={skuId} />
```

| Prop name | Type      | Description                                                                            |
| --------- | --------- | -------------------------------------------------------------------------------------- |
| `skuId`   | `Number!` | The id of the product sku to which will be watched for changes in the product quantity |

