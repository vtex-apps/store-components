import React, { useMemo } from 'react'
import { PhotoSwipe } from 'react-photoswipe'

import './global.css'

const Gallery = ({ items, isOpen, index, handleClose }) => {
  const toPswItem = item => ({
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
      options={{index}}
    />
  )
}

export default Gallery