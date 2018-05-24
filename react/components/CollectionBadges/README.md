## Collection Badges
Collection Badges is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import CollectionBadges from 'vtex.store-components/CollectionBadges'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<CollectionBadges />`. 
```html
<CollectionBadges collectionBadgesText={[ 'foo', 'bar' ]}> 
  <img src="" alt="">
</CollectionBadges>
```

And it will render an image with the list of collection badges located at the bottom.

| Prop name              | Type       | Description                                                                 |
| ---------------------- | ---------- | --------------------------------------------------------------------------- |
| `collectionBadgesText` | `Array!`   | Array of collection badges text                                             |
| `label`                | `Node!`    | Children component that should be render inside the collection badge item   |

_TODO - Add some sample when an app use this component @brunojdo - 2018/05/23_
See an example at ... app
