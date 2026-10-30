> 📢 Don't fork this project. Use it, [contribute](https://github.com/vtex-apps/store-components) to it or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion) to help us evolve it. 

# Info Card

[<i class="fa-brands fa-github"></i> Source code](https://github.com/vtex-apps/store-components/tree/master/react/components/InfoCard)

The `info-card` component groups information on a single topic. It often includes text, an image, and a call-to-action button.

![Info Card with headline, image, and call-to-action button](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-store-components-infocard-0.png)

## Configuration

1. Add the `vtex.store-components` app as a dependency in the `manifest.json` file of your theme, as in the following example:

    ```json
      "dependencies": {
        "vtex.store-components": "3.x"
      }
    ```

2. Add the `info-card` block to the template of the page where you want it, using the props described in the [Props](#props) table. For example:

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
          "textAlignment": "center",
          "fetchpriority": "auto",
          "preload": true
        }
      }
    ```

### Using Markdown text with `textMode`

By default, `textMode` is `"html"`, and the `headline`, `subhead`, and `bodyText` props accept HTML text. To write these texts in Markdown instead, set `textMode` to `"rich-text"`. In this mode, the Info Card passes each text to the [`rich-text` block](https://github.com/vtex-apps/rich-text), which processes the Markdown. You don't need to declare a separate `rich-text` block, since you pass the Markdown directly in the props. For example:

```json
  "info-card#rich-text-example": {
    "props": {
      "isFullModeStyle": false,
      "textPosition": "left",
      "imageUrl": "https://storecomponents.vteximg.com.br/arquivos/banner-infocard2.png",
      "textMode": "rich-text",
      "headline": "# Clearance **Sale**",
      "subhead": "Up to *50% off* on selected items",
      "bodyText": "Check the [terms and conditions](/terms) before buying.",
      "callToActionText": "DISCOVER",
      "callToActionUrl": "/sale/d",
      "blockClass": "info-card-rich-text-example"
    }
  }
```

### Props

The following table lists the props the `info-card` block supports:

| Prop name                | Type                | Description                                                                                                                | Default value |
| ------------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `blockClass`             | `string`            | Extra class name for custom styling.                                                                                       | `null`        |
| `bodyText`               | `string`            | Text displayed below the subhead. If not provided, it isn't rendered.                                                      | `null`        |
| `callToActionLinkTarget` | `LinkTargetEnum`    | Where to display the call-to-action component's linked URL, as the name for a browsing context (a tab, window, or iframe). | `"_self"`     |
| `callToActionMode`       | `CallToActionEnum`  | Mode of the call-to-action component.                                                                                      | `"button"`    |
| `callToActionText`       | `string`            | Text displayed inside the call-to-action component.                                                                        | `""`          |
| `callToActionUrl`        | `string`            | URL of the call-to-action component.                                                                                       | `""`          |
| `fetchpriority`          | `string`            | The fetch priority hint (`high`, `low`, or `auto`).                                                                        | `"auto"`      |
| `headline`               | `string`            | Headline of the Info Card.                                                                                                 | `null`        |
| `htmlId`                 | `string`            | ID of the container element.                                                                                               | `null`        |
| `imageActionUrl`         | `string`            | Redirect URL used when the image component is clicked.                                                                     | `""`          |
| `imageUrl`               | `string`            | Path to the image used on desktop devices.                                                                                 | `""`          |
| `isFullModeStyle`        | `boolean`           | Style of the Info Card component. If `true`, the image component is used as the background, and text is displayed over it. | `false`       |
| `linkTarget`             | `LinkTargetEnum`    | Where to display the linked URL when the Info Card component is clicked.                                                   | `"_self"`     |
| `mobileImageUrl`         | `string`            | Path to the image used on mobile devices. If empty, the desktop image is used.                                             | `null`        |
| `preload`                | `boolean`           | Preloads the first image in a list, prioritizing the image display over other assets.                                      | `false`       |
| `subhead`                | `string`            | Text displayed below the headline. If not provided, it isn't rendered.                                                     | `null`        |
| `textAlignment`          | `TextAlignmentEnum` | Text alignment inside the component: `left`, `center`, or `right`. This prop is ignored if `isFullModeStyle` is `true`.    | `"left"`      |
| `textMode`               | `TextModeEnum`      | Text mode used to process the text from `headline`, `subhead`, and `bodyText` props.                                       | `"html"`      |
| `textPosition`           | `TextPositionEnum`  | Position of the text component: `left`, `center`, or `right`.                                                              | `"left"`      |

#### `TextPositionEnum` possible values

The following table lists the possible values of the `textPosition` prop:

| Enum name | Enum value | Description                                                                                    |
| --------- | ---------- | ---------------------------------------------------------------------------------------------- |
| Left      | `left`     | Positions the text on the left. If `isFullModeStyle` is `false`, the image is on the right.    |
| Center    | `center`   | Positions the text in the center. Not applicable if `isFullModeStyle` is `false`.              |
| Right     | `right`    | Positions the text on the right. If `isFullModeStyle` is `false`, the image is on the left.    |

#### `CallToActionEnum` possible values

The following table lists the possible values of the `callToActionMode` prop:

| Enum name | Enum value | Description                                                      |
| --------- | ---------- | ---------------------------------------------------------------- |
| None      | `none`     | Doesn't render any call-to-action components.                    |
| Button    | `button`   | Renders the call-to-action component as a button.                |
| Link      | `link`     | Renders the call-to-action component as a text link.             |

#### `LinkTargetEnum` possible values

These values are the same as those that HTML5 anchor tags support. For more information, see the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a). The following table lists the possible values:

| Enum name      | Enum value | Description                                                                                                                                                    |
| -------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Self (default) | `_self`    | Opens the link in the current browsing context.                                                                                                                |
| Blank          | `_blank`   | Opens the link in a new tab, but users can configure browsers to open a new window instead.                                                                    |
| Parent         | `_parent`  | Opens the link in the parent browsing context of the current one. If there is no parent, it behaves as `_self`.                                               |
| Top            | `_top`     | Opens the link in the topmost browsing context (the "highest" context that is an ancestor of the current one). If there is no ancestor, it behaves as `_self`. |

#### `TextModeEnum` possible values

The following table lists the possible values of the `textMode` prop:

| Enum name | Enum value  | Description                                                                                                                              |
| --------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| HTML      | `html`      | Uses HTML text for `headline`, `subhead`, and `bodyText` props.                                                                          |
| Rich Text | `rich-text` | Uses Markdown text and the [`rich-text` block](https://github.com/vtex-apps/rich-text) for `headline`, `subhead`, and `bodyText` props. |

## Customization

To apply CSS customizations to this and other blocks, see the [Using CSS handles for store customization](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization) guide. The following table lists the available CSS handles:

| CSS handles                   |
| ----------------------------- |
| `infoCardBodyText`            |
| `infoCardCallActionContainer` |
| `infoCardCallActionText`      |
| `infoCardContainer`           |
| `infoCardHeadline`            |
| `infoCardImage`               |
| `infoCardImageContainer`      |
| `infoCardImageLinkWrapper`    |
| `infoCardSubhead`             |
| `infoCardTextContainer`       |
