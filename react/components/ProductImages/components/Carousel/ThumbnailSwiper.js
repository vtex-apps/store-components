import React from 'react'
import { THUMB_SIZE, imageUrlForSize } from '../../../module/images'
import classNames from 'classnames'

import styles from '../../styles.css'
import { THUMBS_POSITION_HORIZONTAL } from '../../utils/enums'
import { imageUrl } from './ThumbnailUtils'

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
  aspectRatio='auto',
  maxHeight = 150,
}) => {
  console.log('aspectRatio', aspectRatio)
  console.log('maxHeight', maxHeight)
  return (
    <div
      className={itemContainerClasses}
      style={{ height, maxHeight: maxHeight || 'unset' }}
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
          src={imageUrl(thumbUrl, THUMB_SIZE, aspectRatio)}
        />
      </figure>
      <div
        className={`absolute absolute--fill b--solid b--muted-2 bw1 ${styles.carouselThumbBorder}`}
      />
    </div>
  )
}

const ThumbnailSwiper = ({
  isThumbsVertical,
  slides,
  swiperParams,
  thumbUrls,
  position,
  gallerySwiper,
  activeIndex,
  thumbnailAspectRatio,
  thumbnailMaxHeight,
}) => {
  const hasThumbs = slides.length > 1

  const thumbClasses = classNames(`${styles.carouselGaleryThumbs} dn`, {
    'db-ns': hasThumbs,
    mt3: !isThumbsVertical,
    'w-20 bottom-0 top-0 absolute': isThumbsVertical,
    'left-0 pr5':
      isThumbsVertical && position === THUMBS_POSITION_HORIZONTAL.LEFT,
    'right-0 pl5':
      isThumbsVertical && position === THUMBS_POSITION_HORIZONTAL.RIGHT,
  })

  
  return (
    <div className={thumbClasses} data-testid="thumbnail-swiper">
      <Swiper {...swiperParams} rebuildOnUpdate>
        {slides.map((slide, i) => {
          const itemContainerClasses = classNames('swiper-slide mb5 pointer', {
            'w-20': !isThumbsVertical,
            'w-100': isThumbsVertical,
            'swiper-slide-active': activeIndex === i,
          })

          return (
            <Thumbnail
              key={`${i}-${slide.alt}`}
              itemContainerClasses={itemContainerClasses}
              index={i}
              height={isThumbsVertical ? 'auto' : '115px'}
              gallerySwiper={gallerySwiper}
              alt={slide.alt}
              thumbUrl={slide.thumbUrl || thumbUrls[i]}
              aspectRatio={thumbnailAspectRatio}
              maxHeight={thumbnailMaxHeight}
            />
          )
        })}
      </Swiper>
    </div>
  )
}

export default ThumbnailSwiper
