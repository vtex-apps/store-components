# Title

## Description

`Title` is a VTEX Component that shows the given text input as a title.
This Component can be imported and used by any VTEX App.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
  - [Configuration](#configuration)
  - [Styles API](#styles-api)

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

Then, add `title` block into our app theme. 

### Blocks API

This component has an interface that describes which rules must be implemented by a block when you want to use the `Title`.

```json
  "title": {
    "component": "Title"
  }
```

### Configuration

Through the Storefront, you can change the `Title`'s behavior and interface. However, you also can make in your theme app, as Dreamstore does.

| Prop name | Type | Description |
| --- | --- | --- |
| `content` | `String` | Text to be displayed |
| `alignment` | `String` | Title alignment (left, right or center) |

### Styles API
:construction: :construction: :construction: