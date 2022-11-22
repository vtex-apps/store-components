>📢 **Disclaimer** Don't fork this project. Use it, [contribute](https://github.com/vtex-apps/store-components) to it or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion) to help us evolve it. 

# Product Name

The `product-name` block is responsible for displaying a product name along with other information about the product, such as the **SKU** or **brand**.

![image](https://user-images.githubusercontent.com/284515/70231165-8f6b4200-1738-11ea-9f06-3583c08fc693.png)

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json` file, as in the following example:

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `product-name` block to any child of the `store.product` template (Product Details Page template). For example:

```diff
  "store.product": {
    "children": [
      "flex-layout.row#product",
    ]
  },
  "flex-layout.row#product": {
    "children": [
+     "product-name"
    ]
  },
```

3. Then, declare the `product-name` block using the props stated in the [Props](#props) table. For example:

```json
  "product-name": {
    "props": {
      "showSku": true,
      "showBrandName": true
    }
  },
```

### Props

| Prop name | Type | Description | Default value |
| --- | --- | --- | ---| 
| `classes` | `CustomCSSClasses` | Overrides default CSS handles. For further information, please refer to [this document](https://github.com/vtex-apps/css-handles#usecustomclasses). Note that this is only helpful if you're using this block as a React component. | `undefined` |
| `displayMode` | `enum` | Displays the product name (`plainText`) or the link to the product page (`linkToProductPage`). | `plainText`| 
| `showBrandName` | `boolean` | Displays the brand name. | `false`| 
| `showProductReference` | `boolean` | Displays the product reference code. | `false`| 
| `showSku` | `boolean` | Displays the SKU value. | `false` |
| `tag` | `string` | Defines the HTML tag of the product container. Possible values are: `div`, `h1`, `h2`, `h3`.  | `div` |

## Customization

To apply CSS customizations in this and other blocks, follow the [Using CSS handles for store customization](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-using-css-handles-for-store-customization) guide.

| CSS Handles |
| --- |
| `productBrand` |
| `productNameBrandLoader` |
| `productNameContainer` |
| `productNameLoader` |
| `productNameSkuLoader` |
| `productReference` |
| `productSku` |
