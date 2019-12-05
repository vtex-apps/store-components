📢 Don't fork this project. Use, [contribute](https://github.com/vtex-apps/awesome-io#contributing), or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Image

`Image` is a VTEX component that allow to add any image on the store. This component can be imported and used by any VTEX App.

![image](https://user-images.githubusercontent.com/284515/70230392-f982e780-1736-11ea-921b-e83208e80620.png)

## Configuration

1. Import the vtex.store-component's app to your theme's dependencies in the manifest.json, for example:

```json
  dependencies: {
    "vtex.store-components": "3.x"
  }
```

2. Add the image block. For example:

```json
  "image#example": {
    "props": {
      "src": "https://storecomponents.vteximg.com.br/arquivos/box.png",
      "maxHeight": "24px"
    }
  },
```

| Prop name     | Type       | Description                                                                |
| ------------- | ---------- | -------------------------------------------------------------------------- |
| `src`         | `String!`  | Specifies the URL of an image                                              |
| `alt`         | `String`   | Specifies an alternate text for an image                                   |
| `maxWidth`    | `String`   | Specifies the max width of an image                                        |
| `maxHeight`   | `String`   | Specifies the max height of an image                                       |
| `srcset`      | `String`   | Specifies the URL of the image to use in different situations              |
| `sizes`       | `String`   | Specifies image sizes for different page layouts                           |
| `link`        | [`Link`](https://github.com/vtex-apps/native-types/blob/f63aeeb8f6e62f4a9aaec052a8be34973be7389b/pages/contentSchemas.json#L52-L74)| Specifies the link the image will redirect when clicked on                 |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `imageElement` |
