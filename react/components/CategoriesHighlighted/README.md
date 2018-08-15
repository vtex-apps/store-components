# CategoriesHighlighted description
CategoriesHighlighted is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import CategoriesHighlighted from 'vtex.store-components/CategoriesHighlighted'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<CategoriesHighlighted />`. 
```jsx
<CategoriesHighlighted 
    categoriesHighlighted={ 
        categoryX: { name: 'X', image: 'Image X' }, 
        categoryY: { name: 'Y', image: 'Image Y' } 
    } 
/>
```

| Prop name                           | Type       | Description                                                                               |
| ----------------------------------- | ---------- | ----------------------------------------------------------------------------------------- |
| `categoriesHighlighted`             | `Object!`  | Categories highlighted in the department                                                  |
| `showCategoriesHighlighted`         | `Boolean!` | Flag which indicates if the categories highlighted should be displayed or not             |
| `quantityOfItems`                   | `Number!`  | Number of categories highlighted to be displayed (it should be 2 or 4)                    |
| `boxShape`                          | `String!`  | Shape of the card box which wraps each category (it should be 'squared' or 'rectangular') |                               

| categoriesHighlighted Props         | Type       | Description                                                                               |
| ----------------------------------- | ---------- | ----------------------------------------------------------------------------------------- |
| `name`                              | `String!`  | Name of the category                                                                      |
| `image`                             | `String`   | Image of the category                                                                     |

