📢 Use this project, [contribute](https://github.com/vtex-apps/store-components) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion). 

# Product SKU Attributes

The `ProductSKUAttributes` is a block responsible for **displaying a list of the currrent SKU variations** for the product.
![image](https://user-images.githubusercontent.com/24723/93642867-358ced80-f9d5-11ea-9dad-a5286eb04efd.png)

## Configuration

1. Add the `vtex.store-components` app to your theme's dependencies in the `manifest.json` file:

```diff
  "dependencies: {
+   "vtex.store-components": "3.x"
  }

2. Add the `product-sku-attributes` block to any block in the `store.product` template (Product Details Page template). For example:

```json
  "store.product": {
    "children": [
      "flex-layout.row#product",
    ]
  },
  "flex-layout.row#product": {
    "children": [
      "product-sku-attributes"
    ]
  },
```

| Prop name | Type | Description | Default value |
| --- | --- | --- | ---| 
| `classes` | `CustomCSSClasses` | Used to override default CSS handles. To better understand how this prop works, we recommend reading about it [here](https://github.com/vtex-apps/css-handles#usecustomclasses). Note that this is only useful if you're using this block as a React component. | `undefined` |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `attributeLine` |
| `attributeName` |
| `attributeValue` |
| `ProductSKUAttributesContainer` |
