# Share

Share is a Component that will allow you to configure share (social media and email) buttons.

And to import it into your code:

```js
import Share from 'vtex.store-components/Share'
```

## Usage

You can use it in your code like a React component with the jsx tag: `<Share />`.

```jsx
<Share social={{'Facebook': true, 'WhatsApp': true }} />
```

| Prop name      | Type      | Description                                                                |
| -------------- | --------- | -------------------------------------------------------------------------- |
| `social`       | `Object!` | Social networks definition. The key is the name and the value is a boolean |
| `options`      | `Object`  | Object to configure the Component                                          |
| `options.size` | `Number`  | Buttons size in pixels                                                     |
