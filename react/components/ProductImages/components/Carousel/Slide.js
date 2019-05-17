import React from 'react'
import BlurredLoader from '../BlurredLoader'
import Video from '../Video'

const Slide = ({ slide, onLoad, onClick }) => {
  switch (slide.type) {
    case 'image':
      return (
        <BlurredLoader
          loaderType="SPINNER"
          loaderUrl={slide.thumbUrl}
          realUrls={slide.urls}
          bestUrlIndex={slide.bestUrlIndex}
          alt={slide.alt}
          onload={onLoad}
          onClick={onClick}
        />
      )
    // case 'video':
    // FIXME @rerisson
    default:
      return null
  }
}

export default Slide
