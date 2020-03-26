📢 Use this project, [contribute](https://github.com/vtex-apps/store-components) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Go Top Button

`GoTopButton` is a store block that redirects users to the top of the page when clicked on. This Component can be imported and used by any VTEX app.

![image](https://user-images.githubusercontent.com/28419764/77644893-9238af80-6f40-11ea-8ceb-7355d0c12686.png)

## Configuration

1. Import the `vtex.store-component` app to your theme's dependencies in the manifest.json;

```json
 "dependencies: {
    "vtex.store-components": "3.x"
  }
```

2. Add the `go-top-button` block into a store template of your choosing. In the example, it will be added to the home page:

```diff
  "store.home": {
    "blocks": [
+     "go-top-button",
    ]
  },
```

3. Then, declare the go-top-button block using its props stated in the table below:

```diff
  "store.home": {
    "blocks": [
     "go-top-button",
    ]
  },
+  "go-top-button":{
+    "props":{
+      "topPixel": "400"
+    }
+  }
```

| Prop name  | Type      | Description                                  | Default Value |
| ---------- | --------- | -------------------------------------------- | ------------- |
| `topPixel` | `Number!` | Height of the page the button will appear on | -             |

### Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles            |
| ---------------------- |
| `goTopButtonContainer` |
