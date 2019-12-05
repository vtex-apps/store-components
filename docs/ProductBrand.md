📢 Don't fork this project. Use, [contribute](https://github.com/vtex-apps/awesome-io#contributing), or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Brand

The `ProductBrand` is a VTEX block that displays either the **name** or the **logo** of a **product's brand**.

## Configuration

1. Import the `vtex.product-summary` app to your theme's dependencies in the `manifest.json`, for example:

```json
  dependencies: {
    "vtex.product-summary": "2.x"
  }
```

2. Add the `product-brand` block to any block below `store.product`(Product template). For example:


```json
{
  "product-details": {
    "blocks": [
      "breadcrumb",
      "product-name",
+     "product-brand",
      "product-images",
      "product-price",
      "product-description",
      "buy-button",
      "sku-selector",
      "shipping-simulator",
      "availability-subscriber",
      "share",
      "product-specifications",
      "product-highlights"
    ]
  }
}
```


### Configuration

| Prop name | Type | Description |
| --- | --- | --- |
| `displayMode` | `String` | You should choose between `logo` or `text`. This will define if the product brand will be displayed by name or logo. |
| `fallbackToText` | `Boolean` |  This prop should only be used when `displayMode` is set to `logo`. It defines what should be done when the Product Brand was set to display a brand logo but no image was registered in the VTEX admin's Catalog. This prop is set as `true` by default, allowing the logo to be replaced with the brand name in those scenarios. When set as `false`, the store will not show the brand name instead of the brand logo. |
| `height` | `Number` | It sets the logo height. It should only be used when `displayMode` is set to `logo`. |
| `excludeBrands` | `Array` | The brand names or brand IDs listed in the array will never be displayed by the Brand component. It is usually useful to hide default or test brand names/logos on the store front. |
| `logoWithLink` | `boolean` | If the brand logo will have a link that leads to the store's brand page (`true`) ou not (`false`) |
| `brandName` | `String` | The brand name. If this value is not passed, it will be obtained through the product context. |
| `brandId` | `Number` | The brand id. If this value is not passed, it will be obtained through the product context. |

## Customization 

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).
