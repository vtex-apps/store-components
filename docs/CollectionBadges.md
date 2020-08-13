# Collection Badges

## Description

`Collection Badges` is a VTEX component that will render an image with the list of collection badges located at the bottom.
This component can be imported and used by any VTEX app.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

To import it into your code: 
```js
import { CollectionBadges } from 'vtex.store-components'
```

You can use it in your code like a React component with the jsx tag: `<CollectionBadges>`. 
```jsx
<CollectionBadges collectionBadgesText={[ 'foo', 'bar' ]}>
  <img src="..." alt="...">
</CollectionBadges>
```

### Configuration

| Prop name | Type | Description | Default Values |
| --------- | ---- | ----------- | -------------- |
| `collectionBadgesText` | `Array(String)!` | An array of collection badges text | [] |
| `children` | `Node!` | Children components that should be rendered inside the collection badge item | - |

### Styles API
You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces

Below, we describe the namespace that are defined in the `CollectionBadges`.

| Class name | Description | Component Source |
| ---------- | ----------- | ---------------- |
| `collectionContainer` | The collection badger main container | [index](/react/components/CollectionBadges/index.js) |
| `item` | The collection badge item main container | [index](/react/components/CollectionBadges/components/CollectionBadgeItem.js) |