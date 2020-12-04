import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { PRODUCT_BRAND_CSS_HANDLES } from '../../ProductBrand'

interface Props {
  brandName: string
  withLink: boolean
  slug?: string
}

function ProductBrandName({ brandName, withLink, slug }: Props) {
  const handles = useCssHandles(PRODUCT_BRAND_CSS_HANDLES)

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
