## Discount Badge

## Description

`Discount Badge` is a VTEX component that shows a discount of a product. This component can be imported and used by any VTEX App.

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
import { DiscountBadge } from 'vtex.store-components'
```

You can use it in your code like a React component with the jsx tag: `<DiscountBadge />`.

```jsx
<DiscountBadge listPrice={commertialOffer.ListPrice}
                sellingPrice={commertialOffer.Price}
                label={badgeText}>
  <img src="" alt="">
</DiscountBadge>
```

## Configuration

| Prop name      | Type      | Description                          |
| -------------- | --------- | ------------------------------------ |
| `listPrice`    | `Number!` | Product's default price              |
| `sellingPrice` | `Number!` | Product's price with discount        |
| `label`        | `String`  | Label to track the discount percent  |
| `children`     | `Node!`   | Element where the badge is displayed |

## Styles API

This app provides some CSS classes as an API for style customization. You should follow the Styles API instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#styles-api).

### CSS namespaces

Below, we describe the namespaces that are defined in the `DiscountBadge`.

| Class name                | Description                  | Component Source                                  |
| ------------------------- | ---------------------------- | ------------------------------------------------- |
| `discountContainer`       | The discount container       | [index](/react/components/DiscountBadge/index.js) |
| `discountInsideContainer` | The discount inner container | [index](/react/components/DiscountBadge/index.js) |
