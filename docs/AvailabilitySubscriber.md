>📢 **Disclaimer** Don't fork this project. Use it, [contribute](https://github.com/vtex-apps/store-components) to it or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion) to help us evolve it.

# Availability Subscriber

The `availability-subscriber` component shows the availability subscriber form displayed when a product isn't available. This component can be imported and used by any VTEX App.

![availability-component](https://user-images.githubusercontent.com/67270558/147770983-16f37aea-ea98-476c-a9aa-a01e1fca24f8.png)

This component only collects the emails of the customers that subscribed to receive updates about a specific out-of-stock product. It does not email shoppers automatically when the product gets back in stock. 

> ℹ️ Info
>
> Alternatively, check the [Availability Notify component](https://developers.vtex.com/vtex-developer-docs/docs/vtex-availability-notify), which renders a subscription form when a product is unavailable and also emails the shopper when the requested product is back in stock.

## Before you start

Before configuring the Availability Subscriber component in your theme, make sure you've already configured a **JSON schema in Master Data** to collect the emails correctly. Otherwise, the subscriber form won't be properly saved with the shoppers' emails. Please refer to the [Creating a product availability form](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-creating-a-product-availability-form) guide for more information.

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json` file as in the following example:

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `availability-subscriber` block as a child of the `store.product` template (Product Details Page template). For example:

```diff
  "store.product": {
    "children": [
+     "availability-subscriber”
    ]
  }
```

The Availability Subscriber component does not have any props. Hence, once added to your Product Details Page template, the Availability Subscriber component is ready for use.        

### Blocks API

When implementing this component as a block, various inner blocks may be available. The following interface lists the blocks available within `AvailabilitySubscriber` and describes if they are mandatory or optional.

```json
  "availability-subscriber": {
    "component": "AvailabilitySubscriber"
  }
```

For now this block does not have any mandatory or optional blocks.

## Customization

To apply CSS customizations in this and other blocks, follow the [Using CSS handles for store customization](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-using-css-handles-for-store-customization) guide.

| CSS Handles | 
| ---------- | 
| `content` |
| `error` | 
| `form` | 
| `input` |
| `inputEmail` |
| `inputName` | 
| `submit` | 
| `subscriberContainer` |
| `subscribeLabel` |
| `success` |
| `title` |