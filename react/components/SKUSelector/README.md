# Product details

This is our SKU Selector component.

## Installation

To install this component follow the instructions below. 

You need to add into the dependencies of your `manifest.json` and use it like a npm module. 

```json 
"dependencies": {
    "vtex.storecomponents": "1.x"
}
```

And to import it into your code: 
```js
import ProductPrice from 'vtex.storecomponents/ProductPrice'
```

## Usage

You can use it into your code like a React component with the jsx tag: `<SKUSelector />`. 

```js
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

