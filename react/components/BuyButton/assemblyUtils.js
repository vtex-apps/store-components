import { filter, isEmpty } from 'ramda'

const filterAssembliesWithItem = filter(items => items.length > 0)

export const transformAssemblyOptions = (assemblyOptions, parentPrice) => {
  const cleanAssemblies = filterAssembliesWithItem(assemblyOptions)
  if (isEmpty(cleanAssemblies)) {
    return {}
  }
  const assembliesKeys = Object.keys(cleanAssemblies)
  const options = [] // contains options sent as arguments to graphql mutation
  const added = [] // array with added assemblies data to show in minicart optimistic preview
  const removed = [] // array with removed assemblies data to show in minicart optimistic preview
  for (const groupId of assembliesKeys) {
    const items = cleanAssemblies[groupId]
    for (const item of items) {
      const {
        id,
        quantity,
        seller,
        initialQuantity,
        choiceType,
        name,
        price,
      } = item
      options.push({
        assemblyId: groupId,
        id,
        quantity,
        seller,
      })

      if (quantity > initialQuantity) {
        added.push({
          normalizedQuantity: quantity,
          extraQuantity: quantity - initialQuantity,
          choiceType,
          item: {
            name,
            sellingPrice: price,
            quantity,
            id,
          },
        })
      }
      if (quantity <= initialQuantity) {
        removed.push({
          name,
          initialQuantity,
          removedQuantity: initialQuantity - quantity,
        })
      }
    }
  }
  return {
    options,
    assemblyOptions: {
      added,
      removed,
      parentPrice,
    },
  }
}
