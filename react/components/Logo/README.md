# Logo

## Description

`Logo` is a VTEX component that displays a image logo.
This component can be imported and used by any VTEX app.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](/README.md#usage).

Then, add `logo` block into your app theme, as we do in our [Header app](https://github.com/vtex-apps/store-header/blob/master/store/blocks.json). 

### Blocks API

When implementing this component as a block, various inner blocks may be available. The following interface lists the available blocks within `Logo` and describes if they are required or optional.

```json
  "logo": {
    "component": "Logo"
  }
```

For now this block does not have any required or optional blocks.

#### Configuration

Through the Storefront, you can change the `Logo`'s behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `title` | `String!` | The image alt description | `VTEX logo` |
| `color` | `String` | The image fill color | `#F71963` |
| `showLabel` | `Boolean` | Set the label visibility  | true |
| `width` | `Number` | The logo image width | `493` |
| `height` | `Number` | The logo image height | `177` |
| `url` | `String` | The image url | - |

### Styles API
You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces
Below, we describe the namespace that are defined in the `Logo`.

| Class name | Description | Component Source |
| ---------- | ----------- | ---------------- |
| `sizeDesktop` | Image min/max size when in desktop mode | [index](/react/components/Logo/index.js) |
| `sizeMobile` | Image min/max size when in mobile mode | [index](/react/components/Logo/index.js) |
| `logoContainer` | The main container of `Logo` | [index](/react/components/Logo/index.js) | 