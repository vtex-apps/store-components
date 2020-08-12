/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { path, equals } from 'ramda'
import { IconCaret } from 'vtex.store-icons'
import { withCssHandles, applyModifiers } from 'vtex.css-handles'
import SwiperCore, { Thumbs, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import Video, { getThumbUrl } from '../Video'
import ProductImage from '../ProductImage'
import styles from '../../styles.css'
import ThumbnailSwiper from './ThumbnailSwiper'
import {
  THUMBS_ORIENTATION,
  THUMBS_POSITION_HORIZONTAL,
} from '../../utils/enums'

import './global.css'

const CARET_ICON_SIZE = 24
const CARET_CLASSNAME =
  'pv8 absolute top-50 translate--50y z-2 pointer c-action-primary'

// install Swiper's Thumbs component
SwiperCore.use([Thumbs, Navigation, Pagination])

const CSS_HANDLES = [
  'carouselContainer',
  'productImagesThumbsSwiperContainer',
  'productImagesGallerySwiperContainer',
  'productImagesGallerySlide',
  'swiperCaret',
  'swiperCaretNext',
  'swiperCaretPrev',
  'swiperBullet',
]

function preloadThumb(thumbUrl, callback) {
  // Image object doesn't exist when it's being rendered in the server side
  if (!window.navigator) {
    return
  }

  const image = new Image()

  image.onload = callback
  image.onerror = callback

  image.src = thumbUrl
}

const initialState = {
  loaded: [],
  thumbUrl: [],
  alt: [],
  thumbsLoaded: false,
  activeIndex: 0,
  thumbSwiper: null,
  gallerySwiper: null,
}

class Carousel extends Component {
  state = initialState

  get hasGallerySwiper() {
    return Boolean(this.state.gallerySwiper)
  }

  get hasThumbSwiper() {
    return Boolean(this.state.thumbSwiper)
  }

  async setInitialVariablesState() {
    const slides = this.props.slides || []

    this.isVideo = []
    this.thumbLoadCount = 0

    slides.forEach(async (slide, i) => {
      if (slide.type === 'video') {
        const thumbUrl = await getThumbUrl(slide.src, slide.thumbWidth)

        this.isVideo[i] = true
        this.setVideoThumb(i)(thumbUrl)
        this.thumbLoadFinish()
      } else {
        preloadThumb(slide.thumbUrl, () => this.thumbLoadFinish())
      }
    })
  }

  thumbLoadFinish = () => {
    this.thumbLoadCount++

    if (
      !this.props.slides ||
      this.thumbLoadCount === this.props.slides.length
    ) {
      this.setState({ thumbsLoaded: true })
    }
  }

  componentDidMount() {
    this.setInitialVariablesState()
  }

  componentDidUpdate(prevProps) {
    const { loaded, activeIndex } = this.state
    const { isVideo } = this

    if (!equals(prevProps.slides, this.props.slides)) {
      this.setInitialVariablesState()
      this.setState(initialState)

      if (this.props.slides && this.props.slides.length > 1) {
        if (this.hasGallerySwiper) {
          this.state.gallerySwiper.slideTo(0)
        }

        if (this.hasThumbSwiper) {
          this.state.thumbSwiper.slideTo(0)
        }
      }

      return
    }

    const paginationElement = path(
      ['swiper', 'pagination', 'el'],
      this.state.gallerySwiper
    )

    if (paginationElement) {
      paginationElement.hidden = isVideo[activeIndex]
    }

    const gallerySwiperZoom = path(['swiper', 'zoom'], this.state.gallerySwiper)

    if (gallerySwiperZoom) {
      if (loaded[activeIndex]) {
        gallerySwiperZoom.enable()
      } else {
        gallerySwiperZoom.disable()
      }
    }
  }

  handleSlideChange = () => {
    this.setState(prevState => {
      const { activeIndex } = prevState.gallerySwiper

      return { activeIndex, sliderChanged: true }
    })
  }

  setVideoThumb = i => (url, title) => {
    this.setState(prevState => {
      const thumbUrl = { ...prevState.thumbUrl }
      const alt = { ...prevState.alt }

      thumbUrl[i] = url
      alt[i] = title

      return { thumbUrl, alt }
    })
  }

  renderSlide = (slide, i) => {
    const {
      aspectRatio,
      maxHeight,
      zoomMode,
      zoomFactor,
      ModalZoomElement,
      zoomProps: legacyZoomProps,
    } = this.props

    // Backwards compatibility
    const { zoomType: legacyZoomType } = legacyZoomProps || {}
    const isZoomDisabled =
      legacyZoomType === 'no-zoom' || zoomMode === 'disabled'

    switch (slide.type) {
      case 'image':
        return (
          <ProductImage
            src={slide.url}
            alt={slide.alt}
            maxHeight={maxHeight}
            zoomFactor={zoomFactor}
            aspectRatio={aspectRatio}
            ModalZoomElement={ModalZoomElement}
            zoomMode={isZoomDisabled ? 'disabled' : zoomMode}
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

  get galleryParams() {
    const { cssHandles, slides = [], showPaginationDots = true } = this.props

    const params = {}

    if (slides.length > 1 && showPaginationDots) {
      params.pagination = {
        clickable: true,
        // todo: what to do about this
        // bulletClass: `swiper-pagination-bullet ${cssHandles.swiperBullet}`,
        // bulletActiveClass: `c-action-primary swiper-pagination-bullet-active ${applyModifiers(
        //   cssHandles.swiperBullet,
        //   'active'
        // )}`,
        // // custom props from vtex/swiper
        // bulletSelector: `.swiper-pagination-bullet`,
        renderBullet(index, className) {
          return `<span class="${className} ${cssHandles.swiperBullet}"></span>`
        },
      }
    }

    if (slides.length > 1) {
      params.navigation = {
        prevEl: '.swiper-caret-prev',
        nextEl: '.swiper-caret-next',
        disabledClass: `c-disabled ${styles.carouselCursorDefault}`,
      }
    }

    return params
  }

  render() {
    const { thumbsLoaded } = this.state
    const { displayThumbnailsArrows } = this.props

    const {
      position,
      cssHandles,
      slides = [],
      thumbnailMaxHeight,
      thumbnailAspectRatio,
      thumbnailsOrientation,
      zoomProps: { zoomType },
    } = this.props

    const isThumbsVertical =
      thumbnailsOrientation === THUMBS_ORIENTATION.VERTICAL

    const hasThumbs = slides && slides.length > 1

    const galleryCursor = {
      'in-page': styles.carouselGaleryCursor,
      'no-zoom': '',
    }

    const imageClasses = classNames(
      'w-100 border-box',
      galleryCursor[zoomType],
      {
        'ml-20-ns w-80-ns pl5':
          isThumbsVertical &&
          position === THUMBS_POSITION_HORIZONTAL.LEFT &&
          hasThumbs,
        'mr-20-ns w-80-ns pr5':
          isThumbsVertical &&
          position === THUMBS_POSITION_HORIZONTAL.RIGHT &&
          hasThumbs,
      }
    )

    const thumbnailSwiper = thumbsLoaded && hasThumbs && (
      <ThumbnailSwiper
        onSwiper={instance => this.setState({ thumbSwiper: instance })}
        isThumbsVertical={isThumbsVertical}
        thumbnailAspectRatio={thumbnailAspectRatio}
        thumbnailMaxHeight={thumbnailMaxHeight}
        thumbUrls={this.state.thumbUrl}
        displayThumbnailsArrows={displayThumbnailsArrows}
        slides={slides}
        position={position}
      />
    )

    const containerClasses = classNames(
      cssHandles.carouselContainer,
      'relative overflow-hidden w-100',
      {
        'flex-ns justify-end-ns':
          isThumbsVertical &&
          position === THUMBS_POSITION_HORIZONTAL.LEFT &&
          hasThumbs,
        'flex-ns justify-start-ns':
          isThumbsVertical &&
          position === THUMBS_POSITION_HORIZONTAL.RIGHT &&
          hasThumbs,
      }
    )

    const { showNavigationArrows = true } = this.props

    return (
      <div className={containerClasses} aria-hidden="true">
        {isThumbsVertical && thumbnailSwiper}

        <div className={imageClasses}>
          <Swiper
            onSwiper={instance => this.setState({ gallerySwiper: instance })}
            className={cssHandles.productImagesGallerySwiperContainer}
            thumbs={{
              swiper: this.state.thumbSwiper,
              multipleActiveThumbs: false,
            }}
            threshold={10}
            resistanceRatio={slides.length > 1 ? 0.85 : 0}
            onSlideChange={this.handleSlideChange}
            updateOnWindowResize
            {...this.galleryParams}
          >
            {slides.map((slide, i) => (
              <SwiperSlide
                key={i}
                className={`${cssHandles.productImagesGallerySlide} swiper-slide center-all`}
              >
                {this.renderSlide(slide, i)}
              </SwiperSlide>
            ))}

            {showNavigationArrows && (
              <span
                className={`swiper-caret-next pl7 pr2 right-0 ${CARET_CLASSNAME} ${cssHandles.swiperCaret} ${cssHandles.swiperCaretNext}`}
              >
                <IconCaret
                  orientation="right"
                  size={CARET_ICON_SIZE}
                  className={styles.carouselIconCaretRight}
                />
              </span>
            )}

            {showNavigationArrows && (
              <span
                className={`swiper-caret-prev pr7 pl2 left-0 ${CARET_CLASSNAME} ${cssHandles.swiperCaret} ${cssHandles.swiperCaretPrev}`}
              >
                <IconCaret
                  orientation="left"
                  size={CARET_ICON_SIZE}
                  className={styles.carouselIconCaretLeft}
                />
              </span>
            )}
          </Swiper>

          {!isThumbsVertical && thumbnailSwiper}
        </div>
      </div>
    )
  }
}

Carousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      url: PropTypes.string,
      alt: PropTypes.string,
      thumbUrl: PropTypes.string,
      bestUrlIndex: PropTypes.number,
    })
  ),
  ModalZoomElement: PropTypes.any,
  displayThumbnailsArrows: PropTypes.bool,
}

export default withCssHandles(CSS_HANDLES)(Carousel)
