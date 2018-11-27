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

### Passing classes to elements of the component
```jsx
const social = {
  Facebook: true,
  WhatsApp: true
}

<Share social={social} className="ph2 mv1 dib" socialButtonClass="ph1 pointer" />
```

| Prop name | Type  | Description |
| --- | --- | --- |
| `social` | `Object!` | Social networks definition. The key is the name and the value is a boolean |
| `options` | `Object` | Object to configure the Component |
| `options.size` | `Number` | Buttons size in pixels |
| `className` | `String` | Classes to be applied to root element |
| `socialButtonClass` | `String` | Classes to be applied to social button |
| `socialIconClass` | `String` | Classes to be applied to icon of the button |
| `loaderContainerClass` | `String` | Classes to be applied to the `ContentLoader` container |
| `contentLoaderClass` | `String` | Classes to be applied to the `ContentLoader` |
