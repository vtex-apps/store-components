import { Seller } from 'vtex.product-context'

export function getDefaultSeller(sellers?: Seller[]) {
  if (!sellers || sellers.length === 0) {
    return
  }

  const defaultSeller = sellers.find(seller => seller.sellerDefault)

  if (defaultSeller) {
    return defaultSeller
  }

  return sellers[0]
}
