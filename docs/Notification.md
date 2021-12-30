>📢 **Disclaimer** Don't fork this project. Use it, [contribute](https://github.com/vtex-apps/store-components) to it or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion) to help us evolve it.

# Notification

The `notification` component displays text content in a bar style (`notification.bar`) or inline (`notification.inline`). This Component can be imported and used by any VTEX app.

![notification-bar](https://user-images.githubusercontent.com/67270558/147773765-0a7f00d6-69ce-44fa-98fc-4b1824faa2bf.png)
## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json` file as in the following example:

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `notification` block to any template of your choice. For example:

```diff
  "store.home": {
      "blocks": [
+       "notification.bar",
        "carousel#home",
        "shelf#home"
      ]
    },
```

3. Then, declare the `notification` block using the props stated in the [Props](#props) table.

### Props

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `content` | `String` | Text to be used in the bar. | '' |
| `classes` | `CustomCSSClasses` | Overrides default CSS handles. To better understand how this prop works, check [this document](https://github.com/vtex-apps/css-handles#usecustomclasses). Note that this is only helpful if you're using this block as a React component.| `undefined` |

## Customization

To apply CSS customizations in this and other blocks, follow the [Using CSS handles for store customization](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-using-css-handles-for-store-customization) guide.

| CSS Handles                     |
| ------------------------------- |
| `notificationBarContainer` | 
| `notificationBarInner` |
| `notificationContent` | 