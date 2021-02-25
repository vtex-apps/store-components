# VTEX Store Components
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-14-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Description

VTEX Store Components is a collection of components that can be used to create/extend others VTEX apps.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

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

- [Animation](Animation.md)
- [Availability Subscriber](AvailabilitySubscriber.md)
- [Back To Top Button](BackToTopButton.md)
- [Buy Button](BuyButton.md)
- [Categories Highlights](CategoriesHighlights.md)
- [Collection Badges](CollectionBadges.md)
- [Container](Container.md)
- [Discount Badge](DiscountBadge.md)
- [Gradient Collapse](GradientCollapse.md)
- [Greeting](Greeting.md)
- [Image](Image.md)
- [InfoCard](InfoCard.md)
- [Logo](Logo.md)
- [Newsletter](Newsletter.md)
- [Product Brand](ProductBrand.md)
- [Product Description](ProductDescription.md)
- [Product Images](ProductImages.md)
- [Product Name](ProductName.md)
- [Product SKU Attributes](ProductSKUAttributes.md)
- [Product Price](ProductPrice.md)
- [Product Specifications](ProductSpecifications.md)
- [SKU Selector](SKUSelector.md)
- [Search Bar](SearchBar.md)
- [Share](Share.md)
- [Shipping Simulator](ShippingSimulator.md)
- [Slider](Slider.md)
- [Notification](Notification.md)

## Creating a new component

To start your development, create a new folder on react/components. That's where your source code will be stored. Also create a new js file on /react, this file should be used to expose your component, like:

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

<!-- DOCS-IGNORE:start -->
## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/hapoza"><img src="https://avatars3.githubusercontent.com/u/27775611?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dan</b></sub></a><br /><a href="https://github.com/vtex-apps/store-components/commits?author=hapoza" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/JNussens"><img src="https://avatars0.githubusercontent.com/u/7662734?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jean Nussenzveig</b></sub></a><br /><a href="https://github.com/vtex-apps/store-components/commits?author=JNussens" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/lucasayb"><img src="https://avatars2.githubusercontent.com/u/17356081?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lucas Antônio Yamamoto Borges</b></sub></a><br /><a href="https://github.com/vtex-apps/store-components/commits?author=lucasayb" title="Code">💻</a></td>
    <td align="center"><a href="https://t.co/LTjWBxRnqE"><img src="https://avatars3.githubusercontent.com/u/28419764?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sebastian Sanchez Vega</b></sub></a><br /><a href="https://github.com/vtex-apps/store-components/commits?author=sebaskun98" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Erislandio"><img src="https://avatars1.githubusercontent.com/u/34255207?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Erislandio</b></sub></a><br /><a href="https://github.com/vtex-apps/store-components/commits?author=Erislandio" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/BeatrizMiranda"><img src="https://avatars2.githubusercontent.com/u/28959326?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Beatriz Miranda</b></sub></a><br /><a href="https://github.com/vtex-apps/store-components/commits?author=BeatrizMiranda" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Jayendra88"><img src="https://avatars1.githubusercontent.com/u/2637457?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jayendra</b></sub></a><br /><a href="https://github.com/vtex-apps/store-components/commits?author=Jayendra88" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/pgrimaud"><img src="https://avatars1.githubusercontent.com/u/1866496?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pierre Grimaud</b></sub></a><br /><a href="https://github.com/vtex-apps/store-components/commits?author=pgrimaud" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/igorpoubel"><img src="https://avatars2.githubusercontent.com/u/6241622?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Igor Poubel</b></sub></a><br /><a href="https://github.com/vtex-apps/store-components/commits?author=igorpoubel" title="Code">💻</a></td>
    <td align="center"><a href="http://www.hugoccosta.com"><img src="https://avatars2.githubusercontent.com/u/20212776?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hugo Costa</b></sub></a><br /><a href="https://github.com/vtex-apps/store-components/commits?author=hugocostadev" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/MatheusR42"><img src="https://avatars0.githubusercontent.com/u/16908590?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matheus Araujo</b></sub></a><br /><a href="https://github.com/vtex-apps/store-components/commits?author=MatheusR42" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/LuisaFCorrea"><img src="https://avatars3.githubusercontent.com/u/66276121?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Luisa Correa</b></sub></a><br /><a href="https://github.com/vtex-apps/store-components/commits?author=LuisaFCorrea" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/pmarignan"><img src="https://avatars2.githubusercontent.com/u/32361926?v=4?s=100" width="100px;" alt=""/><br /><sub><b>pmarignan</b></sub></a><br /><a href="https://github.com/vtex-apps/store-components/commits?author=pmarignan" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/rcmuniz1994"><img src="https://avatars.githubusercontent.com/u/32344098?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rodrigo Muniz</b></sub></a><br /><a href="https://github.com/vtex-apps/store-components/commits?author=rcmuniz1994" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<!-- DOCS-IGNORE:end -->

**Upcoming documentation:**

 - [Render logo as amp-img if in AMP page](https://github.com/vtex-apps/store-components/pull/580)
 - [Update CSS handles on ProductSpecification](https://github.com/vtex-apps/store-components/pull/599)

 - [Including classes on searchBar to identify when is open and/or filled](https://github.com/vtex-apps/store-components/pull/792)