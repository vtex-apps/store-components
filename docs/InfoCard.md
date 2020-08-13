📢 Use this project, [contribute](https://github.com/vtex-apps/store-components) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion). 

# Info Card

The `infoCard` block allows you to **display content combining image and text** in your store.

![image](https://user-images.githubusercontent.com/284515/70229574-4239a100-1735-11ea-9e30-00b286e03f7c.png)

## Configuration

1. Import the `vtex.store-component` app to your theme's dependencies in the `manifest.json`;

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `info-card` block in your Home page template. Then, declare it in the same file. For example:

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

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `isFullModeStyle` | `Boolean` | If true, image provided will be used as a background image and text will be displayed over it. | false |
| `textPosition` | `TextPositionEnum` | Choose in which position of the component text will be displayed, left, center or right. | `"left"` |
| `textAlignment` | `TextAlignmentEnum` | Control the text alignment inside component. This prop is ignored if `isFullModeStyle` is true.  | `"left"` |
| `headline` | `String` | Text to be used as headline. If not provided, it will not be rendered. | `null` |
| `subhead` | `String` | Text to be displayed underneath the headline. If not provided, it will not be rendered. | `null` |
| `textMode` | `TextModeEnum` | Chooses which text mode should be used to process the text from `headline` and `subhead` props.   | `"html"` |
| `callToActionMode` | `CallToActionEnum` | Set Call to Action component mode. | `"button"` |
| `callToActionText` | `String` | Text to be displayed inside the CTA component. | `""` |
| `callToActionUrl` | `String` | URL to be redirected when CTA component is clicked. | `""` |
| `callToActionLinkTarget` | `LinkTargetEnum` | Where to display the linked URL when CTA component is clicked.  | `"_self"` |
| `imageUrl` | `String` | URL of the image to be used on desktop. | `""` |
| `mobileImageUrl` | `String` |  URL of the image to be used on mobile. If you do not provide any, the desktop image url will be used. | `null` |
| `blockClass` | `String` | Adds an extra class name to ease styling. | `null` |
| `htmlId` | `String` | Adds an ID to the container element. | `null` |
| `linkTarget` | `LinkTargetEnum` | Where to display the linked URL when `info-card` block is clicked. | `"_self"` |

- Possible values of `TextPositionEnum`:

| Enum name | Enum value | Description |
| --------- | ---- | ----------- |
| Left | 'left' | Text will be to the left. If `isFullModeStyle` is false, image will be on the right |
| Center | 'center' | Text will be in the center. Not applicable if `isFullModeStyle` is false. |
| Right | 'right' | Text will be to the right. If `isFullModeStyle` is false, image will be on the left |

- Possible values of `CallToActionEnum`:

| Enum name | Enum value | Description |
| --------- | ---- | ----------- |
| None | 'none' | Don't render any Call to Action component  |
| Button | 'button' | Call to Action component will be a button |
| Link | 'link' | Call to Action component will be a text in a link format |

- Possible values of `TextAlignmentEnum`:

| Enum name | Enum value | Description |
| --------- | ---- | ----------- |
| Left | 'left' | Text alignment will be to the left. |
| Center | 'center' | Text alignment will be to the center. |
| Right | 'right' | Text alignment will be to the right. |

- Possible values of `TextModeEnum`:

| Enum name | Enum value | Description |
| --------- | ---- | ----------- |
| HTML | 'html' | The InfoCard component will expect to receive HTML text for `headline` and `subhead` props. |
| Rich-Text | 'rich-text' | The InfoCard component will expect to receive Markdown text for `headline` and `subhead` props, and will use the [`rich-text` block](https://github.com/vtex-apps/rich-text) to render both. |

- Possible values of `LinkTargetEnum`:

These values are the same ones supported by HTML5 anchor tags. For more information check its documentation at [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).

| Enum name | Enum value | Description |
| --------- | ---- | ----------- |
| Self (default) | '_self' | Open the link in the current browsing context. |
| Blank | '_blank' | Open the link in a new tab, but users can configure browsers to open a new window instead. |
| Parent | '_parent' | Open the link in the parent browsing context of the current one. If no parent, behaves as `_self`. |
| Top | '_top' | Open the link in the topmost browsing context (the "highest" context that’s an ancestor of the current one). If no ancestors, behaves as `_self`. |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| ---------- |
| `infoCardContainer` |
| `infoCardTextContainer` |
| `infoCardHeadline` |
| `infoCardSubhead` |
| `infoCardCallActionContainer` |
| `infoCardCallActionText` |
| `infoCardImageContainer` |
| `infoCardImage` |
