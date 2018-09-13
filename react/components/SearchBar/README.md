# Search Bar
Search Bar is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import SearchBar from 'vtex.store-components/SearchBar'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<SearchBar />`. 
```jsx
<SearchBar
    placeholder={"Search.. "}
    emptyPlaceholder={"No result"}
/>
```

| Prop name          | Type      | Description                                                          |
| ------------------ | --------- | -------------------------------------------------------------------- |
| `placeholder`      | `String`  | Displays a placeholder on the search bar                             |
| `emptyPlaceholder` | `String`  | Shows a placeholder when the ResultList hasn't results to displayed  |

_TODO - Add when an app use it. @brunojdo_ 
See an example at ... app
