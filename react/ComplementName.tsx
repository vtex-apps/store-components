import React from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'productComplementNameWrapper',
  'productComplementName',
] as const

const ComplementName: React.FC = () => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { product } = useProduct()

  const complementName = product?.sku?.complementName

  return (
    <div className={`${handles.productComplementNameWrapper} t-body`}>
      <span className={handles.productComplementName}>{complementName}</span>
    </div>
  )
}

export default ComplementName
