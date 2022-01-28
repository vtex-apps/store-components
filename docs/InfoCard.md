>📢 **Disclaimer** Don't fork this project. Use it, [contribute](https://github.com/vtex-apps/store-components) to it or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion) to help us evolve it. 

# Info Card

The `info-card` block allows you to **display content combining image and text** in your store.

![image](https://user-images.githubusercontent.com/284515/70229574-4239a100-1735-11ea-9e30-00b286e03f7c.png)

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json` file as in the following example:

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `info-card` block in your Home page template. 
3. Then, add the `info-card` block in the same template file using the props stated in the [Props](#props) table. For example:

```json
  "info-card": {
    "props": {
      "id": "info-card-example",
      "isFullModeStyle": false,
      "textPosition": "left",
      "imageUrl": "https://storecomponents.vteximg.com.br/arquivos/banner-infocard2.png",
      "headline": "Clearance Sale",
      "callToActionText": "DISCOVER",
      "callToActionUrl": "/sale/d",
      "blockClass": "info-card-example",
      "textAlignment": "center"
    }
  },
```

### Props

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `blockClass` | `String` | Adds an extra class name to ease styling. | `null` |
| `callToActionLinkTarget` | `LinkTargetEnum` | Where to display the linked URL when CTA component is clicked.  | `"_self"` |
| `callToActionMode` | `CallToActionEnum` | Sets Call to Action component mode. | `"button"` |
| `callToActionText` | `String` | Text to be displayed inside the CTA component. | `""` |
| `callToActionUrl` | `String` | URL to be redirected when CTA component is clicked. | `""` |
| `headline` | `String` | Text to be used as headline. If not provided, it will not be rendered. | `null` |
| `htmlId` | `String` | Adds an ID to the container element. | `null` |
| `imageUrl` | `String` | URL of the image to be used on desktop. | `""` |
| `isFullModeStyle` | `Boolean` | If `true`, the image provided is used as the background image and text is displayed over it. | `false` |
| `linkTarget` | `LinkTargetEnum` | Where to display the linked URL when `info-card` block is clicked. | `"_self"` |
| `mobileImageUrl` | `String` |  URL of the image to be used on mobile. If you do not provide any, the desktop image url will be used. | `null` |
| `subhead` | `String` | Text to be displayed underneath the headline. If not provided, it will not be rendered. | `null` |
| `textAlignment` | `TextAlignmentEnum` | Text alignment inside the component. Possible values are: `left`, `center` or `right`. This prop is ignored if `isFullModeStyle` is true.  | `"left"` |
| `textMode` | `TextModeEnum` | Chooses which text mode should be used to process the text from `headline` and `subhead` props.   | `"html"` |
| `textPosition` | `TextPositionEnum` | Position of the text component: `left`, `center` or `right`. | `"left"` |

#### `TextPositionEnum` possible values

| Enum name | Enum value | Description |
| --------- | ---- | ----------- |
| Left | 'left' | Text will be to the left. If `isFullModeStyle` is false, image will be on the right |
| Center | 'center' | Text will be in the center. Not applicable if `isFullModeStyle` is false. |
| Right | 'right' | Text will be to the right. If `isFullModeStyle` is false, image will be on the left |

#### `CallToActionEnum` possible values

| Enum name | Enum value | Description |
| --------- | ---- | ----------- |
| None | `none` | Don't render any Call to Action component  |
| Button |`button` | Call to Action component will be a button |
| Link | `link` | Call to Action component will be a text in a link format |

#### `LinkTargetEnum` possible values

These values are the same ones supported by HTML5 anchor tags. For more information check its documentation at [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).

| Enum name | Enum value | Description |
| --------- | ---- | ----------- |
| Self (default) | `_self` | Open the link in the current browsing context. |
| Blank | `_blank` | Open the link in a new tab, but users can configure browsers to open a new window instead. |
| Parent | `_parent` | Open the link in the parent browsing context of the current one. If no parent, behaves as `_self`. |
| Top | `_top` | Open the link in the topmost browsing context (the "highest" context that’s an ancestor of the current one). If no ancestors, behaves as `_self`. |

#### `TextModeEnum` possible values

| Enum name | Enum value | Description |
| --------- | ---- | ----------- |
| HTML | `html` | The InfoCard component will expect to receive HTML text for `headline` and `subhead` props. |
| Rich-Text | `rich-text` | The InfoCard component will expect to receive Markdown text for `headline` and `subhead` props, and will use the [`rich-text` block](https://github.com/vtex-apps/rich-text) to render both. |

## Customization

To apply CSS customizations in this and other blocks, follow the [Using CSS handles for store customization](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-using-css-handles-for-store-customization) guide.

| CSS Handles |
| ---------- |
| `infoCardCallActionContainer` |
| `infoCardCallActionText` |
| `infoCardContainer` |
| `infoCardHeadline` |
| `infoCardImage` |
| `infoCardImageContainer` |
| `infoCardImageLinkWrapper` |
| `infoCardSubhead` |
| `infoCardTextContainer` |
