📢 Use this project, [contribute](https://github.com/vtex-apps/store-components) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion). 

# Product Brand

The `ProductBrand` is a VTEX block that displays either the **name** or the **logo** of a **product's brand**.

![product-brand](https://user-images.githubusercontent.com/52087100/70259346-bb081f80-176c-11ea-84db-5785c45829ce.png)


## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json`, for example:

```json
  "dependencies: {
    "vtex.store-components": "2.x"
  }
```

2. Add the `product-brand` block to any block below `store.product`(Product template). For example:


```json
  "store.product": {
    "children": [
      "flex-layout.row#product",
    ]
  },
  "flex-layout.row#product": {
    "children": [
      "product-brand"
    ]
  },
  "product-brand": {
    "props": {
      "displayMode": "text"
    }
  },
```


### Configuration

| Prop name | Type | Description | Default value 
| --- | --- | --- | --- |
| `displayMode` | `String` | You should choose between `logo` or `text`. This will define if the product brand will be displayed by name or logo. | `logo` |
| `fallbackToText` | `Boolean` |  This prop should only be used when `displayMode` is set to `logo`. It defines what should be done when the Product Brand was set to display a brand logo but no image was registered in the VTEX admin's Catalog. This prop is set as `true` by default, allowing the logo to be replaced with the brand name in those scenarios. When set as `false`, the store will not show the brand name instead of the brand logo. | `true` |
| `height` | `Number` | It sets the logo height. It should only be used when `displayMode` is set to `logo`. | `100` |
| `excludeBrands` | `Array` | The brand names or brand IDs listed in the array will never be displayed by the Brand component. It is usually useful to hide default or test brand names/logos on the store front. | `undefined` |
| `logoWithLink` | `boolean` | ![https://img.shields.io/badge/-Deprecated-red](https://img.shields.io/badge/-Deprecated-red) Use withLink instead | `false` |
| `withLink` | `none | logo | text | logoAndText` | In which cases the brand will have a link that leads to the store's brand page. | `none` |
| `brandName` | `String` | The brand name. If this value is not passed, it will be obtained through the product context. | `undefined` |
| `brandId` | `Number` | The brand id. If this value is not passed, it will be obtained through the product context. | `undefined` |

## Customization 

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `productBrandContainer` |
| `productBrandName` |
| `productBrandLogo` |
| `productBrandLogoWrapper` |
| `productBrandLogoLink` |
| `productBrandNameLink` |
| `productBrandLogoSpacer` |
| `productBrandNameSpacer` |
