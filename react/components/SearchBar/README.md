# Search Bar

## Description
`Search Bar` is a VTEX Component that shows a search bar with autocomplete options and displays the matching products as well. This component can be imported and used by any VTEX App.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

Then, add `search-bar` block into your app theme, as we do in our [Store Header](https://github.com/vtex-apps/store-header/blob/master/store/blocks.json). 

### Blocks API

When implementing this component as a block, various inner blocks may be available. The following interface lists the available blocks within `SearchBar` and describes if they are required or optional.

```json
  "search-bar": {
    "component": "SearchBar"
  }
```

For now this block does not have any required or optional blocks.

#### Configuration

Through the Storefront, you can change the `SearchBar`'s behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name          | Type      | Description                                                          | Default value
| ------------------ | --------- | -------------------------------------------------------------------- |------------- |
| `placeholder`      | `String!`  | Placeholder to be used on the input                             | - |
| `emptyPlaceholder` | `String!`  | Shows a placeholder when the ResultList hasn't results to displayed  | - |
| `compactMode` | `Boolean`  | Identify when to use the compact version of the component  | - |
| `hasIconLeft` | `Boolean`  | Identify if the search icon is on left or right position  | - |
| `iconClasses` | `String`  | Custom classes for the search icon  | - |

### Styles API
You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces
Below, we describe the namespace that are defined in the `SearchBar`.

| Class name | Description | Component Source |
| ---------- | ----------- | ---------------- |
| `searchBarContainer` | The main container of `SearchBar` | [SearchBar](/react/components/SearchBar/components/SearchBar.js) |
| `resultsList` | The list containing the results of the search | [ResultsList](/react/components/SearchBar/components/ResultsList.js) |
| `resultsItemImage` | The image from a product returned by the search | [ResultsList](/react/components/SearchBar/components/ResultsList.js) |
| `compactMode` | Properties to be applied to the input when `compactMode` prop is true | [AutocompleteInput](/react/components/SearchBar/components/AutocompleteInput.js) |
| `paddingInput` | The padding of the `SearchBar` input | [AutocompleteInput](/react/components/SearchBar/components/AutocompleteInput.js) |