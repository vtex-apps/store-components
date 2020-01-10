# VTEX Store Components

[![Build Status](https://api.travis-ci.org/vtex-apps/store-components.svg?branch=master)](https://travis-ci.org/vtex-apps/store-components)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

## Description

VTEX Store Components is a collection of components that can be used to create/extend others VTEX apps.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Release Schedule

| Release |       Status        | Initial Release | Maintenance LTS Start | End-of-life | Store Compatibility |
| :-----: | :-----------------: | :-------------: | :-------------------: | :---------: | :-----------------: |
|  [3.x]  | **Current Release** |   2018-11-29    |                       |             |         2.x         |
|  [2.x]  | **Maintenance LTS** |   2018-10-02    |      2018-12-01       | March 2019  |         1.x         |

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

- [Animation](/docs/Animation.md)
- [Availability Subscriber](/docs/AvailabilitySubscriber.md)
- [Buy Button](/docs/BuyButton.md)
- [Categories Highlights](/docs/CategoriesHighlights.md)
- [Collection Badges](/docs/CollectionBadges.md)
- [Container](/docs/Container.md)
- [Discount Badge](/docs/DiscountBadge.md)
- [Gradient Collapse](/docs/GradientCollapse.md)
- [Greeting](/docs/Greeting.md)
- [Image](/docs/Image.md)
- [InfoCard](/docs/InfoCard.md)
- [Logo](/docs/Logo.md)
- [Newsletter](/docs/Newsletter.md)
- [Product Brand](/docs/ProductBrand.md)
- [Product Description](/docs/ProductDescription.md)
- [Product Images](/docs/ProductImages.md)
- [Product Name](/docs/ProductName.md)
- [Product Price](/docs/ProductPrice.md)
- [Product Specifications](/docs/ProductSpecifications.md)
- [SKU Selector](/docs/SKUSelector.md)
- [Search Bar](/docs/SearchBar.md)
- [Share](/docs/Share.md)
- [Shipping Simulator](/docs/ShippingSimulator.md)
- [Slider](/docs/Slider.md)
- [Notification](/docs/Notification.md)

## Creating a new component

To start your development, create a new folder on react/components. Thats where your source code will be stored. Also create a new js file on /react, this file should be used to expose your component, like:

### Project structure

Inside your `docs/<component_name>` you should have:

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/hapoza"><img src="https://avatars3.githubusercontent.com/u/27775611?v=4" width="100px;" alt=""/><br /><sub><b>Dan</b></sub></a><br /><a href="https://github.com/vtex-apps/store-components/commits?author=hapoza" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/JNussens"><img src="https://avatars0.githubusercontent.com/u/7662734?v=4" width="100px;" alt=""/><br /><sub><b>Jean Nussenzveig</b></sub></a><br /><a href="https://github.com/vtex-apps/store-components/commits?author=JNussens" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
