# BuyButton

BuyButton is a canonical component that any VTEX store can install.

## Usage

TODO

## Configuration

```javascript
/**
 * The quantity of products to be added to the cart
 */
- quantity
  - Type: Number

/**
 * The specification of wich product will be added to the cart.
 */
- skuId
  - Type: Number

/**
 * Wich seller is being referenced by the button.
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
 * The users cart id
 */
- orderFormId
  - Type: String
```

## Troubleshooting

You can check if others are experiencing similar issues [here](https://github.com/vtex-apps/buy-button/issues). Also feel free to [open issues](https://github.com/vtex-apps/buy-button/issues/new).

## Contributing

TODO
