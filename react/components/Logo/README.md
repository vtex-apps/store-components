# Logo
Logo is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import Logo from 'vtex.store-components/Logo'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<Logo />`. 
```jsx
<Logo url={image.url} title={image.title} /> 
```

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `url`              | `String`   | URL of the logo image                                                       |
| `title`            | `String!`  | Title to be displayed as alt text                                           |

See an example at [Dreamstore Theme](https://github.com/vtex-apps/dreamstore-theme/blob/b31511815bb1d8bca63decde37e9a3f3a01cef92/react/components/TopMenu.js#L16) app
