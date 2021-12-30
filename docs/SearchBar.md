>📢 **Disclaimer** Don't fork this project. Use it, [contribute](https://github.com/vtex-apps/store-components) to it or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion) to help us evolve it.

# Search Bar

The `search-bar` component shows a search bar with autocomplete options and displays the matching products as well. This component can be imported and used by any VTEX App.

![search-bar](https://user-images.githubusercontent.com/67270558/147773132-c3e9d1ee-7878-465d-95b3-69903ded5937.png)
## Configuration

1. Import the `vtex.store-components` app to your theme's dependencies in the `manifest.json` file as in the following example:

```json
 "dependencies": {
    "vtex.store-components": "3.x"
  }
 ```
  
2. Add the `search-bar` block into the [`header`](https://developers.vtex.com/vtex-developer-docs/docs/vtex-store-header/) component. For example:

```diff
  "header.full": {
    "blocks": [
      "login",
      "minicart",
      "logo",
+     "search-bar",
      "menu-link",
      "telemarketing",
      "category-menu"
    ]
  },
```

3. Then, declare the `search-bar` block using the props stated in the [Props](#props) table. For example:

### Props

| Prop name                 | Type                                          | Description                                                                                                                                                                                       | Default value  |
| ------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `attemptPageTypeSearch`   | `Boolean`                                     | If `true` when clicked on result link of brand, department or category will link to the corresponding brand, department or category page. When `false` will always go to a full text search page. | `false`        |
| `autocompleteAlignment`   | [`HorizontalAlignment`](#horizontalalignment) | Autocomplete Horizontal alignment. Possible values are: `left`, `center`, `right`.                                                                                                                                                               | `left`         |
| `autocompleteFullWidth`   | `Boolean`                                     | If true, the autocomplete will fill the whole window horizontally.                                                                                                                                | `false`        |
| `autoFocus`               | `Boolean`                                     | Define if the search input should autofocus or not                                                                                                                                              | -              |
| `blurOnSubmit`            | `Boolean`                                     | Define if input should blur on submit.                                                                                                                                                          | `false`        |
| `classes` | `CustomCSSClasses` | Overrides default CSS handles. To better understand how this prop works, check [this document](https://github.com/vtex-apps/css-handles#usecustomclasses). Note that this is only helpful if you're using this block as a React component.| `undefined` |
| `containerMode` | `enum` | Defines how the autocomplete component should be displayed. Possible values are: `overlay` (suggestions overlapping other components) and `container` (displays the suggestion within a container). | `overlay` |
| `compactMode`             | `Boolean`                                     | Define when to use the compact version of the component                                                                                                                                         | -              |
| `customSearchPageUrl`     | `string`                                      | Template for a custom url. It can have a substring `${term}` used as placeholder to interpolate the searched term. (e.g. `/search?query=${term}`)                                                 | -              |
| `disableBlurAndTouchEndHandler` | `Boolean` | The autocomplete can have touchable/clickable components. Interacting with those components may trigger blur and touch events that will close the autocomplete. When set to true, this prop will disable those handlers. | `false` |
| `displayMode`             | [`DisplayMode`](#displaymode)                 | Define the component display mode, such as which buttons should be visible.                                                                                                                         | `clear-button` |
| `emptyPlaceholder`        | `String!`                                     | Shows a placeholder when the ResultList hasn't results to displayed                                                                                                                               | -              |
| `hasIconLeft`             | `Boolean`                                     | Define if the search icon is on left or right position                                                                                                                                          | -              |
| `iconClasses`           | `String`                                      | ![DEPRECATED](https://img.shields.io/badge/-deprecated-red) Custom classes for the search icon. Use the CSS handle `searchBarIcon`.                                                              | -              |
| `inputType` | `enum` | Defines the value for the `type` HTML attribute (from the `<input>` field). Possible values are: `search` and `text`. We strongly recommend you to use `search` as it fixes some iOS issues. The `text` value is only kept as default for backwards compatibility. | `text` |
| `maxWidth`                | `Number` \| `String`                          | Max width of the search bar                                                                                                                                                                       | -              |
| `minSearchTermLength`     | `Number`                                      | If defined, it will block searches where the term length is lesser than `minSearchTermLength`.                                                                                                    | -              |
| `openAutocompleteOnFocus` | `Boolean`                                     | Defines if autocomplete should be open on input focus or not.                                                                                                                                    | `false`        |
| `placeholder`             | `String!`                                     | Placeholder to be used on the input                                                                                                                                                               | -              |
| `submitOnIconClick`     | `Boolean`                                     | ![DEPRECATED](https://img.shields.io/badge/-deprecated-red) Defines if search icon should submit on click. Use the `displayMode` prop instead.                                               | `false`        |

#### `DisplayMode`

| Enum name                  | Enum value                   | Empty state                                                                                                                             | Filled state                                                                                                                             |
| -------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `clear-button`             | `'clear-button'`             | ![clear-button-empty](https://user-images.githubusercontent.com/12702016/74764904-5cc5e580-5261-11ea-9df8-484cf457c266.png)             | ![clear-button-filled](https://user-images.githubusercontent.com/12702016/74764917-60f20300-5261-11ea-8911-11c8fd9582d9.png)             |
| `search-and-clear-buttons`            | `'search-and-clear-buttons'`            | ![search-and-clear-buttons-empty](https://user-images.githubusercontent.com/12702016/74764924-62bbc680-5261-11ea-9f1d-2118274da996.png) | ![search-and-clear-buttons-filled](https://user-images.githubusercontent.com/12702016/74764928-64858a00-5261-11ea-9ed2-42da887e6641.png) |
| `search-button` | `'search-button'` | ![search-button-empty](https://user-images.githubusercontent.com/12702016/74764929-65b6b700-5261-11ea-815c-ecc9f0c44e0f.png)            | ![search-button-filled](https://user-images.githubusercontent.com/12702016/74764934-66e7e400-5261-11ea-8a86-59da9a1c0faa.png)            |

## Customization

To apply CSS customizations in this and other blocks, follow the [Using CSS handles for store customization](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-using-css-handles-for-store-customization) guide.

| CSS Handles                       | 
| --------------------------------  | 
| `compactMode`                     | 
| `externalSearchButtonWrapper`     |
| `paddingInput`                    |
| `searchBarContainer`              |
| `searchBarInnerContainer--opened` |
| `searchBarInnerContainer--filled` | 
| `searchBarIcon`                   |
| `searchBarIcon--clear`            | 
| `searchBarIcon--external-search`  | 
| `searchBarIcon--prefix`           | 
| `searchBarIcon--search`           | 
| `suffixWrapper`                  |
