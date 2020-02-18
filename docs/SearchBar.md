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
| `autoFocus`               | `Boolean`                                     | Identify if the search input should autofocus or not                                                                                                                                              | -              |
| `blurOnSubmit`            | `Boolean`                                     | Identify if input should blur on submit.                                                                                                                                                          | `false`        |
| `compactMode`             | `Boolean`                                     | Identify when to use the compact version of the component                                                                                                                                         | -              |
| `customSearchPageUrl`     | `string`                                      | Template for a custom url. It can have a substring `${term}` used as placeholder to interpolate the searched term. (e.g. `/search?query=${term}`)                                                 | -              |
| `emptyPlaceholder`        | `String!`                                     | Shows a placeholder when the ResultList hasn't results to displayed                                                                                                                               | -              |
| `hasIconLeft`             | `Boolean`                                     | Identify if the search icon is on left or right position                                                                                                                                          | -              |
| ~`iconClasses`~           | `String`                                      | **DEPRECATED** ~Custom classes for the search icon~ Use the CSS handle `searchBarIcon`.                                                                                                           | -              |
| `maxWidth`                | `Number` \| `String`                          | Max width of the search bar                                                                                                                                                                       | -              |
| `minSearchTermLength`     | `Number`                                      | If defined, it will block searches where the term length is lesser than `minSearchTermLength`.                                                                                                    | -              |
| `openAutocompleteOnFocus` | `Boolean`                                     | Identify if autocomplete should be open on input focus or not.                                                                                                                                    | `false`        |
| `placeholder`             | `String!`                                     | Placeholder to be used on the input                                                                                                                                                               | -              |
| ~`submitOnIconClick`~     | `Boolean`                                     | **DEPRECATED** - ~Identify if search icon should submit on click.~ Use the `displayMode` prop instead.                                                                                            | `false`        |
| `displayMode`             | [`DisplayMode`](#displaymode)                 | Define the component display mode,such as which buttons should be visible                                                                                                                         | `clear-button` |

### `DisplayMode`

| Enum name                  | Enum value                   | Empty state                                                                                                                             | Filled state                                                                                                                             |
| -------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `clear-button`             | `'clear-button'`             | ![clear-button-empty](https://user-images.githubusercontent.com/12702016/74764904-5cc5e580-5261-11ea-9df8-484cf457c266.png)             | ![clear-button-filled](https://user-images.githubusercontent.com/12702016/74764917-60f20300-5261-11ea-8911-11c8fd9582d9.png)             |
| `search-button`            | `'search-button'`            | ![search-and-clear-buttons-empty](https://user-images.githubusercontent.com/12702016/74764924-62bbc680-5261-11ea-9f1d-2118274da996.png) | ![search-and-clear-buttons-filled](https://user-images.githubusercontent.com/12702016/74764928-64858a00-5261-11ea-9ed2-42da887e6641.png) |
| `search-and-clear-buttons` | `'search-and-clear-buttons'` | ![search-button-empty](https://user-images.githubusercontent.com/12702016/74764929-65b6b700-5261-11ea-815c-ecc9f0c44e0f.png)            | ![search-button-filled](https://user-images.githubusercontent.com/12702016/74764934-66e7e400-5261-11ea-8a86-59da9a1c0faa.png)            |

### `HorizontalAlignment`

| Enum name | Enum value |
| --------- | ---------- |
| `left`    | `'left'`   |
| `center`  | `'center'` |
| `right`   | `'right'`  |

### CSS Handles

Below, we describe the namespace that are defined in the `SearchBar`.

| Class name            | Description                                                           | Component Source                                                                 |
| --------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `searchBarContainer`  | The main container of `SearchBar`                                     | [SearchBar](/react/components/SearchBar/components/SearchBar.js)                 |
| `compactMode`         | Properties to be applied to the input when `compactMode` prop is true | [AutocompleteInput](/react/components/SearchBar/components/AutocompleteInput.js) |
| `paddingInput`        | The padding of the `SearchBar` input                                  | [AutocompleteInput](/react/components/SearchBar/components/AutocompleteInput.js) |
| `searchBarIcon`       | Targets the search bar icon                                           | [AutocompleteInput](/react/components/SearchBar/components/AutocompleteInput.js) |
| `searchBarSearchIcon` | Targets the search bar _search_ icon                                  | [AutocompleteInput](/react/components/SearchBar/components/AutocompleteInput.js) |
| `searchBarClearIcon`  | Targets the search bar _clear_ icon                                   | [AutocompleteInput](/react/components/SearchBar/components/AutocompleteInput.js) |
