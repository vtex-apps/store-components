# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.0] - 2018-05-29
### Added
- Add _Share_ Component.
- Initial version of the availability subscriber component.

### Changed
- Change _ProductPrice_'s installments logic.
- Merge _TechnicalSpecifications_ Component with _ProductDescription_.

## [1.2.0] - 2018-05-24
### Added
- `TechnicalSpecifications` component.
- Initial version of SKU selector component.

### Fixed
- Fix bug on Slider when has just one element.
- Fix bug in the url when search something in the product page and click enter.
- Footer component padding

## [1.1.0] - 2018-05-21
### Changed
- Delayed queries on _BuyButton_ Component.
- Add error treatment on _BuyButton_ Component.
- Update _ProductImages_ Component.
- Update max visible slide items on thumbnail slider
- Add arrow icons from Nucleo to the Slider

### Fixed
- Fix _ShippingSimulator_ Component CSS.

## [1.0.0] - 2018-05-18
### Added
- Add all `product-details` components to Apps.
- Add `Enter key` press to the `search bar`
- Initial version of the shipping simulator.

### Changed
- Transform `npm-storecomponents` in a app that can be used in a VTEX store.
- Update _Price_ Component.
- **SSR** Added SSR compliancy to the searchbar.

### Fixed
- Fix locales directory to work with linked Apps.
- Fix `search bar` when click on category result.
- **slider** Fix infinite attribute of Slider settings
- Fix Slider classNames
- Fix Slider settings (slidesToScroll, slidesToShow)
