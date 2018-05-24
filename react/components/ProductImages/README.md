# Product Images
Product Images is a canonical component that any VTEX app can import.

And to import it into your code: 
```js
import ProductImages from 'vtex.storecomponents/ProductImages'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<ProductImages />`. 
```html
<ProductImages  
    images={selectedItem.images}
    thumbnailSliderOrientation="HORIZONTAL"
/>
```

| Prop name                    | Type       | Description                                                                 |
| ---------------------------- | ---------- | --------------------------------------------------------------------------- |
| `images`                     | `Array!`   | Array of images to be passed for the Thumbnail Slider component as a props  |
| `thumbnailSliderOrientation` | `Enum!`    | Thumbnail Slider orientation                                                |
| `thumbnailMaxVisibleItems`   | `Number`   | Maximum number of visible items that should be displayed by the Slider      |

See an example at [Product Details](https://github.com/vtex-apps/product-details/blob/master/react/ProductDetails.js#L39) app
