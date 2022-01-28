>📢 **Disclaimer** Don't fork this project. Use it, [contribute](https://github.com/vtex-apps/store-components) to it or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion) to help us evolve it.

# Newsletter

![https://img.shields.io/badge/-Deprecated-red](https://img.shields.io/badge/-Deprecated-red)

> ⚠️ Warning
>
> **The Newsletter block has been deprecated in favor of the [Newsletter app](https://developers.vtex.com/vtex-developer-docs/docs/vtex-store-newsletter/).** Although support for this block is still granted, we strongly recommend you to update your store theme with the Product Specification's blocks in order to keep up with the component's evolution.

The `newsletter` block displays a newsletter form.

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json` file as in the following example:

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `newsletter` block to any template of your choice. For example:

```diff
    "store.home": {
      "children": [
+       "newsletter",
      ]
    },
```

3. Then, declare the `newsletter` block using the props stated in the [Props](#props) table.

### Props

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `hideLabel` | `Boolean` | Hide label. | `false` |
| `label` | `String` | Label of the form used by the component. | `Subscribe to our newsletter` (translated text) |
| `placeholder` | `String` | Placeholder of the email input. | `Enter your email address` (translated text) |
| `submit` | `String` | Label of the submit button. | `Sign up` (translated text) |

## Customization

To apply CSS customizations in this and other blocks, follow the [Using CSS handles for store customization](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-using-css-handles-for-store-customization) guide.

| CSS Handles                     |
| ------------------------------- |
| `buttonContainer` |
| `confirmation` |
| `confirmationText` |
| `confirmationTitle` |
| `container` |
| `error` |
| `form` |
| `inputGroup` |
| `label` |
| `newsletter` |
