# CategoryCard
CategoryCard is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import CategoryCard from 'vtex.store-components/CategoryCard'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<CategoryCard />`. 
```html
<CategoryCardCard 
  categoryName={category.name}
  categoryImageUrl={category.image.url}
/>
```

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `categoryName`     | `String!`  | Name of the Category                                                        |
| `categoryImageUrl` | `String`   | URL of the image that is related to the category                            |


