>📢 **Disclaimer** Don't fork this project. Use it, [contribute](https://github.com/vtex-apps/store-components) to it or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion) to help us evolve it. 

# Logo

The `logo` block displays a logo in the store header.

![logo](https://user-images.githubusercontent.com/52087100/70247921-f1d43a80-1758-11ea-853e-065dfed06c73.png)

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json` file as in the following example:

```json
 "dependencies": {
    "vtex.store-components": "3.x"
  }
 ```
  
2. Add the `logo` block into the [`header`](https://developers.vtex.com/vtex-developer-docs/docs/vtex-store-header/) component. For example:

```diff
  "header.full": {
    "blocks": [
      "login",
      "minicart",
+     "logo",
      "search-bar",
      "menu-link",
      "telemarketing",
      "category-menu"
    ]
  },
```

3. Then, declare the `logo` block using the props stated in the [Props](#props) table. For example:

```json
 "logo": {
    "props": {
      "width": 132,
      "height": 32,
      "mobileWidth": 90,
      "mobileHeight": 32
    }
  }
}

```

### Props

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `classes` | `CustomCSSClasses` | Overrides default CSS handles. To better understand how this prop works, check [this document](https://github.com/vtex-apps/css-handles#usecustomclasses). Note that this is only helpful if you're using this block as a React component.| `undefined` |
| `color` | `String` | The image fill color. | `#F71963` |
| `height` | `Number` | The logo image height. | `177` |
| `href` | `String` | The image hyperlink. | `undefined` |
| `showLabel` | `Boolean` | The label visibility.  | `true` |
| `title` | `String!` | The image alt description. | `VTEX logo` |
| `url` | `String` | The image soure URL. | `undefined` |
| `width` | `Number` | The logo image width. | `493` |

## Customization

To apply CSS customizations in this and other blocks, follow the [Using CSS handles for store customization](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-using-css-handles-for-store-customization) guide.

| CSS Handles | 
| ---------- | 
| `logoContainer` | 
| `logoImage` | 
| `logoLink` | 
| `sizeDesktop` | 
| `sizeMobile` | 