# MainCategories description
MainCategories is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import MainCategories from 'vtex.store-components/MainCategories'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<MainCategories />`. 
```html
<MainCategories categories={
    [{name: 'CategoryName', image: 'CategoryImage'}]
}/>
```

| Prop name                | Type       | Description                                                                 |
| ------------------------ | ---------- | --------------------------------------------------------------------------- |
| `categories`             | `Array!`   | Main categories of the department                                           |



| Categories Prop name     | Type       | Description                                                                 |
| ------------------------ | ---------- | --------------------------------------------------------------------------- |
| `name`                   | `String!`  | Name of the category                                                        |
| `image`                  | `String`   | Image of the category                                                       |

