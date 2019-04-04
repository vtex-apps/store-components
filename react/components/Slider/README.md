# Slider

## Description

`Slider` is a VTEX component that allows to show a collection of children components through a slide. To accomplish that, an external library called [react-slick](https://github.com/akiran/react-slick) is used.
This component can be imported and used by any VTEX app.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](/README.md#usage).

To import it into your code: 
```js
import { Slider } from 'vtex.store-components'
```

You can use it in your code like a React component with the jsx tag: `<Slider>`. 
```jsx
<Slider
  ssrFallback={this.ssrFallback()}
  sliderSettings={sliderSettings}
  scrollByPage={isScrollByPage}
  defaultItemWidth={DEFAULT_SHELF_ITEM_WIDTH + gap}
>
  {...}
</Slider>
```

#### Configuration

Through the Storefront, you can change the `Slider`'s behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name | Type | Description |
| --------- | ---- | ----------- |
| `sliderSettings` | `Settings` | The slider settings |
| `adaptToScreen` | `Boolean` | Makes the items per page to adapt by the slider width |
| `defaultItemWidth` | `Number` | Default item width, it's necessary when the adaptToScreen is true | 
| `scrollByPage` | `Boolean` | If the scroll of items is by page or not |
| `leftArrowClasses` | `String` | Left arrow custom classes |
| `rightArrowClasses` | `String` | Right arrow custom classes |
| `dotsClasses` | `String` | Dots custom classes | 
| `children` | `Node!` | Array of items to be rendered inside the slider |

Settings:

For more information on the slider settings, [access](https://react-slick.neostack.com/) the official documentation og the react-slick library.

### Styles API
You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces
Below, we describe the namespace that are defined in the `Slider`.

| Class name | Description | Component Source |
| ---------- | ----------- | ---------------- |
| `arrowRight` | The right arrow of the slider | [index](/react/components/Slider/index.js) |
| `arrowLeft` | The left arrow of the slider | [index](/react/components/Slider/index.js) |
| `dots` | The slider dots | [index](/react/components/Slider/index.js) | 
