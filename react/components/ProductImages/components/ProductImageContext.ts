import { createContext } from 'react'

export interface State {
  src: string
  alt: string
}

const ProductImageContext = createContext<State | Record<string, unknown>>({})

export default ProductImageContext
