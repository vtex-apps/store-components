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

## Data

The form is submitted to Master Data on the Entity: `AS`

| Prop name          | Description                                                                            |
| ------------------ | -------------------------------------------------------------------------------------- |
| `skuId`            | The id of the product sku to which will be watched for changes in the product quantity |
| ------------------ | -------------------------------------------------------------------------------------- |
| `name`             | The name of the user                                                                   |
| ------------------ | -------------------------------------------------------------------------------------- |
| `email`            | The e-mail of the user                                                                 |
| ------------------ | -------------------------------------------------------------------------------------- |
| `notificationSend` | If the notification has been sent already                                              |
| ------------------ | -------------------------------------------------------------------------------------- |
| `createdAt`        | When the document was created                                                          |
| ------------------ | -------------------------------------------------------------------------------------- |
| `sendAt`           | When the user was notificated                                                          |
