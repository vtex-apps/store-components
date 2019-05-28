# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- i18n using `vtex.native-types` to allow `NewsLetter` to respond properly to content i18n.

## [3.42.5] - 2019-06-05

### Fixed

- Hides SKU selector when there are no variations to be selected.
- `BuyButton`: use given props over context, if set.

## [3.42.4] - 2019-06-05

### Fixed

- Use props as default value instead of context.

## [3.42.3] - 2019-06-05

### Fixed

- Remove `showProductPrice` rule from `ProductPrice` wrapper.

## [3.42.2] - 2019-06-05

### Fixed

- HOTFIX: Rollback SKUSelector and ProductImage do version without Wrapper.

## [3.42.1] - 2019-06-04

### Fixed

- Get image of smaller size for `SKUSelector` and `ProductImages` images.

## [3.42.0] - 2019-06-04

### Added

- Wrapper to components to consume product context.

## [3.41.2] - 2019-05-28

### Added

- Content schema to `ProductPrice`.

## [3.41.1] - 2019-05-28

### Fixed

- Remove `showInstallPrompt` unused feature.

## [3.41.0] - 2019-05-27

### Added

- Added props `sellingPriceRange, showListPriceRange` and `showSellingPriceRange, showListPriceRange` to `productPrice` component.

## [3.40.0] - 2019-05-27

### Added

- Content schema to `InfoCard`.

## [3.39.0] - 2019-05-27

### Added

- i18n using `vtex.native-types` to allow `DiscountBadge` to respond properly to content i18n.

## [3.38.1] - 2019-05-26

### Fixed

- Fix warnings on the components `Image`, `BuyButton`, and `Logo`.

## [3.38.0] - 2019-05-25

### Added

- Added some CSS overrides classes to infocard and logo.

## [3.37.2] - 2019-05-21

### Fixed

- Removed `w-100` from `DiscountBadge` to avoid it to pass the image width.

## [3.37.1] - 2019-05-20

### Fixed

- Enable `ShippingSimulator` to accept any postal code format and validate using the country rules.

## [3.37.0] - 2019-05-17

### Added

- 'Open Minicart' feature after click on `BuyButton`.

## [3.36.1] - 2019-05-13

### Fixed

- Fixed bug where clicking on search result items would just close the search results list.

## [3.36.0] - 2019-05-10

### Added

- Send to the service worker a 'installPrompt' event when clicking the `BuyButton`.

## [3.35.0] - 2019-05-09

### Added

- Schema to `Logo` component.

## [3.34.0] - 2019-05-09

### Added

- `labelListPrice` prop in `ProductPrice`.

## [3.33.1] - 2019-05-09

### Fixed

- Fix z-index issue on the search ResultList component.

## [3.33.0] - 2019-05-08

### Added

- Add the `carouselImagePlaceholder` CSS handler to allow custom image placeholders.

## [3.32.2] - 2019-05-03

### Fixed

- Enable zoom with one click instead of two in `ProductImages`.

## [3.32.1] - 2019-05-03

### Fixed

- Instead of rendering a content loader when there is no image to be rendered in `Carousel`, it now renders a placeholder.

## [3.32.0] - 2019-05-02

### Changed

- Hide `InstallmentsPrice` when there's only _1x_ options.

## [3.31.0] - 2019-04-30

### Added

- Add zoom types and implement zoom `ìn-gallery` in `ProductImages` component.

## [3.30.2] - 2019-04-30

### Fixed

- Add `brand` props to send to minicart on `BuyButton`.

## [3.30.1] - 2019-04-29

### Added

- Allow case insensitive product specifications filter.

## [3.30.0] - 2019-04-26

### Added

- Added props `hiddenSpecifications` and `visibleSpecifications` to `productSpecifications` component.

## [3.29.2] - 2019-04-25

### Fixed

- Availability of a specific variation is based on all SKU's now.

## [3.29.1] - 2019-04-25

### Changed

- Add isLayout to `InfoCard` props.

## [3.29.0] - 2019-04-25

### Added

- CSS classes for reaching a sku variation name and value.

## [3.28.1] - 2019-04-25

### Fixed

- Fix propType `ShippingSimulator` error, removed warning from console.

## [3.28.0] - 2019-04-24

### Changed

- Scopes messages by domain (`admin/` and `store/`)

## [3.27.0] - 2019-04-24

### Fixed

- Notification bar width is now 100%.

## [3.26.0] - 2019-04-24

### Changed

- Make `UserAddress` use modal block.

## [3.25.10] - 2019-04-22

### Added

- CSS class to `InfoCard` image.

### Changed

- Make `InfoCard` headline and subline now support HTML and are sanitized before being displayed.

## [3.25.9] - 2019-04-18

## [3.25.8] - 2019-04-18

### Fixed

- Variations not being grouped.

## [3.25.7] - 2019-04-18

### Fixed

- Blurred Loader image blinking.

## [3.25.6] - 2019-04-15

### Changed

- Remove sort of sku item variations.

## [3.25.5] - 2019-04-12

### Added

- Added `container` CSS handle to Container.

### Changed

- Reduced horizontal padding for Container on wide screen sizes.

## [3.25.4] - 2019-04-12

### Fixed

- Ensure mutation to require acronym as String

## [3.25.3] - 2019-04-11

### Changed

- Use `insane` lib to sanitize HTML on `NotificationBar`.

## [3.25.2] - 2019-04-11

### Added

- Add `imageActionUrl` prop to `InfoCard`.

## [3.25.1] - 2019-04-10

### Changed

- Limit width of Container

## [3.25.0] - 2019-04-10

### Added

- New block `image`.

## [3.24.3] - 2019-04-10

## [3.24.2] - 2019-04-09

## [3.24.1] - 2019-04-09

### Fixed

- Add safeguard to InfoCard `blockClass` prop

## [3.24.0] - 2019-04-09

### Fixed

- Fix propType name for `showCategoriesHighlighted` in `CategoriesHighlights`.
- Fix SKUSelector displaying the wrong selected item.

### Added

- InfoCard new property `blockClass`.

### Fixed

- InfoCard schema.
- InfoCard CMS labels.

## [3.23.0] - 2019-04-09

### Added

- Pinterest share option on `Share`.

## [3.22.2] - 2019-04-05

### Fixed

- SKU Selector not changing selected item.

## [3.22.1] - 2019-04-05

### Fixed

- Remove margin when there is no thumbnails on `ProductImages`.

## [3.22.0] - 2019-04-04

### Added

- Place thumbs according to position on `ProductImages`.

### Fixed

- Misplaced `Logo` position on mobile.

### Changed

- Changed `Logo` to be a functional component instead of a class.
- Remove unused `VtexLogo` along with the props `color` and `showLabel` in `Logo`.
- Replaced `withRuntime` HOC by `useRuntime` hook in `Logo`.

## [3.21.8] - 2019-04-03

### Fixed

- Refactoring `Greeting`.

## [3.21.7] - 2019-04-01

### Changed

- Use location-marker from `store-icons` on `UserAddress`.

## [3.21.6] - 2019-04-01

### Added

- New blocks `notification.bar` and `notification.inline`.

## [3.21.5] - 2019-04-01

### Fixed

- Parse local state order form.

## [3.21.4] - 2019-03-29

### Added

- Implement query to get pickup point checkedIn name on `UserAddress`.

## [3.21.1] - 2019-03-28

### Fixed

- Fix labels to selling price and list price.

## [3.21.0] - 2019-03-27

### Added

- Add `ProductHighlights` component.
- Add `Newsletter` component.

## [3.20.4] - 2019-03-26

### Fixed

- Use title in svg Logo.

## [3.20.3] - 2019-03-25

### Added

- Allow adding link to logo.

### Changed

- Set w-100 to search bar and add padding.
- Adjust default logo size and add padding.

## [3.20.2] - 2019-03-22

### Fixed

- Fix local query on `UserAddress`.

## [3.20.1] - 2019-03-21

### Fixed

- Add fallback to store-graphql add item on `BuyButton`.

## [3.20.0] - 2019-03-21

### Changed

- Use the new Apollo Local State management API to handle the orderForm operations.

## [3.19.10] - 2019-03-15

### Fixed

- Fix zoom and slide change on `Carousel` of `ProductImages`.

## [3.19.9] - 2019-03-14

### Fixed

- Clicking the `BuyButton` will no more redirect if there is an `anchor` tag ancestor.

## [3.19.8] - 2019-03-14

### Changed

- Change messages basic languages files.

## [3.19.7] - 2019-03-14

### Added

- Add behavior test to SKUSelector.
- Behavior tests for BuyButton.

### Fixed

- Set `SearchBar` input focus when user click search icon.

## [3.19.6] - 2019-03-11

### Fixed

- Change current product image when pressing on a thumbnail.

### Added

- `ProductImages` snapshot tests.

## [3.19.5] - 2019-03-07

### Added

- logoUrl now support `{{account}}` in the string url.
  eg. store with account name gc-xoi8837:
  https://static.gocommerce.com/{{account}}/assets/logo.png
  it will render https://static.gocommerce.com/gc-xoi8837/assets/logo.png

### Changed

- Using `react-testing-library` instead `enzyme`.

## [3.19.4] - 2019-03-01

### Changed

- Make `SKUSelector` more generic, add "step-by-step" mode, save state

## [3.19.3] - 2019-03-01

### Changed

- Using `store-icons` instead of `dreamstore-icons`.

## [3.19.2] - 2019-02-27

### Changed

- Change overall look of `SearchBar` on mobile and desktop in order to match the design.

### Fixed

- Make the clear button on `SearchBar` work as expected.

## [3.19.1] - 2019-02-26

### Added

- `min-width` for Logo

## [3.19.0] - 2019-02-25

### Added

- `UserAddress` component.
- Added `ProductImages` docs.

## [3.18.2] - 2019-02-25

### Fixed

- Improve CSS handles in `ProductImages` component.

### Added

- Snapshot tests for `Share`.

## [3.18.1] - 2019-02-21

### Added

- Add `info-card` to `interfaces.json`

## [3.18.0] - 2019-02-21

### Added

- Snapshot tests for `ProductPrice`.
- Snapshot tests for `BuyButton`.
- Snapshot tests for `AvailabilitySubscriber`.
- Snapshot tests for `Animation`.
- Snapshot tests for `CollectionBadges`.
- Snapshot tests for `Container`.
- Snapshot tests for `DiscountBadge`.
- Snapshot tests for `CategoriesHighlights`.
- Snapshot tests for `GradientCollapse`.
- Snapshot tests for `Greeting`.
- Snapshot tests for `ProductNames`.
- Better use of helpers in tests.
- Snapshot tests for `ProductDescription`.
- Snapshot tests for `Logo`.
- Snapshot tests for `ProductSpecifications`.
- Snapshot tests for `SKUSelector`.
- Snapshot tests for `ShippingSimulator`.
- Snapshot tests for `SearchBar`.
- Create `InfoCard` component.

## [3.17.2] - 2019-02-18

### Fixed

- Fix product images carousel refresh bug.

## [3.17.1] - 2019-02-18

### Fixed

- Quick fix on `AutocompleteInput` to remove warnings.

### Added

- Base settings for tests.

## [3.17.0] - 2019-02-15

### Added

- Support to CSS Modules in `Share`.

## [3.16.4] - 2019-02-15

### Fixed

- Undo the link-state changes.

## [3.16.3] - 2019-02-14

## [3.16.2] - 2019-02-14

## [3.16.1] - 2019-02-13

### Fixed

- Wrong rebase.

## [3.16.0] - 2019-02-13

### Added

- Use the new minicart's optimistic strategy on `BuyButton`.

## [3.15.1] - 2019-02-13

### Fixed

- Fix `Logo` to only use maxWidth and maxHeight to define it's size.

### Added

- Add an API Docs to `ProductDescription`.

## [3.15.0] - 2019-02-12

### Added

- Create an API Docs.
- Add an API Docs to `ProductName`.
- Refactor `Product Description` component into two new components.
- Create `ProductSpecifications` component allowing two visualizations modes.
- Create `GradientCollapse` component.

## [3.14.3] - 2019-02-08

### Fixed

- Improve `BuyButton` `README.md`

## [3.14.2] - 2019-02-08

### Added

- Add callbacks to click event on `BuyButton`

## [3.14.1] - 2019-02-06

## [3.14.0] - 2019-02-06

### Added

- After switching secondary variations on a product, those changes won't be kept on `history`.

### Fixed

- Remove scrolling to top after changing SKU in `SKUSelector`.

## [3.13.1] - 2019-02-05

### Added

- Make it possible to be able to add items with assembly options on `BuyButton`

## [3.13.0] - 2019-02-05

### Added

- Declare interfaces for components used in `ProductDetail`.

## [3.12.4] - 2019-02-04

### Fixed

- Error of not defined variable in the `Carousel` component.

## [3.12.3] - 2019-02-04

### Fixed

- Fix `ProductName` container css class not being used.

## [3.12.2] - 2019-02-01

## [3.12.1] - 2019-01-31

### Changed

- Move slides property to getter on `ProductImages` component.

### Fixed

- Fix `forceUpdate` being called on instantiation of the `ProductImage` component.

## [3.12.0] - 2019-01-30

### Changed

- Use icons from `vtex.dreamstore-icons`.

## [3.11.2] - 2019-01-29

### Fixed

- Remove `inheritComponent` from blocks.

## [3.11.1] - 2019-01-29

### Fixed

- Show installments with fee when the biggest with free is 1.

## [3.11.0] - 2019-01-28

### Changed

- Bump messages builder to `1.x`.

### Fixed

- Fix typo on added to cart message in english

## [3.10.3] - 2019-01-28

### Changed

- Support to CSS Modules in `ProductPrice`.

## [3.10.2] - 2019-01-28

### Changed

- Support to CSS modules in `CategoriesHighlights`.

## [3.10.1] - 2019-01-28

### Added

- Props on `Slider` for custom classes.

## [3.10.0] - 2019-01-25

### Changed

- Emit `addToCart` event from `BuyButton`.

## [3.9.2] - 2019-01-25

### Fixed

- Incorrect click area on product summary.

## [3.9.0] - 2019-01-25

### Changed

- Support to CSS modules in `ProductImages`.
- Support to CSS modules in `SKUSelector`.

## [3.8.5] - 2019-01-25

## [3.8.4] - 2019-01-25

### Added

- Added props that allow search icon to be on left or right in `SearchBar`.

## [3.8.3] - 2019-01-25

### Fixed

- Labels not pointing to input on `ShippingSimulator`.

## [3.8.2] - 2019-01-18

## [3.8.1] - 2019-01-18

### Changed

- Bump dependencies majors.

## [3.8.0] - 2019-01-18

### Changed

- Bump vtex.styleguide to 9.x.

## [3.7.0] - 2019-01-18

### Changed

- Update React builder to `3.x`.

## [3.6.3] - 2019-01-17

### Fixed

- Fixes warning of `propTypes` being passed to `React.forwardRef`.

## [3.6.2] - 2019-01-17

### Fixed

- Use header elements in `ProductName` through tag prop.

## [3.6.1] - 2019-01-17

### Fixed

- Use header elements in `ProductDetails` instead of span tags.

## [3.6.0] - 2019-01-17

### Changed

- Support to CSS modules in `SearchBar`.
- Support to CSS modules in `ProductDescription`.
- Support to CSS modules in `Greeting`.
- Support to CSS modules in `CollectionBadges`.
- Support to CSS modules in `DiscountBadge`.
- Support to CSS modules in `AvailabilitySubscriber`.
- Support to CSS modules in `Logo`.
- Support to CSS modules in `ShippingSimulator`.

## [3.5.8] - 2019-01-15

### Fixed

- Remove logo inline style css.

## [3.5.7] - 2019-01-14

### Changed

- Change default logo to Dreamstore logo.

## [3.5.6] - 2019-01-14

### Fixed

- Add `SearchBar` padding in mobile view.

## [3.5.5] - 2019-01-14

### Changed

- Add CSS modules on `Slider` component.

## [3.5.4] - 2019-01-14

### Fixed

- Remove undefined css classes of `ProductName` component.

## [3.5.3] - 2019-01-10

### Changed

- Change the syntax of routes `/` to `.`.

## [3.5.2] - 2019-01-09

### Changed

- Proxy unused props of the `Container` component to the root element.

## [3.5.1] - 2019-01-09

### Added

- `vtex.shipping-estimate-translator` app to translate and place the correct delivery time on `ShippingSimulator`

## [3.5.0] - 2019-01-09

### Changed

- Bye `pages.json`! Welcome `store-builder`.

## [3.4.0] - 2019-01-09

### Added

- `Container` component.

## [3.3.1] - 2018-12-27

### Fixed

- Fix typing problem and crash on `BuyButton`

## [3.3.0] - 2018-12-20

### Added

- Support to messages builder.

## [3.2.2] - 2018-12-18

### Changed

- Converts `ShippingTableRow` `price` prop value to decimal based number.

## [3.2.1] - 2018-12-18

### Changed

- Support to CSS modules in `ProductName`.

## [3.2.0] - 2018-12-13

### Changed

- BuyButton using `styleguide` `Toast`.

## [3.1.9] - 2018-12-06

### Fixed

- The root div of `DiscountBadge` is now always rendered.

## [3.1.8] - 2018-12-05

### Fixed

- Fix how icons were displayed in `SearchBar`

## [3.1.7] - 2018-12-05

### Fixed

- Make `Logo` properly receive maxWidth and maxHeight properties.

## [3.1.6] - 2018-12-04

- Add typography token to badge
- Add emphasis color to badge instead of red

## [3.1.5] - 2018-12-04

### Changed

- Left margin of the specifications at the ProductDetails component
- Share.label id to store-components.share.label

## [3.1.4] - 2018-12-04

### Fixed

- Negative padding on `Slider` arrows.

## [3.1.3] - 2018-12-04

### Changed

- ShippingSimulator style

## [3.1.2] - 2018-12-03

### Changed

- ProductImages cursor style

## [3.1.1] - 2018-12-03

### Changed

- SKUSelector style

## [3.1.0] - 2018-12-03

### Changed

- Major refactor of ProductImage component
- ProductImage Zoom with two clicks or gesture
- ProductDescription design
- ProductDescription table

### Added

- Frontend Vimeo video support at ProductImage
- Blurred loader to ProductImages
- Collapse to ProductDescription
- Large prop to BuyButton

## [3.0.0] - 2018-11-29

### Added

- Design tokens in `ShippingSimulator`.

### Changed

- Add several props to style the `ProductPrice` component.
- Add several props to style `ProductName` and remove `large` prop from it.
- Add several props to style `Share` component.
- Make `ProductDescription` use design tokens.
- Make `AvailabilitySubscriber` use design tokens.
- Make `SKUSelector` use design tokens.
- Use style guide table in `ProductDescription` component.

### Fixed

- Fix design problems of `ShippingSimulator`.
- Add `classes` and `installmentsClasses` to ProductPrice component to style the component.
- Use style guide table in `ProductDescription` component.
- Make `Slider` receive custom classes.
- Fix negative padding on arrows.

### Removed

- Remove `Header` component.
- Remove `Footer` component.

### Added

- Share label to `Share` component.

## [2.6.10] - 2018-11-28

### Fixed

- `SelectedImage` not fitting properly its container.

## [2.6.9] - 2018-11-26

### Fixed

- Fix svg warnings of `ProductName` and `ProductPrice`.

## [2.6.8] - 2018-11-26

### Added

- Add onSKUSelected to SKUSelector props and call it when its defined.

## [2.6.7] - 2018-11-26

### Fixed

- Slider crashing in store-componentes master

## [2.6.6] - 2018-11-26

### Fixed

- Fix the number of items shown in slider.

## [2.6.5] - 2018-11-26

### Fixed

- Image Zoom in product details was not working properly

## [2.6.4] - 2018-11-20

### Fixed

- Assign correct size to arrow element.

## [2.6.3] - 2018-11-20

### Fixed

- Add `vtex-page-padding` class to Greeting.

## [2.6.2] - 2018-11-13

### Removed

- `Account` component bundle.
- `@vtex/styleguide` dependency.

## [2.6.1] - 2018-11-11

## [2.6.0] - 2018-11-09

### Added

- `Account` shared components.

## [2.5.6] - 2018-11-08

### Fixed

- Removed call to `Array.from` breaking the `Shelf` on Internet Explorer.

## [2.5.5] - 2018-11-07

### Added

- Make the Product Price's label editable through Storefront.

## [2.5.4] - 2018-11-07

## [2.5.3] - 2018-11-07

### Added

- Add `compactMode` props that change the design of `SearchBar` component to a compact layout.

## [2.5.2] - 2018-11-07

### Changed

- Remove `ContentLoader` of `ProductDescription`.

## [2.5.1] - 2018-11-06

### Fixed

- Remove CSS from ProductName and ProductPrice.

## [2.5.0] - 2018-11-06

### Added

- `Greeting` component that renders a welcome message with the user first name

## [2.4.3] - 2018-10-31

### Fixed

- Replace spinner by content loader in BuyButton.

## [2.4.2] - 2018-10-18

### Changed

- `Animation` component to use only CSS instead of `Transition` from the `spring` module.

## [2.4.1] - 2018-10-02

### Changed

- Updated the product price and name colors.

### Fixed

- Discount badge positioning.

## [2.4.0] - 2018-09-28

### Added

- Hability to handle more than one variation on the same sku in the `SKUSelector`

## [2.3.2] - 2018-09-28

### Added

- Availability prop to `BuyButton` component.

## [2.3.1] - 2018-09-20

### Changed

- Update `ProductDescription` css and move to tachyons classes.

## [2.3.0] - 2018-09-17

### Added

- `Header` default padding to match the page's padding.

## [2.2.2] - 2018-09-17

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

- `ImpersonateCustomer` component to `Header`.

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
