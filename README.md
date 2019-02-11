# VTEX Store Components

## Description

VTEX Store Components is a collection of components that can be used to create/extend others VTEX apps.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Release Schedule

| Release  | Status              | Initial Release | Maintenance LTS Start | End-of-life | Dreamstore Compatibility
| :--:     | :---:               |  :---:          | :---:                 | :---:       | :---: 
| [2.x]    | **Maintenance LTS** |  2018-10-02     | 2018-12-01            | March 2019  | 1.x
| [3.x]    | **Current Release** |  2018-11-29     |                       |             | 2.x

See our [LTS policy](https://github.com/vtex-apps/awesome-io#lts-policy) for more information.

## Table of Contents
- [Usage](#usage)
- [Components Specs](#components-specs)
- [Creating a new component](#creating-a-new-component)
  - [Project structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Tests](#tests)

## Usage

This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

To use this app, you need to import in your dependencies on `manifest.json`.
 
```json 
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

## Components Specs

Below we have a README for each component of this project that explains how to use them.

- [Animation](https://github.com/vtex-apps/storecomponents/blob/master/react/components/Animation/README.md)
- [Availability Subscriber](https://github.com/vtex-apps/storecomponents/blob/master/react/components/AvailabilitySubscriber/README.md)
- [Buy Button](https://github.com/vtex-apps/storecomponents/blob/master/react/components/BuyButton/README.md)
- [Categories Highlights](https://github.com/vtex-apps/storecomponents/blob/master/react/components/Container/README.md)
- [Collection Badges](https://github.com/vtex-apps/storecomponents/blob/master/react/components/CollectionBadges/README.md)
- [Container](https://github.com/vtex-apps/storecomponents/blob/master/react/components/Container/README.md)
- [Discount Badge](https://github.com/vtex-apps/storecomponents/blob/master/react/components/DiscountBadge/README.md)
- [Greeting](https://github.com/vtex-apps/storecomponents/blob/master/react/components/Greeting/README.md)
- [Logo](https://github.com/vtex-apps/storecomponents/blob/master/react/components/Logo/README.md)
- [Product Description](https://github.com/vtex-apps/storecomponents/blob/master/react/components/ProductDescription/README.md)
- [Product Images](https://github.com/vtex-apps/storecomponents/blob/master/react/components/ProductImages/README.md)
- [Product Name](https://github.com/vtex-apps/storecomponents/blob/master/react/components/ProductName/README.md)
- [Product Price](https://github.com/vtex-apps/storecomponents/blob/master/react/components/ProductPrice/README.md)
- [Search Bar](https://github.com/vtex-apps/storecomponents/blob/master/react/components/SearchBar/README.md)
- [Share](https://github.com/vtex-apps/storecomponents/blob/master/react/components/Share/README.md)
- [Shipping Simulator](https://github.com/vtex-apps/storecomponents/blob/master/react/components/ShippingSimulator/README.md)
- [SKU Selector](https://github.com/vtex-apps/storecomponents/blob/master/react/components/SKUSelector/README.md)
- [Slider](https://github.com/vtex-apps/storecomponents/blob/master/react/components/Slider/README.md)

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
- [Optional] styles.css

Next, inside of `react/` folder you need to export your component, such as: 

```js
import ProductPrice from './components/ProductPrice/index'

export default ProductPrice
```

Also, all dependencies needed should be inserted inside the react/package.json

## Troubleshooting
You can check if others are passing through similar issues [here](https://github.com/vtex-apps/store-components/issues). Also feel free to [open issues](https://github.com/vtex-apps/store-components/issues/new) or contribute with pull requests.

## Tests
:construction: :construction: :construction:
