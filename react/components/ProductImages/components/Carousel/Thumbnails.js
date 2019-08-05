import React from 'react'
import { THUMB_SIZE, imageUrlForSize } from '../../../module/images'

import styles from '../../styles.css'

const Thumbnails = ({
  itemContainerClasses,
  gallerySwiper,
  alt,
  thumbUrl,
  height,
  index,
}) => {
  return (
    <div
      key={index}
      className={itemContainerClasses}
      style={{ height }}
      onClick={() => gallerySwiper && gallerySwiper.slideTo(index)}
    >
      <figure
        className={styles.figure}
        itemProp="associatedMedia"
        itemScope
        itemType="http://schema.org/ImageObject"
      >
        <img
          className="w-100 h-auto db"
          itemProp="thumbnail"
          alt={alt}
          src={imageUrlForSize(thumbUrl, THUMB_SIZE)}
        />
      </figure>
      <div
        className={`absolute absolute--fill b--solid b--muted-2 bw1 ${
          styles.carouselThumbBorder
        }`}
      />
    </div>
  )
}

export default Thumbnails
