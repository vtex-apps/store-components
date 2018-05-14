# NPM store components

## Description

Npm-storecomponents is a collection of components that can be used to create/extend others vtex components.

## Continuous Integrations

### Travis CI

[![Build Status](https://travis-ci.org/vtex-apps/npm-storecomponents.svg?branch=master)](https://travis-ci.org/vtex-apps/npm-storecomponents)

## Table of Contents

* [Creating a new component](#creating-a-new-component)
  * [Working on your `src/index.js`](#working-on-your-srcindexjs)
* [Testing](#testing)

## Creating a new component

To start your development, create a new folder on react/components. Thats where your source code will be stored. Also create a new js file on /react, this file should be used to expose your component, like:


#Search bar example:

```js

import SearchBar from './components/search-bar/src/index'

export default SearchBar

``` 
Inside your react/components/<component_name> you should have:

- src/
--index.js
--components/ [Optional]
--queries/    [Optional]
--mutations/  [Optional]
--global.css <- optional if you don't need css
--CHANGELOG.md
--README.md

### Working on your src/index.js

All the css needed and used on the component should be inside of a global.css and it should be imported by the index.js file like:

```javascript
import './global.css'
```

All dependecies needed should be inserted inside the reac/package.json

## Testing

To test your code you should run on your workspace:

```sh
vtex link
```

And add your new component on the manifest.js dependencies section of the other app, like:

```js

"dependencies": {
    "vtex.carousel": "1.x",
    "vtex.shelf": "0.x",
    "vtex.product-summary": "0.x",
    "vtex.menu": "0.x",
    "vtex.minicart": "0.x",
    "vtex.product-details": "0.x",
    "vtex.storecomponents": "0.x",
    "vtex.gallery": "0.x",
    "vtex.category-menu": "0.x"
}

```


