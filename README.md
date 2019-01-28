# Store Components

## Description
Storecomponents is a collection of components that can be used to create/extend others VTEX apps.

## Release schedule

| Release  | Status              | Initial Release | Maintenance LTS Start | End-of-life | Dreamstore Compatibility
| :--:     | :---:               |  :---:          | :---:                 | :---:       | :---: 
| [2.x]    | **Maintenance LTS** |  2018-10-02     | 2018-12-01            | March 2019  | 1.x
| [3.x]    | **Current Release** |  2018-11-29     |                       |             | 2.x

### Travis CI

[![Build Status](https://travis-ci.org/vtex-apps/store-components.svg?branch=master)](https://travis-ci.org/vtex-apps/store-components)

## Table of Contents
- [Usage](#usage)
- [Components Specs](#components-specs)
- [Creating a new component](#creating-a-new-component)
  - [Project structure](#project-structure)
  - [Working on your `src/index.js`](#working-on-your-srcindexjs)
- [Testing](#testing)

## Components Specs

Below we have a README for each component of this project that explains how to use them. 

- [Buy Button](https://github.com/vtex-apps/storecomponents/blob/master/react/components/BuyButton/README.md)
- [Collection Badges](https://github.com/vtex-apps/storecomponents/blob/master/react/components/CollectionBadges/README.md)
- [Discount Badge](https://github.com/vtex-apps/storecomponents/blob/master/react/components/DiscountBadge/README.md)
- [Footer](https://github.com/vtex-apps/storecomponents/blob/master/react/components/Footer/README.md)
- [Logo](https://github.com/vtex-apps/storecomponents/blob/master/react/components/Logo/README.md)
- [Product Description](https://github.com/vtex-apps/storecomponents/blob/master/react/components/ProductDescription/README.md)
- [Product Images](https://github.com/vtex-apps/storecomponents/blob/master/react/components/ProductImages/README.md)
- [Product Name](https://github.com/vtex-apps/storecomponents/blob/master/react/components/ProductName/README.md)
- [Product Price](https://github.com/vtex-apps/storecomponents/blob/master/react/components/ProductPrice/README.md)
- [Quantity Selector](https://github.com/vtex-apps/storecomponents/blob/master/react/components/QuantitySelector/README.md)
- [Search Bar](https://github.com/vtex-apps/storecomponents/blob/master/react/components/SearchBar/README.md)
- [Share](https://github.com/vtex-apps/storecomponents/blob/master/react/components/Share/README.md)
- [Shipping Simulator](https://github.com/vtex-apps/storecomponents/blob/master/react/components/ShippingSimulator/README.md)
- [SKU Selector](https://github.com/vtex-apps/storecomponents/blob/master/react/components/SKUSelector/README.md)
- [Slider](https://github.com/vtex-apps/storecomponents/blob/master/react/components/Slider/README.md)
- [Technical Specifications](https://github.com/vtex-apps/storecomponents/blob/master/react/components/TechnicalSpecifications/README.md)
- [Availability Subscriber](https://github.com/vtex-apps/storecomponents/blob/master/react/components/AvailabilitySubscriber/README.md)
- [Account](https://github.com/vtex-apps/storecomponents/blob/master/react/components/Account/README.md)

## Usage
To import a component of this project follow the instructions below. 

You need to add into the dependencies of your `manifest.json` and use it like a npm module. 
```json 
"dependencies": {
  "vtex.store-components": "2.x"
}
```

And to import it into your code, for example: 
```js
import ProductPrice from 'vtex.store-components/ProductPrice'
```

## Creating a new component
To start your development, create a new folder on react/components. Thats where your source code will be stored. Also create a new js file on /react, this file should be used to expose your component, like:


### Project structure 
Inside your `react/components/<component_name>` you should have:

- index.js
- README.md
- [Optional] components/
- [Optional] constants/
- [Optional] utils/
- [Optional] queries/
- [Optional] mutations/
- [Optional] global.css

Next, inside of `react/` folder you need to export your component, such as: 

```js
import ProductPrice from './components/ProductPrice/index'

export default ProductPrice
```

### Working on your index.js

All the css needed and used on the component should be inside of a global.css and it should be imported by the index.js file like:

```js
import './global.css'
```

All dependencies needed should be inserted inside the react/package.json

## Testing

To test your code you should run on your workspace:

```sh
vtex link
```
