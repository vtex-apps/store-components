import { path } from 'ramda'

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

export const stripUrl = url => url.replace(/^https?:/, '')

export const getVariations = (skus) => {
  const result = []

  return result
}

export const getVariationOptions = (variation, skus) => {
  const hTable = {}

  skus.map((sku) => {
    const value = sku[variation]
    hTable[value] = 1
  })

  return Object.keys(hTable)
}

export const isColor = (variation) => {
  return variation.toLowerCase() === "cor" || variation.toLowerCase() === "color"
}

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

export const getVariationsFromSKU = (sku) => {
  const { variations } = sku
  const result = {}

  variations && variations.map((variation) => {
    if (sku[variation])
      result[variation] = variations[variation]
  })

  return result
}