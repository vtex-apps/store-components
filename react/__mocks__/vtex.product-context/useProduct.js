import React from 'react'

const ProductContext = React.createContext({})
const useProduct = () => React.useContext(ProductContext)
export default useProduct
