>📢 **Disclaimer** Don't fork this project. Use it, [contribute](https://github.com/vtex-apps/store-components) to it or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion) to help us evolve it. 

# Image

The `image` block renders images in the storefront.

<img src="https://user-images.githubusercontent.com/60782333/197802548-bc9940ae-b9c8-47df-9769-e76155b9219b.png" width="400" />

## Configuration

1. Import the `vtex.store-components` app to your theme dependencies in the `manifest.json` file as in the following example:

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `image` block to any template you choose.
3. Then, declare the `image` block using the props stated in the [Props](#props) table. For example:

```json
  "image#example": {
    "props": {
      "src": "https://storecomponents.vteximg.com.br/arquivos/box.png",
      "maxHeight": 24
    }
  },
```

### Props

| Prop name   | Type                                                                                                                                | Description                                                                                       | Default value |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------- |
| `alt`       | `string`                                                                                                                            | Alternate text for the image.                                                                     | -             |
| `link`      | [`Link`](https://github.com/vtex-apps/native-types/blob/f63aeeb8f6e62f4a9aaec052a8be34973be7389b/pages/contentSchemas.json#L52-L71) | The image hyperlink. For more details on the props of the `link`, please see the following table. | -             |
| `maxHeight` | `string`                                                                                                                            | Maximum height of the image.                                                                      | -             |
| `maxWidth`  | `string`                                                                                                                            | Maximum width of the image.                                                                       | -             |
| `sizes`     | `string`                                                                                                                            | Different image sizes for each page layout.                                                       | -             |
| `src`       | `string`                                                                                                                            | Source URL of the image.                                                                          | -             |
| `srcSet`    | `string`                                                                                                                            | URL of the image to use in different situations.                                                  | -             |
| `title`     | `string`                                                                                                                            | Image title displayed on hover.                                                                   | -             |

- **`link` props:**

| Prop name           | Type      | Description                                                                                                                                | Default value |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `attributeNofollow` | `boolean` | Guides the search engine not to track the link of the page indicated by the tag. If `true`, sets the `rel=noFollow` attribute to the link. | `false`       |
| `newTab`            | `boolean` | If `true` opens a new tab when you click the image.                                                                                        | `false`       |
| `url`               | `string`  | Sets the URL to which the user will be redirected by clicking the image.                                                                   | -             |

## Customization

To apply CSS customizations to this and other blocks, please read the [Using CSS handles for store customization](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization) guide.

| CSS Handles    |
| -------------- |
| `imageElement` |