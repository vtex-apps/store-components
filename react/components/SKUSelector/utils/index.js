import { clone } from 'ramda'

/**
 * Return the maximum sku price
 * @param {array of sku's} items 
 */
export const getMaxSkuPrice = items => {
  let maxPrice = 0
  if (items) {
    items.forEach(item => {
      const [{ commertialOffer: { Price } }] = item.sellers
      maxPrice = Math.max(maxPrice, Price)
    })
  }
  return maxPrice
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
export const parseSku = (sku) => {
  const result = clone(sku)

  const variations = sku.variations.map((variation) => {
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

  skus.map((sku) => {
    const value = sku[variation]
    hTable[value] = sku
  })

  return Object.values(hTable).sort((a, b) => {
    if (a[variation] < b[variation]) return -1
    if (a[variation] > b[variation]) return 1
    return 0;
  })
}

/**
 * Verifies if the variation is color
 * @param {string} variation 
 */
export const isColor = (variation) => {
  let result = false
  if (variation)
    result = variation.toLowerCase() === "cor" || variation.toLowerCase() === "color"

  return result
}

/**
 * Choose wich variation will be the main one.
 * @param {Array[string]} variations 
 */
export const getMainVariationName = (variations) => {
  let result

  for (let i = 0; i < variations.length; i++) {
    if (isColor(variations[i])) {
      result = variations[i]
      break
    }
  }

  return result || variations[0]
}