# Search Bar

## Description

`ResultsList` is a VTEX Component that represents the autocomplete from the search bar. This component can be imported and used by any VTEX App.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents

- [Usage](#usage)
  - [Props](#props)
  - [CSS Handles](#css-handles)

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

Then, add `autocomplete-result-list` block into your app theme.

### Props

This autocomplete is commonly used with [Downshift](https://github.com/downshift-js/downshift). Some of its props are directly related to it.

| Prop name                      | Type       | Description                                                                                                                                       | Default value |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `data`                         | `Object`   | Graphql data response                                                                                                                             | `{}`          |
| `inputValue`                   | `String`   | Search query                                                                                                                                      | -             |
| `onClearInput`                 | `Function` | Clears the input                                                                                                                                  | -             |
| `getItemProps` (Downshift)     | `Function` | Returns the props you should apply to any menu item elements you render                                                                           | -             |
| `closeMenu` (Downshift)        | `Function` | closes the menu                                                                                                                                   | -             |
| `highlightedIndex` (Downshift) | `Number`   | The index that should be highlighted                                                                                                              | -             |
| `getMenuProps` (Downshift)     | `Function` | returns the props you should apply to the ul element (or root of your menu) that you render                                                       | -             |
| `customSearchPageUrl`          | `String`   | Template for a custom url. It can have a substring `${term}` used as placeholder to interpolate the searched term. (e.g. `/search?query=${term}`) | -             |
| `isOpen`                       | `Boolean`  | Identify if autocomplete should be open                                                                                                           | -             |
| `attemptPageTypeSearch`        | `Boolean`  | if `true`, uses the term the user has inputted to try to navigate to the proper page type (e.g. a department, a brand, a category)                | -             |

### CSS Handles

Below, we describe the namespace that are defined in the `ResultsList`.

| Class name         | Description                                     | Component Source                                                     |
| ------------------ | ----------------------------------------------- | -------------------------------------------------------------------- |
| `resultsList`      | The list containing the results of the search   | [ResultsList](/react/components/SearchBar/components/ResultsList.js) |
| `resultsItemImage` | The image from a product returned by the search | [ResultsList](/react/components/SearchBar/components/ResultsList.js) |
