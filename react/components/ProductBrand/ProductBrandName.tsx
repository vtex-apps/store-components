import React from 'react'

import { useProductBrandCssHandles } from './ProductBrandCssHandles'

interface Props {
  brandName: string
  withLink: boolean
  slug?: string
  arialabel:string
}

export const CSS_HANDLES = ['productBrandNameLink', 'productBrandName'] as const

function ProductBrandName({ brandName, withLink, slug ,arialabel}: Props) {
  const { handles } = useProductBrandCssHandles()

  if (withLink && slug) {
    const nameLink = `/${slug}`

    return (
      <a
        href={nameLink}
        className={`${handles.productBrandNameLink}`}
        data-testid="name-redirect"
      >
        <span className={`${handles.productBrandName}`} aria-label={arialabel}>{brandName}</span>
      </a>
    )
  }

  return <span className={`${handles.productBrandName}`}>{brandName}</span>
}

export default ProductBrandName
