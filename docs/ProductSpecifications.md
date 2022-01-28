>📢 **Disclaimer** Don't fork this project. Use it, [contribute](https://github.com/vtex-apps/store-components) to it or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion) to help us evolve it.

# Product Specifications

![https://img.shields.io/badge/-Deprecated-red](https://img.shields.io/badge/-Deprecated-red)

> ⚠️ Warning
>
> **The Product Specifications block has been deprecated in favor of the [Product Specifications app](https://developers.vtex.com/vtex-developer-docs/docs/vtex-product-specifications/).** Although support for this block is still granted, we strongly recommend you to update your store theme with the Product Specification's blocks in order to keep up with the component's evolution.

The `product-specifications` block shows the technical [specifications](https://help.vtex.com/tutorial/what-are-fields-or-specifications--2lB4AgibEseceMggKE2k2m) of a product.

![Product Specifications](https://user-images.githubusercontent.com/27777263/71525823-4bd8a380-28b2-11ea-8d5c-7678426ec1ab.png)

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json` file as in the following example:

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `product-specifications` block to any child of the `store.product` template (Product Details Page template). For example:

```diff
  "store.product": {
    "children": [
      "flex-layout.row#product",
    ]
  },
  "flex-layout.row#product": {
    "children": [
+     "product-specifications#product"
    ]
  },
```

3. Then, declare the `product-specifications` block using the props stated in the [Props](#props) table. For example:

```json  
   "product-specifications#product": {
    "props": {
      "shoudCollapseOnTabChange": true,
      "collapsible": "desktopOnly"
    }
  },
```

### Props

| Prop name                | Type                                                       | Description                                                                                                            | Default value |
| ------------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------- |
| `collapsible`              | `mobileOnly`&#124;`desktopOnly`&#124;`always`&#124;`never` | Defines when the content of the specifications should be collapsed.                                                   | `always`      |
| `hiddenSpecifications`     | `String[]`                                                 | Name of the specifications to be hidden.                                                                          | `[]`          |
| `shouldCollapseOnTabChange` | `Boolean`                                                  | If it should collapse if you change the tab.                                                                            | `false`       |
| `showSpecificationsTab`    | `Boolean`                                                  | Shows the component in the tabs mode if `true`.                                                                | `false`       |
| `visibleSpecifications`    | `String[]`                                                 | Name of the specifications to be presented. Only provide one of `hiddenSpecifications` or `visibleSpecifications`. | `[]`          |

## Customization

To apply CSS customizations in this and other blocks, follow the [Using CSS handles for store customization](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-using-css-handles-for-store-customization) guide.

| CSS Handles                               |
| ----------------------------------------- |
| `specificationItemProperty[data-specification="{specificationName}"]` |
| `specificationItemSpecifications`         |
| `specificationsTab`                       |
| `specificationsTable`                     |
| `specificationsTableBody`                 |
| `specificationsTableContainer`            |
| `specificationsTableHead`                 |
| `specificationsTablePropertyHeading`      |
| `specificationsTableSpecificationHeading` |
| `specificationsTableRow`                  |
| `specificationsTabsContainer`             |
| `specificationsTitle`                     |