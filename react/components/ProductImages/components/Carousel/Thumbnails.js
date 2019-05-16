import React from 'react'
import classNames from 'classnames'
import styles from '../../styles.css'
import Swiper from 'react-id-swiper'

const Thumbnails = React.forwardRef(
  ({ slides, onThumbClick, position }, ref) => {
    const thumbnailParams = {
      observer: true,
      containerClass: 'swiper-container h-100',
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      freeMode: true,
      direction: 'vertical',
      slidesPerView: 'auto',
      touchRatio: 0.4,
      mousewheel: true,
      preloadImages: true,
      shouldSwiperUpdate: true,
      zoom: false,
    }

    const thumbClasses = classNames(
      `w-20 ${styles.carouselGaleryThumbs} bottom-0 top-0 absolute dn`,
      {
        'db-ns': slides.length > 1,
        'left-0 pr5': position === 'left',
        'right-0 pl5': position === 'right',
      }
    )

    return (
      <div className={thumbClasses}>
        <Swiper {...thumbnailParams} ref={ref}>
          {slides.map((slide, i) => (
            <div
              key={i}
              className="swiper-slide w-100 h-auto mb5 pointer"
              onClick={() => onThumbClick(i)}
            >
              <figure
                itemProp="associatedMedia"
                itemScope
                itemType="http://schema.org/ImageObject"
              >
                <img
                  className="w-100 h-auto db"
                  itemProp="thumbnail"
                  alt={slide.alt}
                  src={slide.thumbUrl}
                />
              </figure>
              <div
                className={`absolute absolute--fill b--solid b--muted-2 bw1 ${
                  styles.carouselThumbBorder
                }`}
              />
            </div>
          ))}
        </Swiper>
      </div>
    )
  }
)

export default Thumbnails
