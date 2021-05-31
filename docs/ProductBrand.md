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
| `displayMode` | `string` | You should choose between `logo` or `text`. This will define if the product brand will be displayed by name or logo. | `logo` |
| `fallbackToText` | `boolean` |  This prop should only be used when `displayMode` is set to `logo`. It defines what should be done when the Product Brand was set to display a brand logo but no image was registered in the VTEX admin's Catalog. This prop is set as `true` by default, allowing the logo to be replaced with the brand name in those scenarios. When set as `false`, the store will not show the brand name instead of the brand logo. | `true` |
| `loadingPlaceholder` | `string` |  You should choose between `logo` or `text`. This will define if the loading placeholder should have the size of the logo or the text. | `undefined` |
| `height` | `number` | It sets the logo height. It should only be used when `displayMode` is set to `logo`. | `100` |
| `excludeBrands` | `array` | The brand names or brand IDs listed in the array will never be displayed by the Brand component. It is usually useful to hide default or test brand names/logos on the store front. | `undefined` |
| `logoWithLink` | `boolean` | ![https://img.shields.io/badge/-Deprecated-red](https://img.shields.io/badge/-Deprecated-red) Use withLink instead | `false` |
| `withLink` | `enum` | Defines the scenarios in which the product brand should have a link that leads to its website. Possible values are: `none` (never includes the link), `logo` (includes the link whenever the brand logo is displayed), `text` (includes the link whenever the brand name is displayed), and `logoAndText` (includes the link whenever the brand logo or the brand name is displayed).  | `none` |
| `brandName` | `string` | The brand name. If no value is declared, the product context should provide the data. | `undefined` |
| `brandId` | `number` | The brand ID.  If no value is declared, the product context should provide the data. | `undefined` |
| `classes` | `CustomCSSClasses` | Used to override default CSS handles. To better understand how this prop works, we recommend reading about it [here](https://github.com/vtex-apps/css-handles#usecustomclasses). Note that this is only useful if you're using this block as a React component. | `undefined` |

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
