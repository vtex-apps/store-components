# Newsletter

## Description

`Newsletter` is a VTEX component that displays a newsletter form. 
This component can be imported and used by any VTEX app.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](/README.md#usage).

Then, add `newsletter` block into your app theme.

Example:

```json
  "store.home": {
    "blocks": [
      "carousel#home",
      "shelf#home",
      "newsletter"
    ]
  },
```

#### Configuration

Through the Storefront, you can change the `Newsletter`'s behavior and interface. However, you also can make in your theme app.

| Prop name | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| `label` | `String` | Label of the form used by the component | `Subscribe to our newsletter` (translated text) |
| `placeholder` | `String` | Placeholder of the email input | `Enter your email address` (translated text) |
| `submit` | `String` | Label of the submit button | `Sign up` (translated text) |
| `renderFirstName` | `Boolean` | Show FirstName | `false` |
| `namePlaceholder` | `String` | Placeholder of the name input | `Enter your name` (translated text) |
| `hideLabel` | `Boolean` | Hide label | `false` |

### Styles API
You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces
Below, we describe the namespace that are defined in the `Newsletter`.

| Class name | Description | Component Source |
| ---------- | ----------- | ---------------- |
| `newsletter` | Outmost element | [index](./index.js)
| `container` | Container element | [index](./index.js)
| `form` | Form element | [index](./index.js)
| `inputGroup` | Element that wraps input | [index](./index.js)
| `buttonContainer` | Element that wraps the button | [index](./index.js)
| `label` | Label of the input | [index](./index.js)
| `error` | Error messsage | [index](./index.js)
| `confirmation` | Class added to `newsletter` when user submit email | [index](./index.js)
| `confirmationTitle` | Title showed when user submit email | [index](./index.js)
| `confirmationText` | Text showed when user submit email | [index](./index.js)
