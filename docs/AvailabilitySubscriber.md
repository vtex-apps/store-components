# Availability Subscriber

## Description

`AvailabilitySubscriber` is a VTEX Component that shows the availability subscriber form that is shown when the product isn't available. This Component can be imported and used by any VTEX App.

>⚠️ This component only **creates a list** of the users that subscribe to this product. Currently it **doesn't send an automatic email** to these users when the product becomes available. It only collects the emails of the users that show interest on the products.


:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespace](#css-namespaces)
- [Data](#data)

## Usage

You should follow the usage instruction in the main [README](/README.md#usage).

Then, add `availability-subscriber` block into your app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json). 

To collect the emails correctly, this feature needs a special configuration on **Master Data**. Otherwise, the subscriber form won't be properly saved with user emails. For more info, access the recipe on [Creating a product availability form](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-creating-a-product-availability-form).                  


### Blocks API

When implementing this component as a block, various inner blocks may be available. The following interface lists the available blocks within `AvailabilitySubscriber` and describes if they are required or optional.

```json
  "availability-subscriber": {
    "component": "AvailabilitySubscriber"
  }
```

For now this block does not have any required or optional blocks.

### Configuration

>⚠️ Before configuring the Availability Subscriber block in your theme, make sure you've already configured a **JSON schema in Master Data**, otherwise the subscriber form won't be properly saved with user emails. To more info, access the recipe on [Creating a product availability form](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-creating-a-product-availability-form).

1. Import the  `vtex.store-component` app to your theme's dependencies in the  `manifest.json`;

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

Note the following: the `availability-subscriber` block simply renders a form component highlighting user interest in a particular product. For the collected emails to actually be stored in the store's Master Data, you’ll need to implement some advanced settings in the  Master Data module.


### Styles API

You should follow the Styles API instruction in the main [README](/README.md#styles-api).

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
