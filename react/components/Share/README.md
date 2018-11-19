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
The `classes` prop has the following structure:
```js
{
  classes: PropTypes.shape({
    root: PropTypes.string,
    loader: PropTypes.shape({
      container: PropTypes.string,
      contentLoader: PropTypes.string
    }),
    social: PropTypes.shape({
      button: PropTypes.string,
      icon: PropTypes.string
    })
  })
}
```
The attributes of `classes` object represent an element of the component. See the folowing example
```jsx
const social = {
  Facebook: true,
  WhatsApp: true
}

const classes = {
  root: 'ph2 mv1 dib',
  social: {
    button: 'ph1 pointer'
  }
}

<Share social={social} classes={classes} />
```

You might want to apply some specific style to one social media, for do that you can pass an attribute of social named with something like `button<social_media>` or `icon<social_media>`
```jsx
const social = {
  Facebook: true,
  WhatsApp: true
}

const classes = {
  root: 'ph2 mv1 dib',
  social: {
    button: 'ph1 pointer', // this is applied to every button
    icon: 'pa8', // this is applied to every icon
    buttonWhatsApp: 'o-70',
    iconFacebook: 'rotate-45'
  }
}

<Share social={social} classes={classes} />
```

| Prop name | Type  | Description |
| --------- | ----- | ----------- |
| `social` | `Object!` | Social networks definition. The key is the name and the value is a boolean |
| `options` | `Object` | Object to configure the Component |
| `options.size` | `Number`  | Buttons size in pixels                                                     |
| `classes` | `Object` | CSS classes to be applied in the elements of the component |