>📢 **Disclaimer** Don't fork this project. Use it, [contribute](https://github.com/vtex-apps/store-components) to it or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion) to help us evolve it.

# Autocomplete Result List

The `autocomplete-result-list` component displays the autocomplete functionality in the search bar. This component serves mainly to ease the creation of custom autocomplete components for search engines.

![autocomplete-bar-gif](https://user-images.githubusercontent.com/67270558/147763822-a47487e7-35d1-4d42-a30e-2b505209b5f2.gif)

## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json` file as in the following example:

```json
  "dependencies": {
    "vtex.store-components": "3.x"
  }
```

2. Add the `autocomplete-result-list` block into the `search-bar` component. For example:

```diff
  "search-bar": {
    "blocks": [
+     "autocomplete-result-list"
    ]
  }
```

3. Then, declare the `autocomplete-result-list` block using the props stated in the [Props](#props) table.

### Props

> ℹ️ Info
>
> The `autocomplete-result-list` block is commonly used with [Downshift](https://github.com/downshift-js/downshift). Hence, some of its props are directly related to it.

| Prop name                      | Type               | Description                                                                                                                                                                                                                                              | Default value |
| ------------------------------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `attemptPageTypeSearch`        | `Boolean`          | Uses the input term to try to navigate to the proper page type (e.g. a department, a brand, a category) if `true`.                                                                                                                                       | -             |
| `classes`                      | `CustomCSSClasses` | Overrides default CSS handles. To better understand how this prop works, check [this document](https://github.com/vtex-apps/css-handles#usecustomclasses). Note that this is only helpful if you're using this block as a React component.| `undefined`   |
| `closeMenu` (Downshift)        | `Function`         | Closes the menu.                                                                                                                                                                                                                                         | -             |
| `customSearchPageUrl`          | `String`           | Template for a custom URL. It accepts a substring `${term}` as placeholder to interpolate the searched term (e.g., `/search?query=${term}`).                                                                                                             | -             |
| `data`                         | `Object`           | Graphql data response.                                                                                                                                                                                                                                   | `{}`          |
| `highlightedIndex` (Downshift) | `Number`           | The index that should be highlighted.                                                                                                                                                                                                                    | -             |
| `getItemProps` (Downshift)     | `Function`         | Returns the props for every menu item element being rendered.                                                                                                                                                                                            | -             |
| `getMenuProps` (Downshift)     | `Function`         | Returns the props for the `ul` or root element of your menu.                                                                                                                                                                                             | -             |
| `inputValue`                   | `String`           | Search query.                                                                                                                                                                                                                                            | -             |
| `onClearInput`                 | `Function`         | Clears the input.                                                                                                                                                                                                                                        | -             |
| `isOpen`                       | `Boolean`          | Identifies if the autocomplete should be opened.                                                                                                                                                                                                         | -             |

## Customization 

To apply CSS customizations in this and other blocks, follow the [Using CSS handles for store customization](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-using-css-handles-for-store-customization) guide.

| CSS Handles             |
| ----------------------- |
| `resultsItem`           |
| `resultsItemImage`      |
| `resultsItemName`       |
| `resultsList`           |
| `searchTerm`            |
| `spinnerContainer`      |
| `spinnerInnerContainer` |
