/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import classNames from 'classnames'
import { path, equals } from 'ramda'
import { IconCaret } from 'vtex.store-icons'
import { withCssHandles } from 'vtex.css-handles'
import SwiperCore, { Thumbs, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import Video, { getThumbUrl } from '../Video'
import ProductImage from '../ProductImage'
import ThumbnailSwiper from './ThumbnailSwiper'
import {
  THUMBS_ORIENTATION,
  THUMBS_POSITION_HORIZONTAL,
} from '../../utils/enums'
import styles from './swiper.scoped.css'

import './swiper.global.css'
import './overrides.global.css'

const CARET_ICON_SIZE = 24
const CARET_CLASSNAME =
  'pv8 absolute top-50 translate--50y z-2 pointer c-action-primary'

// install Swiper's Thumbs component
SwiperCore.use([Thumbs, Navigation, Pagination])

const CSS_HANDLES = [
  'carouselContainer',
  'productImagesThumbsSwiperContainer',
  'productImagesThumbActive',
  'productImagesGallerySwiperContainer',
  'productImagesGallerySlide',
  'swiperCaret',
  'swiperCaretNext',
  'swiperCaretPrev',
]

const initialState = {
  thumbUrl: [],
  alt: [],
  activeIndex: 0,
}

type Props = {
  slides?: Array<{
    type?: string
    url?: string
    alt?: string
    thumbUrl?: string
    bestUrlIndex?: number
  }>
  ModalZoomElement?: any
  displayThumbnailsArrows?: boolean
}

type State = any

class Carousel extends Component<Props, State> {
  state = {
    ...initialState,
    thumbSwiper: null,
    gallerySwiper: null,
  }

  isVideo = []

  get hasGallerySwiper() {
    return Boolean(this.state.gallerySwiper)
  }

  get hasThumbSwiper() {
    return Boolean(this.state.thumbSwiper)
  }

  setInitialVariablesState() {
    const slides = this.props.slides || []

    this.isVideo = []

    slides.forEach(async (slide, i) => {
      if (slide.type === 'video') {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'src' does not exist on type '{ type?: st... Remove this comment to see the full error message
        const thumbUrl = await getThumbUrl(slide.src, slide.thumbWidth)

        // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
        this.isVideo[i] = true
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        this.setVideoThumb(i)(thumbUrl)
      } else {
        // Image object doesn't exist when it's being rendered in the server side
        if (!window.navigator) {
          return
        }

        const image = new Image()

        // @ts-expect-error ts-migrate(2322) FIXME: Type 'undefined' is not assignable to type 'string... Remove this comment to see the full error message
        image.src = slide.thumbUrl
      }
    })
  }

  componentDidMount() {
    this.setInitialVariablesState()
  }

  componentDidUpdate(prevProps: Props) {
    const { activeIndex } = this.state
    const { isVideo } = this

    if (!equals(prevProps.slides, this.props.slides)) {
      this.setInitialVariablesState()

      const newInitialState = { ...initialState }

      if (!this.props.slides) return

      this.setState(newInitialState)

      return
    }

    const paginationElement = path(
      ['swiper', 'pagination', 'el'],
      this.state.gallerySwiper
    )

    if (paginationElement) {
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      paginationElement.hidden = isVideo[activeIndex]
    }
  }

  handleSlideChange = () => {
    this.setState((prevState: any) => {
      if (!this.hasGallerySwiper) {
        return
      }

      const { activeIndex } = prevState.gallerySwiper

      return { activeIndex, sliderChanged: true }
    })
  }

  setVideoThumb = (i: any) => (url: any, title: any) => {
    this.setState((prevState: any) => {
      const thumbUrl = { ...prevState.thumbUrl }
      const alt = { ...prevState.alt }

      thumbUrl[i] = url
      alt[i] = title

      return { thumbUrl, alt }
    })
  }

  renderSlide = (slide: any, i: any) => {
    const {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'aspectRatio' does not exist on type 'Rea... Remove this comment to see the full error message
      aspectRatio,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'maxHeight' does not exist on type 'Reado... Remove this comment to see the full error message
      maxHeight,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'zoomMode' does not exist on type 'Readon... Remove this comment to see the full error message
      zoomMode,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'zoomFactor' does not exist on type 'Read... Remove this comment to see the full error message
      zoomFactor,
      ModalZoomElement,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'zoomProps' does not exist on type 'Reado... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'cssHandles' does not exist on type 'Read... Remove this comment to see the full error message
    const { cssHandles, slides = [], showPaginationDots = true } = this.props

    const params = {}

    if (slides.length > 1 && showPaginationDots) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'pagination' does not exist on type '{}'.
      params.pagination = {
        el: `.${styles['swiper-pagination']}`,
        clickable: true,
        clickableClass: styles.swiperPaginationClickable,
        bulletClass: styles.swiperBullet,
        bulletActiveClass: styles['swiperBullet--active'],
        renderBullet(_index: any, className: any) {
          return `<span class="${className} c-action-primary"></span>`
        },
      }
    }

    if (slides.length > 1) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'navigation' does not exist on type '{}'.
      params.navigation = {
        prevEl: '.swiper-caret-prev',
        nextEl: '.swiper-caret-next',
        disabledClass: `c-disabled ${styles.carouselCursorDefault}`,
      }
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'thumbs' does not exist on type '{}'.
    params.thumbs = {
      swiper: this.state.thumbSwiper,
      multipleActiveThumbs: false,
      slideThumbActiveClass: cssHandles.productImagesThumbActive,
    }

    return params
  }

  render() {
    const {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'position' does not exist on type 'Readon... Remove this comment to see the full error message
      position,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'cssHandles' does not exist on type 'Read... Remove this comment to see the full error message
      cssHandles,
      slides = [],
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'thumbnailMaxHeight' does not exist on ty... Remove this comment to see the full error message
      thumbnailMaxHeight,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'thumbnailAspectRatio' does not exist on ... Remove this comment to see the full error message
      thumbnailAspectRatio,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'thumbnailsOrientation' does not exist on... Remove this comment to see the full error message
      thumbnailsOrientation,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'zoomProps' does not exist on type 'Reado... Remove this comment to see the full error message
      zoomProps: { zoomType },
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'showPaginationDots' does not exist on ty... Remove this comment to see the full error message
      showPaginationDots = true,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'showNavigationArrows' does not exist on ... Remove this comment to see the full error message
      showNavigationArrows = true,
      displayThumbnailsArrows = false,
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
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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

    const thumbnailSwiper = (
      <ThumbnailSwiper
        onSwiper={(instance: any) => this.setState({ thumbSwiper: instance })}
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

    return (
      <div className={containerClasses} aria-hidden="true">
        {isThumbsVertical && thumbnailSwiper}

        <div className={imageClasses}>
          <Swiper
            onSwiper={(instance) => this.setState({ gallerySwiper: instance })}
            className={cssHandles.productImagesGallerySwiperContainer}
            threshold={10}
            resistanceRatio={slides.length > 1 ? 0.85 : 0}
            onSlideChange={this.handleSlideChange}
            updateOnWindowResize
            {...this.galleryParams}
          >
            {slides.map((slide, i) => (
              <SwiperSlide
                key={`slider-${i}`}
                className={`${cssHandles.productImagesGallerySlide} swiper-slide center-all`}
              >
                {this.renderSlide(slide, i)}
              </SwiperSlide>
            ))}

            <div
              key="pagination"
              className={classNames(styles['swiper-pagination'], {
                dn: slides.length === 1 || !showPaginationDots,
              })}
            />

            <div
              className={classNames({
                dn: slides.length === 1 || !showNavigationArrows,
              })}
            >
              <span
                key="caret-next"
                className={`swiper-caret-next pl7 pr2 right-0 ${CARET_CLASSNAME} ${cssHandles.swiperCaret} ${cssHandles.swiperCaretNext}`}
              >
                <IconCaret
                  orientation="right"
                  size={CARET_ICON_SIZE}
                  className={styles.carouselIconCaretRight}
                />
              </span>
              <span
                key="caret-prev"
                className={`swiper-caret-prev pr7 pl2 left-0 ${CARET_CLASSNAME} ${cssHandles.swiperCaret} ${cssHandles.swiperCaretPrev}`}
              >
                <IconCaret
                  orientation="left"
                  size={CARET_ICON_SIZE}
                  className={styles.carouselIconCaretLeft}
                />
              </span>
            </div>
          </Swiper>

          {!isThumbsVertical && thumbnailSwiper}
        </div>
      </div>
    )
  }
}

// @ts-expect-error ts-migrate(2345) FIXME: Type '{ cssHandles: Record<string, string>; }' has... Remove this comment to see the full error message
export default withCssHandles(CSS_HANDLES)(Carousel)
