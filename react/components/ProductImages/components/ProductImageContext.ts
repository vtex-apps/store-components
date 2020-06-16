import { createContext } from 'react'

type AspectRatio = string | number

interface State {
  src: string
  alt: string
  aspectRatio: AspectRatio
}

const DEFAULT_STATE: Partial<State> = {}

const ProductImageContext = createContext(DEFAULT_STATE)

export default ProductImageContext
