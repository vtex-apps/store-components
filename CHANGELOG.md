# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Update header padding to match the whole store.

## [2.2.1] - 2018-09-14
### Fixed
- propTypes console errors.

## [2.2.0] - 2018-09-14

## [2.1.1] - 2018-09-13

## [2.1.0] - 2018-09-13
### Added
- `Animation` component.

### Changed
- Update `Price` props documentation.
- `Header` to import the `Logo` and `Header` as extension points.

## [2.0.6] - 2018-09-06
### Changed
- Update css to use tachyons classes

## [2.0.5] - 2018-09-05
### Fixed
- `Footer` component top margin, in order to not collapse with `Login`

## [2.0.4] - 2018-09-05
### Changed
- `TopMenu` to pass classnames to change the icon and label of the `MiniCart` and `Login` instead of pass the hexadecimal color.

## [2.0.3] - 2018-09-05
### Fixed
- `Footer` propTypes error.

## [2.0.2] - 2018-08-31
### Fixed
- Fix design issues.

## [2.0.1] - 2018-08-30
### Changed
- Refact the `ProductPrice` component.
### Fixed
- Update the propTypes of the components: `BuyButton`, `ProductPrice`, `ProductName`.

## [2.0.0] - 2018-08-30
### Removed
- `QuantitySelector` that should not exist because the styleguide has a component with the same purpose, the `NumericStepper`.

## [1.16.3] - 2018-08-29
### Changed
- Refact `SearchBar` component.

## [1.16.2] - 2018-08-27
### Fixed
- `SearchBar` proptype error on SSR
- `Footer` proptype error

## [1.16.1] - 2018-08-24
### Changed
- `SearchBar` debouncing and search only inputs with a minimum of 2 characters

## [1.16.0] - 2018-08-24
### Changed
- `SearchBar` design.
- Update `Header` design to a white style.

### Fix
- Component name into the documentation of `CategoryHighlights`.

## [1.15.0] - 2018-08-23
### Changed
- Footer redesigned.

## [1.14.2] - 2018-08-22
### Added
- `schema` to the `ProductName` component .

## [1.14.1] - 2018-08-21
### Added
- prop `showSku` to the `ProductName` component.

## [1.14.0] - 2018-08-17
### Added
- props `color`, `width`, `height` e `showLabel` to `Logo` component.
- `MobileSearch` component to `SearchBar`.

### Changed
- `Header` design.

## [1.13.2] - 2018-08-16
### Fixed
- Breaking change rename of `CategoriesHighlights`.

## [1.13.1] - 2018-08-16
### Changed
- Undeprecate v1.13.0 version.

## [1.13.0] - 2018-08-15
### Added
- `CategoryCard` shapes.

## [1.12.7] - 2018-08-15
### Fixed
- All content loaders to work on Firefox.

## [1.12.6] - 2018-08-14

### Fixed
- Undefined behavior of the `CategoriesHightlights` schema.

## [1.12.5] - 2018-08-13
### Added
- `ImpersonateCustomer` component to  `Header`.

## [1.12.4] - 2018-08-10
### Added
- Link redirect to handleClick of `SKUSelector`.

## [1.12.3] - 2018-08-09
### Fixed
- Correct function from `orderFormContext` to add a new item to the orderForm.
- `ProductPrice` condition now uses `isNil` function from `ramda`.

## [1.12.2] - 2018-08-08
### Added
- `ProductDescription` content loader.
- `ProductName` and `ProductPrice` content loaders default style.

## [1.12.1] - 2018-08-08
### Added
- `MainCategories` component.
- `ProductDescription` content loader.

## [1.12.0] - 2018-08-02
### Added
- `ProductName`, `ProductPrice` and `ProductImages` content loaders.
- `Share` and `ShippingSimulator` content loaders.
- More `BuyButton` loading logic.

## [1.11.0] - 2018-08-02
### Changed
- Removed graphql queries from `BuyButton`
- Added `OrderFormContext` to update the minicart on `BuyButton` 


## [1.10.0] - 2018-08-02
### Fixed
- Top menu not being rendered as an overlay on scroll down.

### Changed
- Use tachyons classes in `AvailabilitySubscriber`.

### Added
- Added mutation in `AvailabilitySubscriber` to send the data for Master Data on the entity `AS`.

## [1.9.0] - 2018-07-26
### Added
- SSR to Slider component.

## [1.8.3] - 2018-07-25
### Fixed
- `ProductPrice` propTypes, removed warning from console.
- `Footer` positioned always at the bottom of the page.
- ImageUrl warning in `SKUSelector` and `ProductImages`.

## [1.8.2] - 2018-07-18
### Changed
- Component loader on `ProductImages`

## [1.8.1] - 2018-07-13
### Fixed
- `Slider` adaptToScreen function.
- Documentation of `BuyButton`.

### Changed
- Migrate the `Footer` schema to use the `type: "array"`.
- `MiniCart` position into the `Header`.

## [1.8.0] - 2018-07-10
### Added
- Buy button support to add multiple sku items to the cart at the same time of `BuyButton`.

## [1.7.3] - 2018-07-10
### Changed
- Define `Footer` schema props that are layout type.

### Fixed
- `TopMenu` display on mobile screen.

## [1.7.2] - 2018-7-9
### Changed
- Hide fixed header while in edit mode.

## [1.7.1] - 2018-7-6
### Changed
- Unescape HTML in the product description.
- Logo link to be a `Link` component from `render`.

### Fixed
- Vertical display of `ProductImage`.
- Thumbnail image selection in `ProductImage`.

## [1.7.0] - 2018-7-4
### Added
- Component `Header`.

## [1.6.1] - 2018-6-27
### Changed
- _BuyButton_ don't wait add to cart to proceed to checkout page.
- _BuyButton_ Component added isOneClickBuy attribute.

### Fixed
- _BuyButton_ default props as static attribute.
- _SKU Selector_ item with false value as class name.

## [1.6.0] - 2018-6-20
### Added
- Debounce function to handle the increase and decrease events in the `QuantitySelector`.

### Changed
- Make `onMaxReached` function not required in `QuantitySelector`.
- Use children prop in `ProductImage` to customize selected image render.
- Update design of `CollectionBadges`.

## [1.5.1] - 2018-6-18
### Added
- Internationalization to `SearchBar`.
- Spinner to `SearchBar`.
- `isLayout` to `ProductPrice`'s schema properties.

### Fixed
- `QuantitySelector` input style for do not impact the others inputs.
- `SearchBar` options link.

### Changed
- `QuantitySelector` style
- `QuantitySelector` plus icon to use the StyleGuide one.

## [1.5.0] - 2018-6-11
### Added
- Max height of the logo image.
- Added a title to the _Share_ Component share url.
- Internationalization of the `Footer` schema.
- Internationalization of the `Share` schema.
- README documentation of Logo Component.

### Fixed
- _SKU Selector_ with a different item selected on entering the product page.
- _SKU Selector_ item's discount badge position.
- Put the _ProductPrice_ schema inside it's Component.
- README typos.

## [1.4.0] - 2018-6-6
### Added
- Inner zoom image to the product image.
- Discount badge to sku item.

### Changed
- Slightly changed the layout of `ProductName` and `SkuSelector` to accomplish proposed design.
- Style of the unavailable sku to be different from the others.
- Change _ProductName_, added: showBrandName, showProductReference, productReference attributes.
- Customize Footer uiSchema.

### Fixed
- Vertical centralization of SKU Selector Items.

## [1.3.2] - 2018-5-31
### Changed
- Integration of the `ShippingComponent` with graphql.

## [1.3.1] - 2018-5-30
### Fixed
- Fix _ProductPrice_ Component when no Installments are passed.

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
- Update max visible slide items on thumbnail slider.
- Add arrow icons from Nucleo to the Slider.

### Fixed
- Fix _ShippingSimulator_ Component CSS.

## [1.0.0] - 2018-05-18
### Added
- Add all `product-details` components to Apps.
- Add `Enter key` press to the `search bar`.
- Initial version of the shipping simulator.

### Changed
- Transform `npm-storecomponents` in a app that can be used in a VTEX store.
- Update _Price_ Component.
- **SSR** Added SSR compliancy to the searchbar.

### Fixed
- Fix locales directory to work with linked Apps.
- Fix `search bar` when click on category result.
- **slider** Fix infinite attribute of Slider settings.
- Fix Slider classNames.
- Fix Slider settings (slidesToScroll, slidesToShow).
