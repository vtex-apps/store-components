📢 Use this project, [contribute](https://github.com/vtex-apps/store-components) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Back To Top Button

`back-to-top-button` is a store block exported by the Store Components app that redirects users to the top of the page when clicked on.

![image](https://user-images.githubusercontent.com/28419764/77644893-9238af80-6f40-11ea-8ceb-7355d0c12686.png)

_Back To Top Button rendered as a text button_

![image](https://user-images.githubusercontent.com/28419764/79279983-a60f6b80-7e85-11ea-9a8d-48abd655e559.png)

_Back To Top Button rendered as a caret icon_

## Configuration

1. Add the `vtex.store-component` app to your theme's dependencies in the manifest.json;

```json
 "dependencies: {
    "vtex.store-components": "3.x"
  }
```

2. Add the `back-to-top-button` block into a store template of your choosing. In the example, it will be added to the home page:

```diff
  "store.home": {
    "blocks": [
+     "back-to-top-button",
    ]
  },
```

3. Then, declare the `back-to-top-button` block using its props stated in the table below. For example:

```diff
  "store.home": {
    "blocks": [
     "back-to-top-button",
    ]
  },
+  "back-to-top-button":{
+    "props":{
+      "displayThreshold": 800,
+    }
+  }
```

| Prop name          | Type     | Description                                                                                                                                                 | Default Value |
| ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `displayThreshold` | `number` | Defines the window Y pixel in which the button will be displayed.                                                                                           | `600`         |
| `display`          | `enum`   | Defines the component rendering. Possible values are: `button` to display a button with a `Back To Top` label text or `caret-icon` to display just an icon. | `button`      |

### Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles                |
| -------------------------- |
| `backToTopButtonContainer` |
| `backToTopButtonHidden`    |
| `backToTopButtonActive`    |
