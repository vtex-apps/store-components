📢 Don't fork this project. Use, [contribute](https://github.com/vtex-apps/awesome-io#contributing), or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Name

`ProductName` is a VTEX Component that shows the name of the product with other informations such as SKU or brand.
This Component can be imported and used by any VTEX App.

![image](https://user-images.githubusercontent.com/284515/70231165-8f6b4200-1738-11ea-9f06-3583c08fc693.png)

## Configuration

1. Import the vtex.store-component's app to your theme's dependencies in the manifest.json, for example:

```json
  dependencies: {
    "vtex.store-components": "3.x"
  }
```

2. Add the `product-name` block to any block bellow `store.product`. For example:

```json
  "store.product": {
    "children": [
      "flex-layout.row#product",
    ]
  },
  "flex-layout.row#product": {
    "children": [
      "product-name"
    ]
  }
```

| Prop name | Type | Description |
| --- | --- | --- |
| `showSku` | `Boolean` | Show product SKU |
| `showProductReference` | `Boolean` | Show product reference |
| `showBrandName` | `Boolean` | Show brand name |

## Customization

| CSS Handles |
| --- |
| `productNameContainer` |
| `productBrand` |
| `productSku` |
| `productReference` |
| `productNameLoader` |
| `productNameBrandLoader` |
| `productNameSkuLoader` |