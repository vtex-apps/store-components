import {
  prop,
  filter,
  isEmpty,
  reject,
} from 'ramda'

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
  }, 0)
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
  const variationsFields = sku.variations.reduce((acc, variation) => {
    return {
      ...acc,
      [variation.name]: variation.values[0]
    }
  }, {})
  return {
    ...sku,
    variations: sku.variations.map(prop('name')),
    ...variationsFields,
  }
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

/** 
 * Given a selectedVariations, find the first item that has those variations selected
 * selectedVariations format: { "color": "black", size: "small", fabric: null }
 * items: skuItems parsed with variations fields
 * Output: item or null, if not present
*/

export const findItemWithSelectedVariations = (items, selectedVariations) => {
  const selectedNotNull = filter(Boolean, selectedVariations)
  const selectedCount = Object.keys(selectedNotNull).length
  if (selectedCount === 0) {
    // may return any item, return first element
    return items[0]
  }
  return items.find(isSkuSelected(selectedNotNull))
}

/** 
 * Given a selectedVariations, find items that have those variations selected
 * selectedVariations format: { "color": "black", size: "small", fabric: null }
 * items: skuItems parsed with variations fields
 * Output: list of items with those variations
*/

export const findListItemsWithSelectedVariations = (items, selectedVariations) => {
  const selectedNotNull = filter(Boolean, selectedVariations)
  const selectedCount = Object.keys(selectedNotNull).length
  if (selectedCount === 0) {
    // return all
    return items
  }
  return items.filter(isSkuSelected(selectedNotNull))
}

/**
 * Finds unselected variations that for a new selected variations input, detects variations that have only one possible value with that combination
 * @param {*} variations - all possible variations object
 * @param {*} variationsToIterate - list of names of variations that are currently empty
 * @param {*} selectedVariations - selectedVariations format: { "color": "black", size: "small", fabric: null }
 * Output: a object with the keys of variations names and the value of the variation if with that new selection of selectedVariation.
 * If it sees it is adding new values, call it rescursively to check for new unique options for unselected variations
 */
export const variationsWithUniquePossibilities = (items, variations, variationsToIterate, selectedVariations) => {
  if (variationsToIterate.length === 0) {
    return { onlyOptions: {}, possibleItems: items }
  }
  const possibleItems = findListItemsWithSelectedVariations(items, selectedVariations)
  const onlyOptions = variationsToIterate.reduce((acc, emptyVarName) => {
    const possibleVariationsWithItems = variations[emptyVarName].map(possibleValue => {
      const potentialSelection = { ...selectedVariations, [emptyVarName]: possibleValue }
      return findItemWithSelectedVariations(possibleItems, potentialSelection)
    })
    const withItemsCount = possibleVariationsWithItems.filter(Boolean).length
    if (withItemsCount === 1) {
      const valueIndex = possibleVariationsWithItems.findIndex(Boolean)
      return {
        ...acc,
        [emptyVarName]: variations[emptyVarName][valueIndex],
      }
    }
    return acc
  }, {})
  if (!isEmpty(onlyOptions)) {
    const addedVariaitons = Object.keys(onlyOptions)
    const newEmptyVariations = reject((varName) => addedVariaitons.includes(varName), variationsToIterate)
    const recursiveOnlyOptions = variationsWithUniquePossibilities(possibleItems, variations, newEmptyVariations, { ...selectedVariations, ...onlyOptions })
    const mergedOptions = { ...onlyOptions, ...recursiveOnlyOptions.onlyOptions }
    return { onlyOptions: mergedOptions, possibleItems }
  }
  return { onlyOptions, possibleItems }
}

/** Private functions */
const isSkuSelected = (selectedNotNull) => (sku) => {
  const hasAll = Object.keys(selectedNotNull).every(variationName => {
    const selectedValue = selectedNotNull[variationName]
    return sku[variationName] === selectedValue
  })
  return hasAll
}
