# Notification

## Description

`Notification` is a VTEX component allows you to display a text content in a bar style or inline.
This Component can be imported and used by any VTEX app.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](/README.md#usage).

`notification.bar` and `notification.inline` is a block allowed in the [store] interface(https://github.com/vtex-apps/store).

You can use it by adding it to the blocks of your store sections, for example:
```json
"store.home": {
    "blocks": [
      "notification.bar",
      "carousel#home",
      "shelf#home"
    ]
  },
```

### Blocks API

When implementing this component as a block, various inner blocks may be available.
For now this block does not have any required or optional blocks.

#### Configuration

Through the Storefront, you can change the `Notification`'s behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `content` | `String` | Text to be used in the bar. | '' |

### Styles API
You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces
Below, we describe the namespace that are defined in the `Notification`.

| Class name | Description | Component Source |
| ---------- | ----------- | ---------------- |
| `notificationContent` | The content of `Notification` | [index](/react/components/Notification/notificationContent.js) |
| `notificationBarContainer` | The main container of `NotificationBar` | [index](/react/components/Notification/notificationBar.js) |
| `notificationBarInner` | The inner container of `NotificationBar` | [index](/react/components/Notification/notificationBar.js) |
