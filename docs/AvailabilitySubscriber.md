# Availability Subscriber

## Description

`AvailabilitySubscriber` is a VTEX Component that shows the availability subscriber form that is shown when the product isn't available. This Component can be imported and used by any VTEX App.

**Attention:**
This component only **creates a list** of the users that subscribe to this product. Currently it **doesn't send an automatic email** to these users when the product becomes available. It only collects the emails of the users that show interest on the products.


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

In order to collect the emails correctly, this feature needs a special configurantion on **Master Data** as it is detailed below:

The form is submitted to Master Data on the Entity: `AS`

| Prop name | Type | Description|
| ------| ------ | ------ |
| `skuId`            | String | The id of the product sku to which will be watched for changes in the product quantity |
| `name`             | String | The name of the user                                                                   |
| `email`            | String | The email of the user                                                                 |
| `notificationSend` | Boolean | If the notification has been sent already                                              |
| `createdAt`        | String - ISO format | When the document was created  Ex.: ISO (2011-10-05T14:48:00.000Z)                                                     |
| `sendAt`           | String - ISO format | When the user was notificated  Ex.: ISO (2011-10-05T14:48:00.000Z)                                                        |


### Blocks API

When implementing this component as a block, various inner blocks may be available. The following interface lists the available blocks within `AvailabilitySubscriber` and describes if they are required or optional.

```json
  "availability-subscriber": {
    "component": "AvailabilitySubscriber"
  }
```

For now this block does not have any required or optional blocks.

### Configuration

:construction: :construction: :construction:

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