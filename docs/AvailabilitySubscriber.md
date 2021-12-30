# Availability Subscriber
:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

>⚠️
>
> This component only creates a list of users who subscribe to this product and *does not send an automatic email* to them. Another alternative is the [VTEX Availability Notify component](https://developers.vtex.com/vtex-developer-docs/docs/vtex-availability-notify) that shows the form when a product is unavailable and sends an email to the shopper when the requested product is back in stock. Please refer to its [technical documentation](https://developers.vtex.com/vtex-developer-docs/docs/vtex-availability-notify) to learn more about the app and implement it in your store.


`AvailabilitySubscriber` is a VTEX Component that shows the availability subscriber form that is shown when the product isn't available. This Component can be imported and used by any VTEX App.

![availability-component](https://user-images.githubusercontent.com/67270558/147770983-16f37aea-ea98-476c-a9aa-a01e1fca24f8.png)

## Before you start

Before configuring the Availability Subscriber block in your theme, make sure you've already configured a **JSON schema in Master Data**, otherwise the subscriber form won't be properly saved with user emails. To more info, access the recipe on [Creating a product availability form](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-creating-a-product-availability-form).

>⚠️
>
> This component only **creates a list** of the users that subscribe to this product. Currently it **doesn't send an automatic email** to these users when the product becomes available. It only collects the emails of the users that show interest on the products.

## Configuration

1. Import the  `vtex.store-component` app to your theme's dependencies in the  `manifest.json`.

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `availability-subscriber` block to your theme’s product template (`store.product`). For example:

```
"store.product": {
    "children": [
      "availability-subscriber”
    ]
}

```

Once the block is added, the component will be rendered without the need for further configurations, since the `availability-subscriber` block does not have any props. 

>ℹ️ Info
>
> To collect the emails correctly, this feature needs a special configuration on **Master Data**. Otherwise, the subscriber form won't be properly saved with user emails. For more info, access the recipe on [Creating a product availability form](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-creating-a-product-availability-form).                  


### Blocks API

When implementing this component as a block, various inner blocks may be available. The following interface lists the available blocks within `AvailabilitySubscriber` and describes if they are required or optional.

```json
  "availability-subscriber": {
    "component": "AvailabilitySubscriber"
  }
```

For now this block does not have any required or optional blocks.


### Styles API

This app provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
  "builders": {
    "styles": "1.x"
  }
```

2. Create a file called `vtex.store-components.css` inside the `styles/css` folder. Add your custom styles:

```css
.container {
  margin-top: 10px;
}
```

#### CSS Namespaces

Below, we describe the namespace that are defined in the `AvailabilitySubscriber`.

| Class name | Description | Component Source |
| ---------- | ----------- |----------------- |
| `subscriberContainer` | `AvailabilitySubscriber` container | [index](/react/components/AvailabilitySubscriber/index.js) |
| `title` | `AvailabilitySubscriber` title | [index](/react/components/AvailabilitySubscriber/index.js) |
| `subscribeLabel` | `AvailabilitySubscriber` subscribe label | [index](/react/components/AvailabilitySubscriber/index.js) |
| `form` | `AvailabilitySubscriber` form container | [index](/react/components/AvailabilitySubscriber/index.js) |
| `content` | `AvailabilitySubscriber` form content container | [index](/react/components/AvailabilitySubscriber/index.js) |
| `input` | `AvailabilitySubscriber` form input containter | [index](/react/components/AvailabilitySubscriber/index.js) |
| `inputName` | `AvailabilitySubscriber` form input name | [index](/react/components/AvailabilitySubscriber/index.js) |
| `inputEmail` | `AvailabilitySubscriber` form input email | [index](/react/components/AvailabilitySubscriber/index.js) |
| `submit` | `AvailabilitySubscriber` form submit button | [index](/react/components/AvailabilitySubscriber/index.js) |
| `success` | `AvailabilitySubscriber` success feedback message | [index](/react/components/AvailabilitySubscriber/index.js) |
| `error` | `AvailabilitySubscriber` error feedback message | [index](/react/components/AvailabilitySubscriber/index.js) |
