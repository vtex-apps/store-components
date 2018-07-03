# Header

Header is a canonical component that any VTEX app can import.

To import it into your code:

```js
import { Header } from 'vtex.store-components'
```
Also, you can import as a dependency in your `manifest.json`
```json
  dependencies: {
    "vtex.store-components: 1.x"
  }
```

## Usage

You can use it in your code like a React component with the jsx tag: `<Header />`.

```html
<Header />
```

Or, you can add in your `pages.json`: 
```json
 "store/header": {
      "component": "vtex.store-components/Header"
 }
```

See an example at [Dreamstore](https://github.com/vtex-apps/dreamstore-theme/blob/master/pages/pages.json#L24) and [Store](https://github.com/vtex-apps/store/blob/master/react/StoreTemplate.js#L16) apps
