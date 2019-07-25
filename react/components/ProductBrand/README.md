# Product Brand

## Description

`ProductBrand` is a VTEX Component that shows either the name or the logo of the product's brand, when inserted in a Product context.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
  - [Configuration](#configuration)
  - [Styles API](#styles-api)

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

Then, add `product-brand` block into our app theme, as we do in our [Product Details app](https://github.com/vtex-apps/product-details/blob/master/store/blocks.json). 

### Blocks API

This component has an interface that describes which rules must be implemented by a block when you want to use the `ProductBrand`.

```json
  "product-brand": {
    "component": "ProductBrand"
  }
```

### Configuration

| Prop name | Type | Description |
| --- | --- | --- |
| `displayMode` | `String` | You should choose between “logo” or “text”. This will define whether the product brand will be displayed by name or logo. |
| `fallbackToText` | `Boolean` |  This prop should only be used when displayMode is set to logo. It defines what should be done when the Brand Component should have displayed a brand logo but no image was registered in the VTEX Catalog. This prop is set as true by default, allowing the logo to be replaced with the brand name in those cases. When set as false, the store will not show the brand name instead of the brand logo |
| `height` | `Number` | It sets the logo height. It should only be used when displaymode is set to “logo”. |
| `excludeBrands` | `Array` | The brand names or brand IDs that are listed in the array will never be displayed by the Brand component. It is usually useful to hide default brand names/logos or test brand names/logos on the store front. |
| `logoWithLink` | `boolean` | If the brand logo will have a link that leads to the store's brand page |


### Styles API
:construction: :construction: :construction: