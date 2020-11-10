# Collection Badges

## Description

`Collection Badges` is a VTEX component that will render an image with the list of collection badges located at the bottom.
This component can be imported and used by any VTEX app.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open an issue with your feature request.

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

To import it into your code:

```tsx
import { CollectionBadges } from 'vtex.store-components'
```

You can use it in your code like a React component with the `JSX` tag: `<CollectionBadges>`.

```tsx
<CollectionBadges collectionBadgesText={[ 'foo', 'bar' ]}>
  <img src="..." alt="...">
</CollectionBadges>
```

### Configuration

| Prop name              | Type       | Description                                                                  | Default Values |
| ---------------------- | ---------- | ---------------------------------------------------------------------------- | -------------- |
| `collectionBadgesText` | `string[]` | An array of collection badges text                                           | `[]`           |
| `children`             | `Node`     | Children components that should be rendered inside the collection badge item | `undefined`    |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles           |
| --------------------- |
| `collectionContainer` |
| `item`                |
