# VTEX Store Components

## Description

VTEX Store Components is a collection of components that can be used to create/extend others VTEX apps.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Release Schedule

| Release  | Status              | Initial Release | Maintenance LTS Start | End-of-life | Store Compatibility
| :--:     | :---:               |  :---:          | :---:                 | :---:       | :---:
| [3.x]    | **Current Release** |  2018-11-29     |                       |             | 2.x
| [2.x]    | **Maintenance LTS** |  2018-10-02     | 2018-12-01            | March 2019  | 1.x

See our [LTS policy](https://github.com/vtex-apps/awesome-io#lts-policy) for more information.

## Table of Contents
- [Usage](#usage)
  - [Styles API](#styles-api)
- [Components Specs](#components-specs)
- [Creating a new component](#creating-a-new-component)
  - [Project structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Tests](#tests)

## Usage

This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

To use this app, you need to import in your dependencies on `manifest.json`.

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

Then, you can add a component block into your app theme as we do with `product-price` in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json).

For example, now you can change the behavior of `product-price` block that is in the product details. See an example of how to configure:
```json
"product-price": {
  "props": {
    "showListPrice": true,
    "showLabels": false,
  }
}
```

### Styles API
This app provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
  "builders": {
    "styles": "1.x"
  }
```

2. Create a file called `vtex.store-components.css` inside the `styles/css` folder. Add your custom styles:

```css
.container {
  margin-top: 10px;
}
```

## Components Specs

Below we have a README for each component of this project that explains how to use them.

- [Animation](/react/components/Animation/README.md)
- [Availability Subscriber](/react/components/AvailabilitySubscriber/README.md)
- [Buy Button](/react/components/BuyButton/README.md)
- [Categories Highlights](/react/components/CategoriesHighlights/README.md)
- [Collection Badges](/react/components/CollectionBadges/README.md)
- [Container](/react/components/Container/README.md)
- [Discount Badge](/react/components/DiscountBadge/README.md)
- [Gradient Collapse](/react/components/GradientCollapse/README.md)
- [Greeting](/react/components/Greeting/README.md)
- [InfoCard](/react/components/InfoCard/README.md)
- [Locale Switcher](/react/components/LocaleSwitcher/README.md)
- [Logo](/react/components/Logo/README.md)
- [Newsletter](/react/components/Newsletter/README.md)
- [Notification](/react/components/Notification/README.md)
- [Product Description](/react/components/ProductDescription/README.md)
- [Product Images](/react/components/ProductImages/README.md)
- [Product Name](/react/components/ProductName/README.md)
- [Product Price](/react/components/ProductPrice/README.md)
- [Product Specifications](/react/components/ProductSpecifications/README.md)
- [SKU Selector](/react/components/SKUSelector/README.md)
- [Search Bar](/react/components/SearchBar/README.md)
- [Share](/react/components/Share/README.md)
- [Shipping Simulator](/react/components/ShippingSimulator/README.md)
- [Slider](/react/components/Slider/README.md)

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

Also, all dependencies needed should be inserted inside the react/package.json.

## Troubleshooting
You can check if others are passing through similar issues [here](https://github.com/vtex-apps/store-components/issues). Also feel free to [open issues](https://github.com/vtex-apps/store-components/issues/new) or contribute with pull requests.

## Contributing

Check it out [how to contribute](https://github.com/vtex-apps/awesome-io#contributing) with this project. 

## Tests

To execute our tests go to `react/` folder and run `yarn test`

### Travis CI

[![Build Status](https://api.travis-ci.org/vtex-apps/store-components.svg?branch=master)](https://travis-ci.org/vtex-apps/store-components)
