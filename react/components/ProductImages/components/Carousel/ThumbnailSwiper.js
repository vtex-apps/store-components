import React from 'react'
import { THUMB_SIZE, imageUrlForSize } from '../../../module/images'
import classNames from 'classnames'

import styles from '../../styles.css'

/** Swiper and its modules are imported using require to avoid breaking SSR */
const Swiper = window.navigator
  ? require('react-id-swiper/lib/ReactIdSwiper.full').default
  : null

const Thumbnail = ({
  itemContainerClasses,
  gallerySwiper,
  alt,
  thumbUrl,
  height,
  index,
}) => {
  return (
    <div
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

const ThumbnailSwiper = ({
  thumbsDirection,
  slides,
  swiperParams,
  alts,
  thumbUrls,
  position,
  gallerySwiper,
}) => {
  const isVertical = thumbsDirection === 'vertical'
  const hasThumbs = slides.length > 1

  const thumbClasses = classNames(`${styles.carouselGaleryThumbs} dn`, {
    'db-ns': hasThumbs,
    'w-20 bottom-0 top-0 absolute dn': isVertical,
    'left-0 pr5': isVertical && position === 'left',
    'right-0 pl5': isVertical && position === 'right',
  })

  const itemContainerClasses = classNames('swiper-slide mb5 pointer', {
    'w-20': !isVertical,
    'w-100': isVertical,
  })

  return (
    <div className={thumbClasses}>
      <Swiper {...swiperParams} rebuildOnUpdate>
        {slides.map((slide, i) => (
          <Thumbnail
            key={i}
            itemContainerClasses={itemContainerClasses}
            index={i}
            height={isVertical ? 'auto' : '115px'}
            gallerySwiper={gallerySwiper}
            alt={slide.alt ? alts[i] : ''}
            thumbUrl={slide.thumbUrl || thumbUrls[i]}
          />
        ))}
      </Swiper>
    </div>
  )
}

export default ThumbnailSwiper
