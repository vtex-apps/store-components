import { useRuntime } from 'vtex.render-runtime'
import { path } from 'ramda'
import { ProductContextState } from 'vtex.product-context/react/ProductTypes'

import { getDefaultSeller } from './sellers'

export const useCommercialOffer = (
  valuesFromContext: Partial<ProductContextState>
) => {
  const renderRuntime = useRuntime()

  const { selectedItem } = valuesFromContext

  const settings = renderRuntime?.getSettings?.('vtex.store')

  if (settings?.enableDefaultSeller) {
    return getDefaultSeller(selectedItem?.sellers)?.commertialOffer
  }

  console.warn(
    'In feature releases the enableDefaultSeller setting will be removed, and the commercialOffer will be calculated only by defaultSeller'
  )

  return path(['sellers', 0, 'commertialOffer'], selectedItem)
}
