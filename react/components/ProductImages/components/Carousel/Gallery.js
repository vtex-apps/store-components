import React, { useState } from 'react'
import { PhotoSwipe } from 'react-photoswipe'
import classNames from 'classnames'

const Gallery = ({ slides, isOpen, index, handleClose }) => {
  console.log(isOpen)
  return null
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

  const photoSwipeClasses = classNames({dn: !state.isOpen})

  return (
    <PhotoSwipe isOpen={isOpen} items={state.items} className={photoSwipeClasses}
      options={state.options}
      onClose={handleClose}
    />
  )
}

export default Gallery