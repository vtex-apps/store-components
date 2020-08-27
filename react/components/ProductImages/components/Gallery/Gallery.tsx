import React, { useMemo } from 'react'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'react-photoswipe' or its corre... Remove this comment to see the full error message
import { PhotoSwipe } from 'react-photoswipe'

import './global.css'

const Gallery = ({ items, isOpen, index, handleClose, bgOpacity }: any) => {
  const toPswItem = (item: any) => ({
    src: item.urls[item.bestUrlIndex],
    w: 1280,
    h: 1280,
    title: item.alt,
    thumbnail: item.thumbUrl,
  })

  return (
    <PhotoSwipe
      isOpen={isOpen}
      items={useMemo(() => items.map(toPswItem), [items])}
      onClose={handleClose}
      options={{ index, bgOpacity, history: false }}
    />
  )
}

export default Gallery
