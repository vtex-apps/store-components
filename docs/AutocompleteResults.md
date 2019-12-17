📢 Use, [contribute](https://github.com/vtex-apps/store-components) or open issues for this project through [Store Discussion](https://github.com/vtex-apps/store-discussion).

# AutocompleteResults

`autocomplete-result-list` is a VTEX Component that represents the autocomplete from the search bar. This component can be imported and used by any VTEX App.

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json`, for example:

```json
  dependencies: {
    "vtex.store-components": "3.x"
  }
```

2. Add the `autocomplete-result-list` block into the `search-bar` blocks, for example:

```json
"search-bar#my-search-bar": {
    "blocks": ["autocomplete-result-list.v2#my-autocomplete"]
}
```

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

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| Class name         | Description                                     | Component Source                                                     |
| ------------------ | ----------------------------------------------- | -------------------------------------------------------------------- |
| `resultsList`      | The list containing the results of the search   | [ResultsList](/react/components/SearchBar/components/ResultsList.js) |
| `resultsItemImage` | The image from a product returned by the search | [ResultsList](/react/components/SearchBar/components/ResultsList.js) |
