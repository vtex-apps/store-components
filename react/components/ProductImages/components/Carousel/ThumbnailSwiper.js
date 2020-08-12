import React, { Fragment, useMemo } from 'react'
import classNames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IconCaret } from 'vtex.store-icons'

import { THUMB_SIZE } from '../../../module/images'
import { THUMBS_POSITION_HORIZONTAL } from '../../utils/enums'
import { imageUrl } from '../../utils/aspectRatioUtil'
import styles from '../../styles.css'

const THUMB_MAX_SIZE = 256

const CSS_HANDLES = [
  'figure',
  'thumbImg',
  'productImagesThumb',
  'carouselThumbBorder',
  'carouselGaleryThumbs',
  'productImagesThumbActive',
  'productImagesThumbCaret',
]

const Thumbnail = props => {
  const {
    alt,
    height,
    thumbUrl,
    handles,
    maxHeight = 150,
    aspectRatio = 'auto',
    itemContainerClassName,
  } = props

  return (
    <div
      className={itemContainerClassName}
      style={{
        height,
        maxHeight: maxHeight || 'unset',
        position: 'relative',
      }}
    >
      <figure
        className={handles.figure}
        itemProp="associatedMedia"
        itemScope
        itemType="http://schema.org/ImageObject"
      >
        <img
          className={`${handles.thumbImg} w-100 h-auto db`}
          itemProp="thumbnail"
          alt={alt}
          src={imageUrl(thumbUrl, THUMB_SIZE, THUMB_MAX_SIZE, aspectRatio)}
        />
      </figure>
      <div
        className={`absolute absolute--fill b--solid b--muted-2 bw0 ${handles.carouselThumbBorder}`}
      />
    </div>
  )
}

const ThumbnailSwiper = props => {
  const handles = useCssHandles(CSS_HANDLES)

  const {
    isThumbsVertical,
    slides,
    thumbUrls,
    position,
    thumbnailAspectRatio,
    thumbnailMaxHeight,
    onSwiper = () => null,
    displayThumbnailsArrows,
  } = props

  const hasThumbs = slides.length > 1

  const thumbClassName = classNames(
    `${handles.carouselGaleryThumbs} dn h-auto`,
    {
      'db-ns': hasThumbs,
      mt3: !isThumbsVertical,
      'w-20 bottom-0 top-0 absolute': isThumbsVertical,
      'left-0':
        isThumbsVertical && position === THUMBS_POSITION_HORIZONTAL.LEFT,
      'right-0':
        isThumbsVertical && position === THUMBS_POSITION_HORIZONTAL.RIGHT,
    }
  )

  const itemContainerClassName = classNames(
    handles.productImagesThumb,
    'mb5 pointer',
    {
      'w-20': !isThumbsVertical,
      'w-100': isThumbsVertical,
    }
  )

  const arrows = useMemo(() => {
    if (!displayThumbnailsArrows) {
      return null
    }

    const thumbCaretSize = 24
    const thumbCaretClassName = `${handles.productImagesThumbCaret} absolute z-2 pointer c-action-primary flex pv2`
    const thumbCaretStyle = { transition: 'opacity 0.2s' }

    const nextBtnClassName = classNames(
      'swiper-thumbnails-caret-next',
      thumbCaretClassName,
      {
        [`bottom-0 pt7 left-0 justify-center w-100 ${styles.gradientBaseBottom}`]: isThumbsVertical,
        [`right-0 top-0 items-center h-100 pl6 ${styles.gradientBaseRight}`]: !isThumbsVertical,
      }
    )

    const prevBtnClassName = classNames(
      'swiper-thumbnails-caret-prev top-0 left-0',
      thumbCaretClassName,
      isThumbsVertical && `pb7 justify-center w-100 ${styles.gradientBaseTop}`,
      !isThumbsVertical && `items-center h-100 pr6 ${styles.gradientBaseLeft}`
    )

    return (
      <Fragment>
        <span className={nextBtnClassName} style={thumbCaretStyle}>
          <IconCaret
            orientation={isThumbsVertical ? 'down' : 'right'}
            size={thumbCaretSize}
          />
        </span>
        <span className={prevBtnClassName} style={thumbCaretStyle}>
          <IconCaret
            orientation={isThumbsVertical ? 'up' : 'left'}
            size={thumbCaretSize}
          />
        </span>
      </Fragment>
    )
  }, [
    displayThumbnailsArrows,
    handles.productImagesThumbCaret,
    isThumbsVertical,
  ])

  const navigation = {
    prevEl: '.swiper-thumbnails-caret-prev',
    nextEl: '.swiper-thumbnails-caret-next',
    disabledClass: `c-disabled o-0 pointer-events-none ${styles.carouselCursorDefault}`,
    hiddenClass: 'dn',
  }

  return (
    <div className={thumbClassName} data-testid="thumbnail-swiper">
      <Swiper
        onSwiper={onSwiper}
        className={`h-100 ${handles.productImagesThumbsSwiperContainer}`}
        // todo: why is it throwing a warning???
        // observer={true}
        slidesPerView="auto"
        touchRatio={1}
        threshold={8}
        slideActiveClass={handles.productImagesThumbActive}
        navigation={navigation}
        /* Slides are grouped when thumbnails arrows are enabled
         * so that clicking on next/prev will scroll more than
         * one thumbnail */
        slidesPerGroup={displayThumbnailsArrows ? 4 : 1}
        freeMode={false}
        mousewheel={false}
        zoom={false}
        watchSlidesVisibility
        watchSlidesProgress
        preloadImages
        updateOnWindowResize
        direction={isThumbsVertical ? 'vertical' : 'horizontal'}
      >
        {slides.map((slide, i) => {
          return (
            <SwiperSlide key={`${i}-${slide.alt}`} style={{ flexShrink: 1 }}>
              <Thumbnail
                itemContainerClassName={itemContainerClassName}
                index={i}
                handles={handles}
                height={isThumbsVertical ? 'auto' : '115px'}
                alt={slide.alt}
                thumbUrl={slide.thumbUrl || thumbUrls[i]}
                aspectRatio={thumbnailAspectRatio}
                maxHeight={thumbnailMaxHeight}
              />
            </SwiperSlide>
          )
        })}
        {arrows}
      </Swiper>
    </div>
  )
}

export default ThumbnailSwiper
