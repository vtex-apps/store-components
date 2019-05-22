# LocaleSwitcher

## Description

`LocaleSwitcher` is a VTEX component that changes the language of the store. 
This component can be imported and used by any VTEX app.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
  - [Styles API](#styles-api)

## Usage

You should follow the usage instruction in the main [README](/README.md#usage).

Then, add `locale-switcher` block into your app theme, as we do in our [Header app](https://github.com/vtex-apps/store-header/blob/master/store/blocks.json)

### Blocks API

When implementing this component as a block, various inner blocks may be available. The following interface lists the available blocks within `LocaleSwitcher` and describes if they are required or optional.

```json
  "locale-switcher": {
    "component": "LocaleSwitcher"
  }
```

For now this block does not have any required or optional blocks.


### Styles API
You should follow the Styles API instruction in the main [README](/README.md#styles-api).