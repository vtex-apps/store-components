# Animation

## Description

`Animation` is a VTEX Component that display some animations in their children props. 
This Component can be imported and used by any VTEX App.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)

## Usage

To import it into your code: 
```js
import Animation from 'vtex.store-components/Animation'
```

You can use it in your code like a React component with the jsx tag: `<Animation />`. 
```jsx
<Animation> 
  This is an animated text! \o/
</Animation>
```

| Prop name          | Type       | Description                                                                                 |
| ------------------ | ---------- | ------------------------------------------------------------------------------------------- |
| `className`        | `String`   | The className to set the animation                                                          |
| `children`         | `Node!`    | Component children that will be displayed inside of the animation                           |
| `type`             | `String`   | Type of the animation, it can be 'drawerLeft', 'drawerRight', 'drawerTop' or 'drawerBottom' |
| `isActive`         | `Boolean`  | Active the animation                                                                        |
| `duration`         | `number`   | The animation duration in seconds, the default value is 0.4 second.                         |
| `transfer`         | `number`   | The active animation deslocation in percentage, the default value is 110%.                  |
| `transferEnter`    | `number`   | The not active animation deslocation in percentage, the default value is 0%.                |