interface SelectedItem {
  itemId: string
  sellers: {
    commertialOffer: {
      AvailableQuantity: number
    }
  }[]
}

interface Product {
  itemMetadata: ItemMetadata
}

declare module 'vtex.product-context/useProduct' {
  const useProduct: () => ProductContext
  export default useProduct

  interface ProductContext {
    selectedQuantity: number
    product: Product | null
    selectedItem: SelectedItem | null
  }
}

declare module 'vtex.product-context/ProductDispatchContext' {
  type DispatchFunction = (payload: { type: string; args?: any }) => void
  export const useProductDispatch: () => DispatchFunction
}
