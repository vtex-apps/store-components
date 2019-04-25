import React, { useState } from 'react'
import { PhotoSwipe } from 'react-photoswipe'
import classNames from 'classnames'

import './global.css'

const Gallery = ({ items, isOpen, index, handleClose }) => {
  console.log(items)
  const [state, _] = useState({
    items: [
      {
        src: 'http://lorempixel.com/1200/900/sports/1',
        w: 1200,
        h: 900,
        title: 'Image 1'
      },
      {
        src: 'http://lorempixel.com/1200/900/sports/2',
        w: 1200,
        h: 900,
        title: 'Image 2'
      },
      {
        src: 'http://lorempixel.com/1200/900/sports/3',
        w: 1200,
        h: 900,
        title: 'Image 3'
      }
    ],
    options: { index }
  })

  const toPsItem = item => {return {src: item.urls[item.bestUrlIndex], w: 1280, h: 1280, title: 'dgldfkmg'}}

  return (
    <PhotoSwipe isOpen={isOpen} items={items.map(toPsItem)}
      options={state.options}
      onClose={handleClose}
    />
  )
}

export default Gallery