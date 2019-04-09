## Image

## Description

`Image` is a VTEX component that allow to add any image on the store. This component can be imported and used by any VTEX App.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

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
<Image listPrice={commertialOffer.ListPrice}
                sellingPrice={commertialOffer.Price}
                label={badgeText}
/>
```

## Configuration

| Prop name              | Type       | Description                                                                 |
| ---------------------- | ---------- | --------------------------------------------------------------------------- |
| `listPrice`            | `Number!`  | Product's default price                                                     |
| `sellingPrice`         | `Number!`  | Product's price with discount                                               |
| `label`                | `String`   | Label to track the discount percent                                         |
| `children`             | `Node!`    | Element where the badge is displayed                                        |

## Styles API

This app provides some CSS classes as an API for style customization. You should follow the Styles API instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#styles-api).

### CSS namespaces
Below, we describe the namespaces that are defined in the `Image`.

Class name        | Description                    | Component Source        
----------------- | ------------------------------ | ------------------------
`discountContainer`| The discount container | [index](/react/components/Image/index.js) |
