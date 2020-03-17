# Gradient Collapse

## Description

`GradientCollapse` is a VTEX component that hides part of the children when it is bigger than the `collapseHeight` giving the user the _show more_ or _show less_ options. This Component can be imported and used by any VTEX app.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents

- [Usage](#usage)
  - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

To import it into your code:

```js
import { GradientCollapse } from 'vtex.store-components'
```

You can use it in your code like a React component with the jsx tag: `<GradientCollapse />`.

```jsx
<GradientCollapse>
  I'm a text and I will collapse if I'm bigger than my collapseHeight!
</GradientCollapse>
```

### Configuration

| Prop name        | Type      | Description                   | Default Value |
| ---------------- | --------- | ----------------------------- | ------------- |
| `collapseHeight` | `Number!` | MaxHeight of the container    | -             |
| `children`       | `Node`    | The component to be collapsed | -             |

### Styles API

You should follow the Styles API instruction in the main [README](/README.md#styles-api).

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles         |
| ------------------- |
| `container`         |
| `content`           |
| `fadeBottom`        |
| `pointerEventsAuto` |
| `pointerEventsNone` |
| `showMoreButton`    |
