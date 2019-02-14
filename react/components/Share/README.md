# Share

## Description

`Share` is a VTEX component that allows to share a product url via social medias.
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

Then, add `share` block into your app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json). 

### Blocks API

When implementing this component as a block, various inner blocks may be available. The following interface lists the available blocks within `Share` and describes if they are required or optional.

```json
  "share": {
    "component": "Share"
  }
```

For now this block does not have any required or optional blocks.

#### Configuration

Through the Storefront, you can change the `Share`'s behavior and interface. However, you also can make in your theme app, as Store theme does. However, you also can make in your theme app, as Store theme does.

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `className` | `String` | The main container classes | null |
| `shareLabelClass` | `String` | The share label classes | true |
| `buttonsContainerClass` | `String` | The button container classes | true |
| `options` | `Object` | Share button options, like "size" | {} |
| `social` | `Object` | The possible social medias to be displayed | {Facebook: true, Twitter: true, WhatsApp: true} |

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
You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces
Below, we describe the namespace that are defined in the `Share`.

| Class name | Description | Component Source |
| ---------- | ----------- | ---------------- |
| `shareContainer` | The main container of `Share` | [index](/react/components/Share/index.js) |
| `shareLoader` | The share loader | [index](/react/components/Share/index.js) |
| `shareLabel` | The share label | [index](/react/components/Share/index.js) | 
| `shareButtons` | The main container of social media buttons | [index](/react/components/Share/index.js) |
| `shareSocialButton` | The share social media button | [index](/react/components/Share/components/SocialButton.js) | 
| `shareSocialIcon` | The share social media icon | [index](/react/components/Share/components/SocialButton.js) |