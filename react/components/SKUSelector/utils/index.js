import { clone, values, compose, map, nth, groupBy } from 'ramda'

/**
 * Return the maximum sku price
 * @param {array of sku's} items
 */
export const getMaxSkuPrice = items => {
  if (!items) return 0

  return items.reduce((max, sku) => {
    const [
      {
        commertialOffer: { Price },
      },
    ] = sku.sellers

    return Math.max(max, Price)
  })
}

/**
 * Remove the 'https' from the given url
 * @param {string} url
 */
export const stripUrl = url => url.replace(/^https?:/, '')

/**
 * Parse the variations field in the sku object
 * @param {sku} sku
 */
export const parseSku = sku => {
  const result = clone(sku)

  const variations = sku.variations.map(variation => {
    result[variation.name] = variation.values[0]
    return variation.name
  })

  result.variations = variations

  return result
}

/**
 * Group the sku items by the variation name specified
 */
export const groupItemsByVariation = (name, items) =>
  compose(
    map(nth(0)),
    values,
    groupBy(sku => sku[name])
  )(items)

/**
 * Verifies if the variation is color
 * @param {string} variation
 */
export const isColor = variation => {
  if (!variation) return false

  return (
    variation.toLowerCase() === 'cor' || variation.toLowerCase() === 'color'
  )
}

/**
 * Choose wich variation will be the main one.
 * @param {Array[string]} variations
 */
export const getMainVariationName = variations => {
  for (let i = 0; i < variations.length; i++) {
    if (isColor(variations[i])) return variations[i]
  }

  return variations[0]
}
