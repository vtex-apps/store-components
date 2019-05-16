import React from 'react'
import BlurredLoader from  '../BlurredLoader'

const Slide = ({ slide, onLoad, onClick, isZoomEnabled }) => {
  switch (slide.type) {
    case 'image':
      return (
        <BlurredLoader
          isZoomEnabled={isZoomEnabled}
          loaderType="SPINNER"
          loaderUrl={slide.thumbUrl}
          realUrls={slide.urls}
          bestUrlIndex={slide.bestUrlIndex}
          alt={slide.alt}
          onload={onLoad}
          onClick={onClick}
        />
      )
    case 'video':
      return (
        <Video
          url={slide.src}
          setThumb={this.setVideoThumb(i)}
          playing={i === this.state.activeIndex}
          id={i}
        />
      )
    default:
      return null
  }
}

export default Slide