import React from 'react'

import { useProductBrandCssHandles } from './ProductBrandCssHandles'

interface Props {
  brandName: string
  withLink: boolean
  slug?: string
}

export const CSS_HANDLES = ['productBrandNameLink', 'productBrandName'] as const

function ProductBrandName({ brandName, withLink, slug }: Props) {
  const { handles } = useProductBrandCssHandles()

  if (withLink && slug) {
    const nameLink = `/${slug}/b`

    return (
      <a
        href={nameLink}
        className={`${handles.productBrandNameLink}`}
        data-testid="name-redirect"
      >
        <span className={`${handles.productBrandName}`}>{brandName}</span>
      </a>
    )
  }

  return <span className={`${handles.productBrandName}`}>{brandName}</span>
}

export default ProductBrandName
