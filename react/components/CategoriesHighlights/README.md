# CategoriesHighlights description
CategoriesHighlights is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import CategoriesHighlights from 'vtex.store-components/CategoriesHighlights'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<CategoriesHighlights />`. 
```jsx
<CategoriesHighlights 
    categories={ 
        categoryX: { name: 'X', image: 'Image X' }, 
        categoryY: { name: 'Y', image: 'Image Y' } 
    } 
/>
```

| Prop name                      | Type       | Description                                                                          |
| -------------------------------| ---------- | ------------------------------------------------------------------------------------ |
| `categories`                   | `Object!`  | Categories in Highlight of the department                                            |
| `showCategoriesHighlights`     | `Boolean!` | Flag which indicates if the categories in highlight should be displayed or not       |
| `quantityOfItems`              | `Number!`  | Number of categories in highlight to be displayed (it should be 2 or 4)              |


| Categories Prop name     | Type       | Description                                                                 |
| ------------------------ | ---------- | --------------------------------------------------------------------------- |
| `name`                   | `String!`  | Name of the category                                                        |
| `image`                  | `String`   | Image of the category                                                       |

