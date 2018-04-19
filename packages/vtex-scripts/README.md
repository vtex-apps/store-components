# VTEX Scripts

This package contains the scripts and build configuration for the VTEX modules.

## Usage

1.  Inside the [NPM Store Components repo](https://www.github.com/vtex-apps/npm-storecomponents)

Just run the bellow in the terminal

```sh
$ lerna add @vtex/vtex-scripts --scope=your-component
$ lerna bootstrap
```

And add the following lines to your `package.json`

```json
{
  "scripts": {
    "build": "vtex-scripts build",
    "test": "vtex-scripts test"
  }
}
```

2.  In a `vtex init`'ed module

Add the `@vtex/vtex-scripts` to your devDependencies

```sh
$ yarn add @vtex/vtex-scripts --dev
```

Also, **if you want testing** you need to install some required packages

```
$ yarn add enzyme enzyme-adapter-react-16 jsdom --dev
```

And add the following to a `setupTests.js` in the root of your _source_ directory

```js
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { JSDOM } from 'jsdom'

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')

global.window = jsdom.window
global.document = window.document

Enzyme.configure({ adapter: new Adapter() })
```

Then, just add the scripts to your `package.json`

```json
{
  "scripts": {
    "test": "vtex-scripts test"
  }
}
```

## Configurations

You can also customize some default configurations that comes with `vtex-scripts`

The following properties can be supplied in a `vtexScriptsOverride` property inside your `package.json`

| Name                 |   Type   | Description                                                        |
| -------------------- | :------: | ------------------------------------------------------------------ |
| `srcPath`            | `String` | The relative path of your sources directory (e.g. `./src`)         |
| `distPath`           | `String` | The relative path of your compiled files directory (e.g. `./dist`) |
| `setupTestsFilename` | `String` | The filename of the tests setup file (e.g. `setupTests.js`)        |
