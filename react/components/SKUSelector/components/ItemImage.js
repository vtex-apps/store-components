import React, { memo } from 'react'
import { string, number } from 'prop-types'
import { head } from 'ramda'

const correctImageUrl = (imageUrl, size) => {
  const urlSplitted = imageUrl.split('/')
  const idsStringIdx = urlSplitted.findIndex(content => content === 'ids')
  if (idsStringIdx < 0 || idsStringIdx === urlSplitted.length - 1) return imageUrl
  const sizeStringIdx = idsStringIdx + 1
  const sizeString = urlSplitted[sizeStringIdx]
  const imageId = head(sizeString.split('-'))
  const newSizeString = `${imageId}-${size * 2}-auto`
  return [...urlSplitted.slice(0, sizeStringIdx), newSizeString, ...urlSplitted.slice(sizeStringIdx+1)].join('/')
}

const ItemImage = ({ imageUrl, size, alt }) => (
  <img
    width={size}
    height={size}
    src={correctImageUrl(imageUrl, size)}
    alt={alt}
  />
)

ItemImage.propTypes = {
  imageUrl: string.isRequired,
  size: number.isRequired,
  alt: string,
}

export default memo(ItemImage)
