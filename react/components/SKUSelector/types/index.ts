export interface ProductItem {
  itemId: string
  name: string
  images: Image[]
  variations: {
    name: string
    values: string[]
  }[]
  sellers: {
    commertialOffer: {
      Price: number
      ListPrice: number
      AvailableQuantity: number
    }
  }[]
}

export interface SelectorProductItem extends Omit<ProductItem, 'variations'> {
  variations: string[]
  variationValues: Record<string, string>
}

export type SelectedVariations = Record<string, string | null>

export interface CallbackItem {
  name: string
  value: string
  skuId: string | null
  isMainAndImpossible: Boolean
  possibleItems: SelectorProductItem[]
}

export interface Image {
  imageId: string
  imageLabel: string | null
  imageTag: string
  imageUrl: string
  imageText: string
}

export type ImageMap = Record<string, Record<string, Image | undefined>>

export interface DisplayOption {
  label: string
  onSelectItem: () => void
  image: Image | undefined
  available: boolean
  impossible: boolean
}

export interface DisplayVariation {
  name: string
  options: DisplayOption[]
}

export type Variations = Record<string, string[]>

export enum InitialSelectedModes {
  complete = 'complete',
  image = 'image',
  empty = 'empty'
}
