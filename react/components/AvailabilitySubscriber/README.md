# Availability Subscriber

## Description

`AvailabilitySubscriber` is a VTEX Component that shows the availability subscriber form that is shown when the product isn't available. This Component can be imported and used by any VTEX App.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespace](#css-namespaces)
- [Data](#data)

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

Then, add `availability-subscriber` block into your app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json). 

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

You should follow the Styles API instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#styles-api).

#### CSS Namespaces

Below, we describe the namespace that are defined in the `AvailabilitySubscriber`.

| Class name | Description | Component Source |
| ---------- | ----------- |----------------- |
| `subscriberContainer` | `AvailabilitySubscriber` container | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) |
| `title` | `AvailabilitySubscriber` title | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) |
| `subscribeLabel` | `AvailabilitySubscriber` subscribe label | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) |
| `form` | `AvailabilitySubscriber` form container | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) |
| `content` | `AvailabilitySubscriber` form content container | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) |
| `input` | `AvailabilitySubscriber` form input containter | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) |
| `inputName` | `AvailabilitySubscriber` form input name | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) |
| `inputEmail` | `AvailabilitySubscriber` form input email | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) |
| `submit` | `AvailabilitySubscriber` form submit button | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) |
| `success` | `AvailabilitySubscriber` success feedback message | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) |
| `error` | `AvailabilitySubscriber` error feedback message | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) |

## Data

The form is submitted to Master Data on the Entity: `AS`

| Prop name          | Description                                                                            |
| ------------------ | -------------------------------------------------------------------------------------- |
| `skuId`            | The id of the product sku to which will be watched for changes in the product quantity |
| `name`             | The name of the user                                                                   |
| `email`            | The email of the user                                                                 |
| `notificationSend` | If the notification has been sent already                                              |
| `createdAt`        | When the document was created                                                          |
| `sendAt`           | When the user was notificated                                                          |
