# Footer

Footer is a canonical component that any VTEX app can import.

To import it into your code:

```js
import { Footer } from 'vtex.store-components'
```
Also, you can import as a dependency in your `manifest.json`
```json
  dependencies: {
    "vtex.store-components: 1.x"
  }
```

## Usage

You can use it in your code like a React component with the jsx tag: `<Footer />`.

```html
<Footer />
```

Or, you can add in your `pages.json`: 
```json
 "store/footer": {
      "component": "vtex.store-components/Footer"
 }
```

| Prop name                          | Type       | Description                                       |
| ---------------------------------- | ---------- | ------------------------------------------------- |
| `socialNetworkLinks`               | `Object`   | Array of social network links                     |
| `sectionLinks`                     | `Object`   | Array of name and links                           |
| `moreInformationLinks`             | `Object`   | Array of links about store information            |
| `badges`                           | `Object`   | Array of badges                                   |
| `paymentForms`                     | `Object`   | Array of payment forms                            |
| `showPaymentFormsInColor`          | `Boolean`  | Set color of payment forms                        |
| `showSocialNetworksInColor`        | `Boolean`  | Set color of social networks                      |
| `logo`                             | `String`   | Link of Store logo                                |

See an example at [Dreamstore](https://github.com/vtex-apps/dreamstore-theme/blob/master/pages/pages.json#L24) and [Store](https://github.com/vtex-apps/store/blob/master/react/StoreTemplate.js#L16) apps
