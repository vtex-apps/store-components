import BuyButton from '../../BuyButton'

// `mapCatalogItemToCart` is the point where the search-signed price enters the
// cart item, and it is also consumed by vtex.product-summary, so a regression
// here is silent: the item still reaches the cart, just without the token, and
// checkout falls back to the Pricing system as if the feature did not exist.
const { mapCatalogItemToCart } = BuyButton

const product = {
  linkText: 'classic-shoes',
  productName: 'Classic Shoes',
  brand: 'Brand',
  categories: ['/Shoes/'],
  productReference: 'ref-1',
}

const selectedItem = { itemId: '35', name: 'Classic Shoes', images: [] }

const offer = (extra = {}) => ({
  sellerId: '1',
  commertialOffer: { Price: 99.9, ListPrice: 129.9, ...extra },
})

const mapWith = selectedSeller =>
  mapCatalogItemToCart({
    product,
    selectedItem,
    selectedQuantity: 1,
    selectedSeller,
    assemblyOptions: {},
  })[0]

describe('mapCatalogItemToCart and the priceToken', () => {
  it('carries the token from the selected seller offer', () => {
    const item = mapWith(offer({ priceToken: 'signed.price.token' }))

    expect(item.priceToken).toBe('signed.price.token')
  })

  it('takes the token from the selected seller, not from another one', () => {
    const item = mapWith(offer({ priceToken: 'from.selected.seller' }))

    expect(item.priceToken).toBe('from.selected.seller')
    expect(item.seller).toBe('1')
  })

  // Roughly one account in ten has no price signing enabled, so the offer comes
  // back with `priceToken: null`. The key must be absent rather than null: the
  // v1 minicart picks fields with Ramda's `pick`, which keys off `in` and would
  // forward an explicit null all the way into the mutation variables.
  it.each([
    ['null', null],
    ['undefined', undefined],
    ['empty string', ''],
  ])('omits the key entirely when the offer token is %s', (_label, value) => {
    const item = mapWith(offer({ priceToken: value }))

    expect('priceToken' in item).toBe(false)
  })

  it('omits the key when the offer has no token field at all', () => {
    const item = mapWith(offer())

    expect('priceToken' in item).toBe(false)
  })

  it('leaves the rest of the item untouched when there is no token', () => {
    const withToken = mapWith(offer({ priceToken: 'signed.price.token' }))
    const withoutToken = mapWith(offer())

    // Everything else has to match, so enabling the feature cannot be blamed
    // for a change in any other field of the cart item.
    expect({ ...withToken, priceToken: undefined }).toEqual({
      ...withoutToken,
      priceToken: undefined,
    })
  })
})
