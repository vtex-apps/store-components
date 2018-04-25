# NPM store components

## Description

Npm-storecomponents is a collection of components that can be used to create/extend others vtex components. This repo used `lerna` to manage the npm packages. More info: https://lernajs.io/

## Table of Contents

* [Setup](#setup)
* [Creating a new module](#creating-a-new-module)
  * [Working on your `src/index.js`](#working-on-your-srcindexjs)
* [Publishing to NPM](#publishing-to-npm)
* [Testing your package without publishing it](#testing-your-package-without-publishing-it)

## Setup

```sh
$ npm i -g lerna
$
$ git clone git@github.com:vtex-apps/npm-storecomponents.git
$
$ cd npm-storecomponents
$
$ yarn i
```

Now you are ready to start writing some code. You can either implement a new module or extend an existing one.

## Creating a new module

To create a new module you should create a npm package inside the folder `packages`. You can start by:

```sh
$ # on root folder: npm-storecomponents
$ mkdir packages/<your-npm-module>
$ cd packages/<your-npm-module>
$ npm init
$ mkdir src  # your source code should go in here
$ mkdir docs # this is not required but we strongly recommend you to write your own docs.
$ vim src/index.js # this is the entry point of your module
```

Next, you need to work on your module´s `package.json`

It should look like this:

```javascript
{
  "name": "@vtex/<your-npm-module>",
  "version": "1.0.0",
  "description": "<your-npm-module description>",
  "main": "dist/index.js", // your code will be compiled and added to this file.
  "files": [
    "dist/"
  ],
  "scripts": { // common functions that all packages should have
    "test": "vtex-scripts test",
    "start": "webpack --watch",
    "build": "vtex-scripts build"
  },
  "author": "VTEX",
  "license": "ISC",
  "peerDependencies": {  // this will vary depending on your needs
    "prop-types": "~15.6.1",
    "react": "~15.5.4",
    "react-dom": "~15.5.4"
  },
  "directories": { // this should be common to all packages
    "doc": "docs",
    "dist": "dist"
  },
  "devDependencies": { // this should be common to all packages
    "@vtex/vtex-scripts": "^0.4.2",
    "enzyme": "^3.3.0",
    "enzyme-adapter-react-16": "^1.1.1",
    "webpack": "^4.6.0",
    "webpack-cli": "^2.0.14"
  }
}
```

### Working on your src/index.js

As we said before, this is the entry point that the webpack will be looking into, so if you have more than one source file you should use this file to export the others. Like:

```javascript
// packages/slick-components/src/index.js

export * from './Arrow'
export * from './Dots'
```

In this case we exported two components, but you can go on as you please. On the components that are being exported using `export default` instead of a named export, you need to do the following on your `src/index.js`:

```javascript
// packages/product-details/src/index.js
export { default as Price } from './Price'
```

## Publishing to npm

To publish a package is simple. First of, you should configure your npm with your own account info and set the scope to vtex, because we are working with scoped packages. More info: https://docs.npmjs.com/misc/scope

```sh
$ npm login --scope=@vtex
```

Once you get that out of the way you that are two primary cases that you should pay attention:

* If it is a new package, you should go to the package folder and publish it with access set to public. Like:

```sh
$ # on root folder of your package: npm-storecomponents/packages/<your-npm-module>
$ npm publish --access=public
```

* If it is an existent package:

```sh
$ # anywhere on: npm-storecomponents
$ lerna publish
```

## Testing your package without publishing it

To test your package you should use npm link. More info: https://docs.npmjs.com/cli/link

* First you should build your package

```sh
$ # on root folder of your package: npm-storecomponents/packages/<your-npm-module>
$ npm run build
```

* After that you can link and use your package locally using npm install.

## Troubleshooting

You can check if others are experiencing similar issues [here](https://github.com/vtex-apps/npm-storecomponents/issues). Also feel free to [open issues](https://github.com/vtex-apps/npm-storecomponents/issues/new).

## Contributing

TODO
