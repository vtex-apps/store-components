# Search Bar

## Description

`Search Bar` is a VTEX Component that shows a search bar with autocomplete options and displays the matching products as well. This component can be imported and used by any VTEX App.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents

- [Usage](#usage)
  - [Props](#props)
  - [CSS Handles](#css-handles)

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

Then, add `search-bar` block into your app theme, as we do in our [Store Header](https://github.com/vtex-apps/store-header/blob/master/store/blocks.json).

### Props

| Prop name                 | Type                                          | Description                                                                                                                                                                                       | Default value  |
| ------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `attemptPageTypeSearch`   | `Boolean`                                     | If `true` when clicked on result link of brand, department or category will link to the corresponding brand, department or category page. When `false` will always go to a full text search page. | `false`        |
| `autocompleteAlignment`   | [`HorizontalAlignment`](#horizontalalignment) | Autocomplete Horizontal alignment.                                                                                                                                                                | `left`         |
| `autocompleteFullWidth`   | `Boolean`                                     | If true, the autocomplete will fill the whole window horizontally.                                                                                                                                | `false`        |
| `autoFocus`               | `Boolean`                                     | Define if the search input should autofocus or not                                                                                                                                              | -              |
| `blurOnSubmit`            | `Boolean`                                     | Define if input should blur on submit.                                                                                                                                                          | `false`        |
| `compactMode`             | `Boolean`                                     | Define when to use the compact version of the component                                                                                                                                         | -              |
| `customSearchPageUrl`     | `string`                                      | Template for a custom url. It can have a substring `${term}` used as placeholder to interpolate the searched term. (e.g. `/search?query=${term}`)                                                 | -              |
| `displayMode`             | [`DisplayMode`](#displaymode)                 | Define the component display mode, such as which buttons should be visible.                                                                                                                         | `clear-button` |
| `emptyPlaceholder`        | `String!`                                     | Shows a placeholder when the ResultList hasn't results to displayed                                                                                                                               | -              |
| `hasIconLeft`             | `Boolean`                                     | Define if the search icon is on left or right position                                                                                                                                          | -              |
| `maxWidth`                | `Number` \| `String`                          | Max width of the search bar                                                                                                                                                                       | -              |
| `minSearchTermLength`     | `Number`                                      | If defined, it will block searches where the term length is lesser than `minSearchTermLength`.                                                                                                    | -              |
| `openAutocompleteOnFocus` | `Boolean`                                     | Define if autocomplete should be open on input focus or not.                                                                                                                                    | `false`        |
| `placeholder`             | `String!`                                     | Placeholder to be used on the input                                                                                                                                                               | -              |
| `inputType` | `enum` | Defines the value for the `type` HTML attribute (from the `<input>` field). Possible values are: `search` and `text`. We strongly recommend you to use `search` as it fixes some iOS issues. The `text` value is only kept as default for backwards compatibility. | `text` |
| `containerMode` | `enum` | Defines how the autocomplete component should be displayed. Possible values are: `overlay` (suggestions overlapping other components) and `container` (displays the suggestion within a container). | `overlay` |
| ~`iconClasses`~           | `String`                                      | ![DEPRECATED](https://img.shields.io/badge/-deprecated-red) ~Custom classes for the search icon~ Use the CSS handle `searchBarIcon`.                                                              | -              |
| ~`submitOnIconClick`~     | `Boolean`                                     | ![DEPRECATED](https://img.shields.io/badge/-deprecated-red) - ~Define if search icon should submit on click.~ Use the `displayMode` prop instead.                                               | `false`        |
| `classes` | `CustomCSSClasses` | Used to override default CSS handles. To better understand how this prop works, we recommend reading about it [here](https://github.com/vtex-apps/css-handles#usecustomclasses). Note that this is only useful if you're using this block as a React component. | `undefined` |

### `DisplayMode`

| Enum name                  | Enum value                   | Empty state                                                                                                                             | Filled state                                                                                                                             |
| -------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `clear-button`             | `'clear-button'`             | ![clear-button-empty](https://user-images.githubusercontent.com/12702016/74764904-5cc5e580-5261-11ea-9df8-484cf457c266.png)             | ![clear-button-filled](https://user-images.githubusercontent.com/12702016/74764917-60f20300-5261-11ea-8911-11c8fd9582d9.png)             |
| `search-and-clear-buttons`            | `'search-and-clear-buttons'`            | ![search-and-clear-buttons-empty](https://user-images.githubusercontent.com/12702016/74764924-62bbc680-5261-11ea-9f1d-2118274da996.png) | ![search-and-clear-buttons-filled](https://user-images.githubusercontent.com/12702016/74764928-64858a00-5261-11ea-9ed2-42da887e6641.png) |
| `search-button` | `'search-button'` | ![search-button-empty](https://user-images.githubusercontent.com/12702016/74764929-65b6b700-5261-11ea-815c-ecc9f0c44e0f.png)            | ![search-button-filled](https://user-images.githubusercontent.com/12702016/74764934-66e7e400-5261-11ea-8a86-59da9a1c0faa.png)            |

### `HorizontalAlignment`

| Enum name | Enum value |
| --------- | ---------- |
| `center`  | `'center'` |
| `left`    | `'left'`   |
| `right`   | `'right'`  |

### CSS Handles

Below, we describe the namespace that are defined in the `SearchBar`.

| Class name                        | 
| --------------------------------  | 
| `compactMode`                     | 
| `externalSearchButtonWrapper`     |
| `paddingInput`                    |
| `searchBarContainer`              |
| `searchBarInnerContainer--opened` |
| `searchBarInnerContainer--filled` | 
| `searchBarIcon--clear`            | 
| `searchBarIcon--external-search`  | 
| `searchBarIcon--prefix`           | 
| `searchBarIcon--search`           | 
| `searchBarIcon`                   |
| `suffixWrapper`                  |
