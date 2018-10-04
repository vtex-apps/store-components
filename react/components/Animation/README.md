# Animation
Animation is a component that any VTEX app can import.

To import it into your code: 
```js
import Animation from 'vtex.store-components/Animation'
```

## Usage
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
| `transfer`         | `number`   | The animation delocation in percentage, the default value is 110%.                          |