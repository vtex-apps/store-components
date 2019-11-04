# Info Card

## Description

`InfoCard` is a VTEX component allows you to display content combining image and text.
This Component can be imported and used by any VTEX app.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](/README.md#usage).

`info-card` is a block allowed in the [store] interface(https://github.com/vtex-apps/store).

You can use it by adding it to the blocks of your store sections, for example:
```json
"store.home": {
    "blocks": [
      "info-card",
      "carousel#home",
      "shelf#home"
    ]
  },
```

### Blocks API

When implementing this component as a block, various inner blocks may be available.
For now this block does not have any required or optional blocks.

#### Configuration

Through the Storefront, you can change the `InfoCard`'s behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `isFullModeStyle` | `Boolean` | If true, image provided will be used as a background image and text will be displayed over it | false |
| `textPosition` | `TextPostionEnum` | Choose in which position of the component text will be displayed, left, center or right | `"left"` |
| `textAlignment` | `TextAlignmentEnum` | Control the text alignment inside component. This prop is ignored if `isFullModeStyle` is true  | `"left"` |
| `headline` | `String` | Text to be used as headline. If not provided, it will not be rendered | `null` |
| `subhead` | `String` | Text to be displayed underneath the headline. If not provided, it will not be rendered | `null` |
| `callToActionMode` | `CallToActionEnum` | Set Call to Action component mode | `"button"` |
| `callToActionText` | `String` | Text to be displayed inside the CTA component | `""` |
| `callToActionUrl` | `String` | URL to be redirected when CTA component is clicked | `""` |
| `imageUrl` | `String` | URL of the image to be used on desktop | `""` |
| `mobileImageUrl` | `String` |  URL of the image to be used on mobile. If you do not provide any, the desktop image url will be used | `null` |
| `blockClass` | `String` | Adds an extra class name to ease styling | `null` |
| `htmlId` | `String` | Adds an id to the container element | `null` |


Here are the possible values of `TextPostionEnum`

| Enum name | Enum value | Description |
| --------- | ---- | ----------- |
| Left | 'left' | Text will be to the left. If `isFullModeStyle` is false, image will be on the right |
| Center | 'center' | Text will be in the center. Not applicable if `isFullModeStyle` is false. |
| Right | 'right' | Text will be to the right. If `isFullModeStyle` is false, image will be on the left |

Here are the possible values of `CallToActionEnum`

| Enum name | Enum value | Description |
| --------- | ---- | ----------- |
| None | 'none' | Don't render any Call to Action component  |
| Button | 'button' | Call to Action component will be a button |
| Link | 'link' | Call to Action component will be a text in a link format |

Here are the possible values of `TextAlignmentEnum`

| Enum name | Enum value | Description |
| --------- | ---- | ----------- |
| Left | 'left' | Text alignment will be to the left. |
| Center | 'center' | Text alignment will be to the center. |
| Right | 'right' | Text alignment will be to the right. |

### Styles API
You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces
Below, we describe the namespace that are defined in the `InfoCard`.

| Class name | Description | Component Source |
| ---------- | ----------- | ---------------- |
| `infoCardContainer` | The main container of `InfoCard` | [index](/react/components/InfoCard/index.js) |
| `infoCardTextContainer` | The text container | [index](/react/components/InfoCard/index.js) |
| `infoCardHeadline` | The headline label | [index](/react/components/InfoCard/index.js) | 
| `infoCardSubhead` | The subhead label | [index](/react/components/InfoCard/index.js) |
| `infoCardCallActionContainer` | The Call to Action container | [index](/react/components/InfoCard/CallToAction.js) | 
| `infoCardCallActionText` | The Call to Action text | [index](/react/components/InfoCard/CallToAction.js) | 
| `infoCardImageContainer` | The container of the image displayed on `InfoCard` (if `isFullModeStyle` is `false`) | [index](/react/components/InfoCard/index.js) | 
| `infoCardImage` | The image displayed on `InfoCard` (if `isFullModeStyle` is `false`) | [index](/react/components/InfoCard/index.js) | 


