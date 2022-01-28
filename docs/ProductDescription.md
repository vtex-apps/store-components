📢 **Disclaimer:** Don't fork this project. Use this project, [contribute](https://github.com/vtex-apps/store-components) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Description

The `product-description` block displays the description of a product. This Component can be imported and used by any VTEX App.

![product-description-ui](https://user-images.githubusercontent.com/67270558/147771999-64d529ab-ef49-4cb3-a592-8f54bcbbeac2.png)
## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json` file as in the following example:

```json
  "dependencies": {
    "vtex.store-components": "2.x"
  }
```

2. Add the `product-description` block to any child of the `store.product` template (Product Details Page template). For example:

```diff
  "store.product": {
    "children": [
      "flex-layout.row#product",
    ]
  },
  "flex-layout.row#product": {
    "children": [
+     "product-description"
    ]
  }
```

3. Then, declare the `product-description` block using the props stated in the [Props](#props) table.

### Props

| Prop name         | Type      | Description                                                                                                                                                                          | Default     |
| ----------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `classes` | `CustomCSSClasses` | Overrides default CSS handles. To better understand how this prop works, check [this document](https://github.com/vtex-apps/css-handles#usecustomclasses). Note that this is only helpful if you're using this block as a React component.| `undefined` |
| `collapseContent` | `Boolean` | If `true`, whenever the product description is too big, it will collapse and show a "Show More" button. When false, it will never collapse and will always show the whole description. | `true` |
| `showTitle`           | `boolean`  | Define whether or not to show the title. | `true` |
| `title`           | `string`  | Defines a custom title for the description section. | `undefined` |

## Customization

To apply CSS customizations in this and other blocks, follow the [Using CSS handles for store customization](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-using-css-handles-for-store-customization) guide.

| CSS Handles                   |
| ----------------------------- |
| `productDescriptionContainer` |
| `productDescriptionText`      |
| `productDescriptionTitle`     |
