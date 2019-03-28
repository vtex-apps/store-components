# Info Card

## Description

`NotificationBar` is a VTEX component allows you to display a text content in a bar style banner.
This Component can be imported and used by any VTEX app.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](/README.md#usage).

`notification-bar` is a block allowed in the [store] interface(https://github.com/vtex-apps/store).

You can use it by adding it to the blocks of your store sections, for example:
```json
"store.home": {
    "blocks": [
      "notification-bar",
      "carousel#home",
      "shelf#home"
    ]
  },
```

### Blocks API

When implementing this component as a block, various inner blocks may be available.
For now this block does not have any required or optional blocks.

#### Configuration

Through the Storefront, you can change the `NotificationBar`'s behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `context` | `String` | Text to be used in the bar | '' |

### Styles API
You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces
Below, we describe the namespace that are defined in the `NotificationBar`.

| Class name | Description | Component Source |
| ---------- | ----------- | ---------------- |
| `notificationBarContainer` | The main container of `NotificationBar` | [index](/react/components/NotificationBar/index.js) |
| `notificationBarContent` | The content container | [index](/react/components/NotificationBar/index.js) |
