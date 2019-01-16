# ImageText
ImageText is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import ImageText from 'vtex.store-components/ImageText'
```

## Usage
You can use it in your code like a React component with the jsx tag: `<ImageText />`. 
```jsx
<ImageText 
  height={height}
  image={image}
  mobileImage={image}
  textTitle={textTitle}
  textDescription={textDescription}
  buttonTitle={buttonTitle}
  handleButton={handleButton}
/>
```
| Prop name | Type | Description |
| --- | --- | --- |
| `height` | `Number` | Image minimum height |
| `image` | `String!` | Image url for desktop |
| `mobileImage` | `String` | Image url for mobile |
| `textTitle` | `String!` | Text title |
| `textDescription` | `String!` | Text description |
| `buttonTitle` | `String!` | button title text |
| `handleButton` | `Function!` | Button handler function on click |
