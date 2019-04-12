## Image

## Description

`Image` is a VTEX component that allow to add any image on the store. This component can be imported and used by any VTEX App.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

To import it into your code:
```js
import { Image } from 'vtex.store-components'
```

You can use it in your code like a React component with the jsx tag: `<Image />`.
```jsx
<Image src="https://via.placeholder.com/150"
       alt="Nice photo"
       maxWidth="150px"
/>
```

## Configuration

| Prop name     | Type       | Description                                                                |
| ------------- | ---------- | -------------------------------------------------------------------------- |
| `src`         | `String!`  | Specifies the URL of an image                                              |
| `alt`         | `String`   | Specifies an alternate text for an image                                   |
| `maxWidth`    | `String`   | Specifies the max width of an image                                        |
| `maxHeight`   | `String`   | Specifies the max height of an image                                       |
| `srcset`      | `String`   | Specifies the URL of the image to use in different situations              |
| `sizes`       | `String`   | Specifies image sizes for different page layouts                           |

## Styles API

This app provides some CSS classes as an API for style customization. You should follow the Styles API instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#styles-api).

### CSS namespaces
Below, we describe the namespaces that are defined in the `Image`.

Class name    | Description        | Component Source                          |
------------- | ------------------ | ----------------------------------------- |
`imageElement`| Class of the image | [index](/react/components/Image/index.js) |
