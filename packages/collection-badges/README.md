# Collection Badges

# Description

React component that render a list of collection badges.

# Installation

Into the folder that contains your `package.json` file, run the following command on terminal:

```sh
$ npm install @vtex/collection-badges
```

# Usage

```javascript
import React from 'react'
import CollectionBadges from '@vtex/collection-badges'

class SampleUsage extends React.Component {
  render() {
    return (
      <CollectionBadges collectionBadgesText={[ 'foo', 'bar' ]}>
        <img src="" alt="">
      </CollectionBadges>
    )
  }
}
```

And it will render an image with the list of collection badges located at the bottom.