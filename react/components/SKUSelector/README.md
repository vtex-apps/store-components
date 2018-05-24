# SKU Selector

SKU Selector is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import SKUSelector from 'vtex.store-components/SKUSelector'
```

## Usage

You can use it into your code like a React component with the jsx tag: `<SKUSelector />`. 

```html
<SKUSelector
  title={'SKUSelector'}
  skuItems={[
    {
      name: 'SKU',
      images: [
        {
          imageUrl: 'www.image.url.com',
          imageLabel: 'This is an image',
        }
      ],
      specs: [
        name: 'Color',
        categories: [
          { name: 'Red' },
          { name: 'Blue' }
        ]
      ]
    }
  ]}
/>
```
### Props

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `title`            | `String!`  | SKU Selector title                                                          |
| `skuItems`         | `Array!`   | SKU list                                                                    |
| `onSKUSelected`    | `Function` | Function that is called when a SKU is selected                              |

- `skuItems` shape

| Prop names         | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `name`             | `String!`  | SKU name                                                                    |
| `images`           | `Array!`   | SKU images list                                                             |
| `specs`            | `Array!`   | SKU specifications list                                                     |

- `images` shape

| Prop names         | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `imageUrl`         | `String!`  | Image URL                                                                   |
| `imageLabel`       | `String!`  | Image Label                                                                 |

- `specs` shape

| Prop names         | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `name`             | `String!`  | Specification name                                                          |
| `categories`       | `Array!`   | Specification categories list                                               |

- `categories` shape

| Prop names         | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `name`             | `String!`  | Category name                                                               |

