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

| Prop name                 | Type                                          | Description                                                                                                                                       | Default value |
| ------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `placeholder`             | `String!`                                     | Placeholder to be used on the input                                                                                                               | -             |
| `emptyPlaceholder`        | `String!`                                     | Shows a placeholder when the ResultList hasn't results to displayed                                                                               | -             |
| `compactMode`             | `Boolean`                                     | Identify when to use the compact version of the component                                                                                         | -             |
| `hasIconLeft`             | `Boolean`                                     | Identify if the search icon is on left or right position                                                                                          | -             |
| `autoFocus`               | `Boolean`                                     | Identify if the search input should autofocus or not                                                                                              | -             |
| `maxWidth`                | `Number` \| `String`                          | Max width of the search bar                                                                                                                       | -             |
| `customSearchPageUrl`     | `string`                                      | Template for a custom url. It can have a substring `${term}` used as placeholder to interpolate the searched term. (e.g. `/search?query=${term}`) | -             |
| ~`iconClasses`~           | `String`                                      | **DEPRECATED** ~Custom classes for the search icon~ Use the CSS handle `searchBarIcon`.                                                           | -             |
| `minSearchTermLength`     | `Number`                                      | If defined, it will block searches where the term length is lesser than `minSearchTermLength`.                                                    | -             |
| `autocompleteAlignment`   | [`HorizontalAlignment`](#horizontalalignment) | Autocomplete Horizontal alignment.                                                                                                                | `left`        |
| `openAutocompleteOnFocus` | `Boolean`                                     | Identify if autocomplete should be open on input focus or not.                                                                                    | `false`       |
| `blurOnSubmit`            | `Boolean`                                     | Identify if input should blur on submit.                                                                                                          | `false`       |
| `autocompleteFullWidth`  | `Boolean`                                     | If true, the autocomplete will fill the whole window horizontally.                                                                                | `false`       |
| `submitOnIconClick`       | `Boolean`                                     | Identify if search icon should submit on click.                                                                                                   | `false`       |
| `toggleableInput`       | `Boolean`                                     | Identify if search input should toggle on click on the search icon.                                                                                                   | `false`       |

### `HorizontalAlignment`

| Enum name | Enum value |
| --------- | ---------- |
| left      | 'left'     |
| center    | 'center'   |
| right     | 'right'    |

### CSS Handles

Below, we describe the namespace that are defined in the `SearchBar`.

| Class name           | Description                                                           | Component Source                                                                 |
| -------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `searchBarContainer` | The main container of `SearchBar`                                     | [SearchBar](/react/components/SearchBar/components/SearchBar.js)                 |
| `compactMode`        | Properties to be applied to the input when `compactMode` prop is true | [AutocompleteInput](/react/components/SearchBar/components/AutocompleteInput.js) |
| `paddingInput`       | The padding of the `SearchBar` input                                  | [AutocompleteInput](/react/components/SearchBar/components/AutocompleteInput.js) |
| `searchBarIcon`      | The class that targets the search bar icon                            | [AutocompleteInput](/react/components/SearchBar/components/AutocompleteInput.js) |
