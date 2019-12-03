# Shipping Simulator

## Description

Shipping Simulator is a VTEX component that estimates the shipping fee based on the zip code. This component can be imported and used by any VTEX app.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Table of Contents

- [Usage](#usage)
  - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS Namespaces](#css-namespaces)

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/store-components/blob/master/README.md#usage).

To import it into your code:

```js
import { ShippingSimulator } from "vtex.store-components";
```

You can use it in your code like a React component with the jsx tag: `<ShippingSimulator />`.

```jsx
<ShippingSimulator skuId="3" seller="1" />
```

### Configuration

| Prop name | Type      | Description                   | Default value |
| --------- | --------- | ----------------------------- | ------------- |
| `skuId`   | `String!` | Id of the current product SKU | -             |
| `seller`  | `String!` | Id of the product seller      | -             |

### Styles API

You should follow the Styles API instruction in the main [README](/README.md#styles-api).

#### Customization

| CSS Handle                   | Description                                                | Component Source                                                                       |
| ---------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `shippingContainer`          | The main container of the `shippingCalculator`             | [index](/react/components/ShippingSimulator/index.js)                                  |
| `shippingContainerLoader`    | The container for the spinner loader                       | [index](/react/components/ShippingSimulator/index.js)                                  |
| `shippingZipcodeLabelLoader` | The container for the ZIP code loader                      | [index](/react/components/ShippingSimulator/index.js)                                  |
| `shippingInputLoader`        | The container for the ZIP code input loader                | [index](/react/components/ShippingSimulator/index.js)                                  |
| `shippingZipcodeLabel`       | The shipping label                                         | [index](/react/components/ShippingSimulator/index.js)                                  |
| `shippingNoMessage`          | The message when the store does not have a shipping method | [ShippingTable](/react/components/ShippingSimulator/components/ShippingTable.js)       |
| `shippingTable`              | The table for the shipping methods                         | [ShippingTable](/react/components/ShippingSimulator/components/ShippingTable.js)       |
| `shippingTableCell`          | The cell of a table                                        | [ShippingTableRow](/react/components/ShippingSimulator/components/ShippingTableRow.js) |
| `shippingTableLabel`         | The label describing a shipping method                     | [ShippingTableRow](/react/components/ShippingSimulator/components/ShippingTableRow.js) |
| `shippingTableRadioBtn`      | The radio button to select a shipping method               | [ShippingTableRow](/react/components/ShippingSimulator/components/ShippingTableRow.js) |

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization). 
