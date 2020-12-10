/* eslint-disable @typescript-eslint/no-explicit-any */
interface ProductItem {
  itemId: string
  name: string
  images: Image[]
  variations: Array<{
    name: string
    values: string[]
  }>
  sellers: Array<{
    commertialOffer: {
      Price: number
      ListPrice: number
      AvailableQuantity: number
    }
  }>
}

interface Product {
  brand: string
  brandId: string
  itemMetadata: ItemMetadata
  items: ProductItem[]
  skuSpecifications: SkuSpecification[]
  productName: string
  productReference: string
  brand: string
  description: string
}

interface SkuSpecification {
  field: SkuSpecificationField
  values: SkuSpecificationValues[]
}

interface SkuSpecificationField {
  name: string
  originalName: string
}

interface SkuSpecificationValues {
  name: string
  originalName: string
}

declare module 'vtex.product-context/ProductDispatchContext' {
  type DispatchFunction = (payload: { type: string; args?: any }) => void
  export const useProductDispatch: () => DispatchFunction
}

declare module 'vtex.product-context' {
  export interface Seller {
    commertialOffer: {
      AvailableQuantity: number
    }
  }

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
    product?: Product
    selectedItem: ProductItem | null
    selectedQuantity: number
    skuSelector: {
      isVisible: boolean
      areAllVariationsSelected: boolean
      selectedImageVariationSKU: string
    }
    buyButton: {
      clicked: boolean
    }
    assemblyOptions: {
      items: Record<GroupId, AssemblyOptionItem[]>
      inputValues: Record<GroupId, InputValues>
      areGroupsValid: Record<GroupId, boolean>
    }
  }

  export const useProduct: () => ProductContext
  type DispatchFunction = (payload: { type: string; args?: any }) => void
  export const useProductDispatch: () => DispatchFunction
  export const ProductContext
}
