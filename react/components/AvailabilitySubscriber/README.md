# Availability Subscriber

## Description

`AvailabilitySubscriber` is a VTEX Component that shows the availability subscriber form that is shown when the product isn't available. This Component can be imported and used by any VTEX App.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
  - [Configuration](#configuration)
  - [Styles API](#styles-api)
- [Data](#data)

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

Then, add `availability-subscriber` block into your app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json). 

### Blocks API

This component has an interface that describes which rules must be implemented by a block when you want to use the `AvailabilitySubscriber`.

```json
  "availability-subscriber": {
    "component": "AvailabilitySubscriber"
  }
```

### Configuration

:construction: :construction: :construction:

### Styles API

You should follow the Styles API instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#styles-api).

Below, we describe the tokens, their explanation and the component where it is located.

| Token name | Component | Description |
| ---------- | --------- |------------ |
| `subscriberContainer` | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) | `AvailabilitySubscriber` container |
| `title` | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) | `AvailabilitySubscriber` title |
| `subscribeLabel` | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) | `AvailabilitySubscriber` subscribe label |
| `form` | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) | `AvailabilitySubscriber` form container |
| `content` | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) | `AvailabilitySubscriber` form content container |
| `input` | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) | `AvailabilitySubscriber` form input containter |
| `inputName` | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) | `AvailabilitySubscriber` form input name |
| `inputEmail` | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) | `AvailabilitySubscriber` form input email |
| `submit` | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) | `AvailabilitySubscriber` form submit button |
| `success` | [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) | `AvailabilitySubscriber` success feedback message |
| `error` |  [index](https://github.com/vtex-apps/store-components/blob/master/react/components/AvailabilitySubscriber/index.js) | `AvailabilitySubscriber` error feedback message |

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
