import { pathOr } from 'ramda'

export const sumAssembliesPrice = assemblyOptions => {
  const cleanAssemblies = assemblyOptions || {}
  const assembliesGroupItems = Object.values(cleanAssemblies)
  return assembliesGroupItems.reduce((sum, groupItems) => {
    const groupPrice = groupItems.reduce((groupSum, item) => {
      const childrenPrice = item.children
        ? sumAssembliesPrice(item.children)
        : 0
      const itemCost = item.price * item.quantity
      return groupSum + itemCost + childrenPrice * item.quantity
    }, 0)
    return groupPrice + sum
  }, 0)
}

export const transformAssemblyOptions = (
  assemblyOptions,
  parentPrice,
  parentQuantity
) => {
  const cleanAssemblies = assemblyOptions || {}
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
        children,
      } = item
      const childrenAddedData = children
        ? transformAssemblyOptions(
            children,
            item.price,
            item.quantity * parentQuantity
          )
        : null

      const addedChildrenCount = pathOr(
        0,
        ['options', 'length'],
        childrenAddedData
      )

      const {
        options: childrenOptions,
        assemblyOptions: childrenAssemblyOptions,
      } = childrenAddedData || {}

      if (quantity >= initialQuantity && quantity > 0) {
        added.push({
          normalizedQuantity: quantity,
          extraQuantity: quantity - initialQuantity,
          choiceType,
          item: {
            name,
            sellingPrice: price,
            quantity,
            sellingPriceWithAssemblies:
              price + sumAssembliesPrice(children || {}),
            id,
            ...(childrenAssemblyOptions
              ? { assemblyOptions: childrenAssemblyOptions }
              : {}),
          },
        })
      }

      if (quantity < initialQuantity && choiceType === 'TOGGLE') {
        removed.push({
          name,
          initialQuantity,
          removedQuantity: initialQuantity - quantity,
        })
      }

      if (quantity !== initialQuantity || addedChildrenCount > 0) {
        options.push({
          assemblyId: groupId,
          id,
          quantity: quantity * parentQuantity,
          seller,
          ...(childrenOptions && childrenOptions.length > 0
            ? { options: childrenOptions }
            : {}),
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
