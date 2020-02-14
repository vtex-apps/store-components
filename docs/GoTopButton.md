# Go top Button

## Description

`GoTopButton` is a component of VTEX that when clicked, goes back to the top of the page. This Component can be imported and used by any VTEX app.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)

## Usage

- You must place it in the part of the block where you want it, this component will appear only for mobile devices

``
    "store.home": {
    "blocks": [
    ' "..."
      "go-top-button"
    ]
  },

``


### Configuration

| Prop name | Type | Description | Default Value |
| --------- | ---- | ----------- | ----------- |
| `topPixel` | `Number!` | Height of the page the button will appear on | - |

### Styles API

You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### CSS Namespaces
Below, we describe the namespace that are defined in the `GoTopButton`.

| Class name | Description | Component Source |
| ---------- | ----------- | ---------------- |
| `goTopButtonContainer` | The bottom of the collapse | [GoTopButton](/react/components/GoTopButton/GoTopButton.js) |
