# DrawerAnimation
DrawerAnimation is a component that any VTEX app can import.

To import it into your code: 
```js
import DrawerAnimation from 'vtex.store-components/DrawerAnimation'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<DrawerAnimation />`. 
```jsx
<DrawerAnimation> 
  This is an animated text! \o/
</DrawerAnimation>
```

| Prop name          | Type       | Description                                                                   |
| ------------------ | ---------- | ----------------------------------------------------------------------------- |
| `className`        | `String`   | The className to set the animation                                            |
| `children`         | `Node!`    | Component children that will be displayed inside of the animation             |
| `from`             | `String`   | Set the origin of the animation, it can be 'left', 'right', 'top' or 'bottom' |
| `isActive`         | `Boolean`  | Active the animation                                                          |
