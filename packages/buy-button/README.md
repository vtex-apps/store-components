# BuyButton

BuyButton is a canonical component that any VTEX store can install.

## Disclaimer

This component still under construction. Everything may - and will - break. Use with caution, and avoid for now its use in Production projects.

## Install

```sh
yarn add @vtex/buy-button
# or
npm install @vtex/buy-button
```

## Configuration

```javascript
/**
 * The quantity of products to be added to the cart
 */
- quantity
  - Type: Number

/**
 * The specification of which product will be added to the cart.
 */
- skuId
  - Type: Number

/**
 * Which seller is being referenced by the button.
 */
- seller
  - Type: String

/**
 * Sales channel.
 */
- salesChannel
  - Type: String

/**
 * Graphql property to call a mutation.
 */
- mutate
  - Type: Function

/**
 * Function that will be called after the mutation.
 */
- afterClick
  - Type: Function

/**
 * The user's cart id
 */
- orderFormId
  - Type: String
```
