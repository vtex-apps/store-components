# Container

Container is a canonical component that any VTEX app can import.

To import it into your code: 
```js
import Container from 'vtex.store-components/Container'
```

## Usage

You can use it in your code as a React component with the jsx tag:

```jsx
<Container className="my-section">My content</Container>
```

Container will render a section element with proper padding around the children, allowing
better alignment of the components.

| Prop name | Type | Description |
| --- | --- | --- |
| `className` | `String` | Class to be applied to the `section` element |
