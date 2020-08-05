import { createContext } from 'react'

export interface State {
  src: string
  alt: string
}

const ProductImageContext = createContext<State | Record<string, any>>({})

export default ProductImageContext
