📢 Use this project, [contribute](https://github.com/vtex-apps/store-components) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Newsletter

![https://img.shields.io/badge/-Deprecated-red](https://img.shields.io/badge/-Deprecated-red)

> :warning: **The Newsletter block has been deprecated in favor of the [Newsletter app](https://vtex.io/docs/components/all/vtex.store-newsletter/).**
> Although support for this block is still granted, we strongly recommend you to update your store theme with the Product Specification's blocks in order to keep up with the component's evolution.

`newsletter` is a block that displays a newsletter form.

## Configuration

1. Add the `vtex.store-component` app to your theme's dependencies in the `manifest.json`;

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `newsletter` block. For example:


```json
  "store.home": {
    "children": [
      "newsletter",
    ]
  },
```

#### Props

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `label` | `String` | Label of the form used by the component | `Subscribe to our newsletter` (translated text) |
| `placeholder` | `String` | Placeholder of the email input | `Enter your email address` (translated text) |
| `submit` | `String` | Label of the submit button | `Sign up` (translated text) |
| `hideLabel` | `Boolean` | Hide label | `false` |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles                     |
| ------------------------------- |
| `newsletter` |
| `container` |
| `form` |
| `inputGroup` |
| `buttonContainer` |
| `label` |
| `error` |
| `confirmation` |
| `confirmationTitle` |
| `confirmationText` |
