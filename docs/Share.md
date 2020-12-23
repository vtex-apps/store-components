📢 Use this project, [contribute](https://github.com/vtex-apps/store-components) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion). 

# Share

The `share` is a block that allows to share a product URL via social medias.

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json`, for example:

```json
  "dependencies: {
    "vtex.store-components": "3.x"
  }
```

2. Add the `share` block to any block below `store.product` (Product template). For example:

```json
  "store.product": {
    "children": [
      "flex-layout.row#product",
    ]
  },
  "flex-layout.row#product": {
    "children": [
      "share"
    ]
  },
  "share": {
    "props": {
      "social": {
        "Facebook": true,
        "Twitter": true,
        "WhatsApp": true,
      }
    }
  },
```

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `options` | `Options` | Share button options, like `size` | {} |
| `social` | `Social` | The possible social medias to be displayed | `{Facebook: true, Twitter: true, WhatsApp: true, Pinterest: true}` |
| `imageUrl` | `String` | Image url to share in social medias |

Options:

| Prop name | Type | Description |
| --------- | ---- | ----------- | 
| `size` | `Number` | The size of the share button in pixels |

Social:

| Prop name | Type | Description |
| --------- | ---- | ----------- |
| `Facebook` | `Boolean` | Whether Facebook will be shown |
| `Twitter` | `Boolean` | Whether Twitter will be shown |
| `WhatsApp` | `Boolean` | Whether WhatsApp will be shown |
| `Pinterest` | `Boolean` | Whether Pinterest will be shown |
| `Telegram` | `Boolean` | Whether Telegram will be shown |
| `E-mail` | `Boolean` | Whether E-mail will be shown |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `shareContainer` |
| `shareLoader` |
| `shareLabel` |
| `shareButtons` |
| `shareSocialButton` |
| `shareSocialIcon` |
