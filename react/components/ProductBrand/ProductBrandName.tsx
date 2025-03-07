import React from 'react'
import { useIntl } from 'react-intl'

import { useProductBrandCssHandles } from './ProductBrandCssHandles'

interface Props {
  brandName: string
  withLink: boolean
  slug?: string
}

export const CSS_HANDLES = ['productBrandNameLink', 'productBrandName'] as const

function ProductBrandName({ brandName, withLink, slug}: Props) {
  const { handles } = useProductBrandCssHandles()
  const intl = useIntl()

  if (withLink && slug) {
    const nameLink = `/${slug}`

    return (
      <a
        href={nameLink}
        className={`${handles.productBrandNameLink}`}
        data-testid="name-redirect"
      >
        <span className={`${handles.productBrandName}`} aria-label={intl.formatMessage(
        { id: 'store/store-components.brand-name.aria-label' }, { Brand: brandName})}>{brandName}</span>
      </a>
    )
  }

  return <span className={`${handles.productBrandName}`}>{brandName}</span>
}

export default ProductBrandName
