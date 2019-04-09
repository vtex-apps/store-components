import { clone } from 'ramda'

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
 * Retrieves a list of unique options of a given variation
 * @param {string} variation
 * @param {skus} skus
 */
export const getVariationOptions = (variation, skus) => {
  const hTable = {}

  skus.reverse().map(sku => {
    const value = sku[variation]
    hTable[value] = sku
  })

  return Object.values(hTable).sort((a, b) => a[variation] - b[variation])
}

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
