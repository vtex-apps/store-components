📢 Use this project, [contribute](https://github.com/vtex-apps/store-components) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Go Top Button

`GoTopButton` is a component of VTEX that when clicked, goes back to the top of the page. This Component can be imported and used by any VTEX app.

## Configuration

1. Import the `vtex.store-component` app to your theme's dependencies in the manifest.json;

```json
 "dependencies: {
    "vtex.store-components": "3.x"
  }
```

2. Add the `go-top-button` block into your page. Example:

```diff
  "store.home": {
    "blocks": [
+     "go-top-button",
    ]
  },
```

### Configuration

| Prop name  | Type      | Description                                  | Default Value |
| ---------- | --------- | -------------------------------------------- | ------------- |
| `topPixel` | `Number!` | Height of the page the button will appear on | -             |

### Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles            |
| ---------------------- |
| `goTopButtonContainer` |
