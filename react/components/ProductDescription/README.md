# Product Description

# Description

React component that render a the description of a product.

# Installation

Into this folder, run the following command on terminal:

```sh
$ npm install @vtex/product-description
```

# Usage

```javascript
import React from 'react'
import { ProductDescription } from '@vtex/product-description'

class SampleUsage extends React.Component {
  render() {
    return (
      <ProductDescription>
        Lorem Ipsum Dolum.
      </ProductDescription>
    )
  }
}
```

And it will render the description that is passed as a children component.