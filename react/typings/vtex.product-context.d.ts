interface SKU {
  itemId: string
  sellers: Seller[]
}

interface Seller {
  commertialOffer: {
    AvailableQuantity: number
  }
}

interface Product {
  itemMetadata: ItemMetadata
}

declare module 'vtex.product-context/useProduct' {
  type GroupId = string

  interface AssemblyOptionItem {
    id: string
    quantity: number
    seller: string
    initialQuantity: number
    choiceType: string
    name: string
    price: number
    children: Record<string, AssemblyOptionItem[]> | null
  }

  type InputValues = Record<string, string>

  export interface ProductContext {
    product?: Product,
    selectedItem: SKU | null,
    selectedQuantity: number
    skuSelector: {
      isVisible: boolean
      areAllVariationsSelected: boolean
    }
    assemblyOptions: {
      items: Record<GroupId, AssemblyOptionItem[]>
      inputValues: Record<GroupId, InputValues>
      areGroupsValid: Record<GroupId, boolean>
    }
  }

  const useProduct: () => ProductContext
  export default useProduct
}

declare module 'vtex.product-context/ProductDispatchContext' {
  type DispatchFunction = (payload: { type: string; args?: any }) => void
  export const useProductDispatch: () => DispatchFunction
}

declare module 'vtex.product-context' {
  export const ProductContext
}