# Share
>📢 **Disclaimer** Don't fork the [Store Components](https://github.com/vtex-apps/store-components) project. Use, contribute, or open issue with your feature request.

`Share` is a VTEX component that allows to share a product URL via social medias.
This component can be imported and used by any VTEX app.

![share-component](https://user-images.githubusercontent.com/67270558/134995068-62543fb4-f2fe-4f06-b220-658f4b4c7eb1.png)

In the following sections, learn how to configurate the component in your store.

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json`:

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
``` 
2. Add the `share` block to your theme’s product template (`store.product`). For example:


```json
  "store.product": {
    "children": [
      "share"
    ]
  }
```
3. Once you have added the block to your theme’s product template, declare the share component:

```json
  "share": {
    "component": "Share"
  }
```
> ⚠️ Warning
>  
> When implementing this component as a block, various inner blocks may be available. The interface above lists the available blocks within `Share` and describes if they are required or optional.


For now this block does not have any required or optional blocks.

#### Blocks properties

Through the Storefront, you can change the `Share`'s behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `className` | `String` | The main container classes | null |
| `shareLabelClass` | `String` | The share label classes | true |
| `buttonsContainerClass` | `String` | The button container classes | true |
| `options` | `Options` | Share button options, like "size" | {} |
| `social` | `Social` | The possible social medias to be displayed | {Facebook: true, Twitter: true, WhatsApp: true, Pinterest: true} |
| `imageUrl` | `String` | Image url to share in social medias |

Options:

| Prop name | Type | Description |
| --------- | ---- | ----------- | 
| `size` | `Number` | The size of the share button in pixels |

Social:

| Prop name | Type | Description |
| --------- | ---- | ----------- |
| `Facebook` | `Boolean` | If facebook social media will be shown |
| `Twitter` | `Boolean` | If twitter social media will be shown |
| `WhatsApp` | `Boolean` | If whatsApp social media will be shown |

### Styles API
You should follow the Styles API instruction in [Store Components Styles API](https://github.com/vtex-apps/store-components#styles-api).

### Customization
In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| ---------- |
| `shareContainer` | 
| `shareLoader` | 
| `shareLabel` | 
| `shareButtons` |
| `shareSocialButton` | 
| `shareSocialIcon` | 
