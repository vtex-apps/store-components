import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import classNames from 'classnames'
import { path, equals } from 'ramda'
import ReactResizeDetector from 'react-resize-detector'

import { IconCaret } from 'vtex.store-icons'
import { NoSSR } from 'vtex.render-runtime'

import BlurredLoader from '../BlurredLoader'
import Loader from './Loader.js'
import Video from '../Video'

import styles from '../../styles.css'
import './global.css'

import Gallery from '../Gallery'

/** Swiper and its modules are imported using require to avoid breaking SSR */
const Swiper = window.navigator ? require('react-id-swiper/lib/ReactIdSwiper.full').default : null
const SwiperModules = window.navigator ? require('swiper/dist/js/swiper.esm') : null

import { THUMB_SIZE, imageUrlForSize } from '../../../module/images'

const initialState = {
  loaded: [],
  thumbUrl: [],
  alt: [],
  thumbsLoaded: false,
  activeIndex: 0,
  isGalleryOpen: false,
  thumbSwiper: null,
  gallerySwiper: null,
}

class Carousel extends Component {
  state = initialState

  setInitialVariablesState() {
    const slides = this.props.slides || []

    this.isVideo = []
    this.thumbLoadCount = 0

    slides.forEach((slide, i) => {
      if (slide.type === 'video') {
        this.isVideo[i] = true
        Video.getThumbUrl(slide.src, slide.thumbWidth).then(this.getThumb)
      } else this.getThumb(slide.thumbUrl)
    })
  }

  updateSwiperSize = debounce(() => {
    const { thumbSwiper, gallerySwiper } = this.state
    if (thumbSwiper) {
      thumbSwiper.update()
    }

    if (gallerySwiper) {
      gallerySwiper.update()
    }
  }, 500)

  getThumb = thumbUrl => {
    if (!window.navigator) return // Image object doesn't exist when it's being rendered in the server side

    const image = new Image()
    image.onload = () => {
      this.thumbLoadCount++
      if (this.thumbLoadCount === this.props.slides.length) {
        this.setState({ thumbsLoaded: true })
      }
    }
    image.src = thumbUrl
  }

  handleResize = () => {
    this.updateSwiperSize()
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)

    this.setInitialVariablesState()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)

    this.updateSwiperSize.clear()
  }

  componentDidUpdate(prevProps) {
    const { loaded, activeIndex, gallerySwiper } = this.state
    const isVideo = this.isVideo

    if (!equals(prevProps.slides, this.props.slides)) {
      this.setInitialVariablesState()
      this.setState(initialState)
      return
    }

    const paginationElement = path(['pagination', 'el'], gallerySwiper)
    if (paginationElement) paginationElement.hidden = isVideo[activeIndex]

    const gallerySwiperZoom = path(['zoom'], gallerySwiper)

    if (gallerySwiperZoom) {
      loaded[activeIndex]
        ? gallerySwiperZoom.enable()
        : gallerySwiperZoom.disable()
    }
  }

  onSlideChange = () => {
    const activeIndex = path(['activeIndex'], this.state.gallerySwiper)
    this.setState({ activeIndex, sliderChanged: true })
  }

  setVideoThumb = i => (url, title) => {
    const thumbUrl = { ...this.state.thumbUrl }
    const alt = { ...this.state.alt }

    thumbUrl[i] = url
    alt[i] = title

    this.setState({ thumbUrl, alt })
  }

  onImageLoad = i => () => {
    const loaded = { ...this.state.loaded }
    loaded[i] = true
    this.setState({ loaded })
  }

  openGallery = idx => {
    this.setState({ selectedIndex: idx, isGalleryOpen: true })
  }

  renderSlide = (slide, i) => {
    const {
      zoomProps: { zoomType },
    } = this.props

    switch (slide.type) {
      case 'image':
        return (
          <BlurredLoader
            isZoomEnabled={zoomType === 'in-page'}
            loaderType="SPINNER"
            loaderUrl={slide.thumbUrl}
            realUrls={slide.urls}
            bestUrlIndex={slide.bestUrlIndex}
            alt={slide.alt}
            onload={this.onImageLoad(i)}
            onClick={
              zoomType === 'gallery' ? () => this.openGallery(i) : undefined
            }
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
    const { thumbSwiper } = this.state
    const {
      slides,
      zoomProps: { zoomType },
    } = this.props

    const iconSize = 24
    const caretClassName =
      'pv7 absolute top-50 translate--50y z-2 pointer c-action-primary'

    const setZoom = event => {
      const { sliderChanged, gallerySwiper } = this.state
      const gallerySwiperZoom = path(['zoom'], gallerySwiper)

      if (sliderChanged) {
        this.setState({ sliderChanged: false })
      } else {
        gallerySwiperZoom.toggle(event)
      }
    }

    return {
      modules: [SwiperModules.Pagination, SwiperModules.Navigation],
      containerClass: 'swiper-container',
      ...(slides.length > 1 && {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletActiveClass: 'c-action-primary swiper-pagination-bullet-active',
        },
      }),
      ...(slides.length > 1 && {
        navigation: {
          prevEl: '.swiper-caret-prev',
          nextEl: '.swiper-caret-next',
          disabledClass: `c-disabled ${styles.carouselCursorDefault}`,
        },
      }),
      thumbs: {
        swiper: thumbSwiper,
      },
      zoom: zoomType === 'in-page' && {
        maxRatio: 2,
        toggle: false,
      },

      resistanceRatio: slides.length > 1 ? 0.85 : 0,
      renderNextButton: () => (
        <span className={`swiper-caret-next pl7 right-1 ${caretClassName}`}>
          <IconCaret
            orientation="right"
            size={iconSize}
            className={styles.carouselIconCaretRight}
          />
        </span>
      ),
      renderPrevButton: () => (
        <span className={`swiper-caret-prev pr7 left-1 ${caretClassName}`}>
          <IconCaret
            orientation="left"
            size={iconSize}
            className={styles.carouselIconCaretLeft}
          />
        </span>
      ),
      on: {
        slideChange: this.onSlideChange,
        click: zoomType === 'in-page' ? event => setZoom(event) : undefined,
      },
      getSwiper: swiper => this.setState({ gallerySwiper: swiper }),
    }
  }

  render() {
    const { thumbsLoaded, isGalleryOpen, selectedIndex, gallerySwiper } = this.state

    const {
      slides,
      position,
      zoomProps: { zoomType, bgOpacity },
    } = this.props

    if (!thumbsLoaded || Swiper == null) {
      return <Loader slidesAmount={slides ? slides.length : 0} />
    }

    const thumbnailParams = {
      observer: true,
      containerClass: 'swiper-container h-100',
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      freeMode: false,
      direction: 'vertical',
      slidesPerView: 'auto',
      touchRatio: 1,
      mousewheel: false,
      preloadImages: true,
      shouldSwiperUpdate: true,
      zoom: false,
      threshold: 8,
      slidesPerGroup: 4,
      getSwiper: swiper => this.setState({ thumbSwiper: swiper }),
    }

    const galleryCursor = {
      gallery: !isGalleryOpen && 'pointer',
      'in-page': styles.carouselGaleryCursor,
      'no-zoom': '',
    }

    const imageClasses = classNames(
      `w-100 border-box ${galleryCursor[zoomType]}`,
      {
        'ml-20-ns w-80-ns': position === 'left' && slides.length > 1,
        'mr-20-ns w-80-ns': position === 'right' && slides.length > 1,
      }
    )

    const thumbClasses = classNames(
      `w-20 ${styles.carouselGaleryThumbs} bottom-0 top-0 absolute dn`,
      {
        'db-ns': slides.length > 1,
        'left-0 pr5': position === 'left',
        'right-0 pl5': position === 'right',
      }
    )

    return (
      <div className="relative overflow-hidden w-100" aria-hidden="true">
        <div className={thumbClasses}>
          <Swiper {...thumbnailParams} rebuildOnUpdate>
            {slides.map((slide, i) => (
              <div
                key={i}
                className="swiper-slide w-100 h-auto mb5 pointer"
                onClick={() => gallerySwiper && gallerySwiper.slideTo(i)}
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
                    alt={slide.alt ? this.state.alt[i] : ''}
                    src={imageUrlForSize(slide.thumbUrl || this.state.thumbUrl[i], THUMB_SIZE)}
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
        <div className={imageClasses}>
          <ReactResizeDetector handleHeight onResize={this.updateSwiperSize}>
            <Swiper {...this.galleryParams} rebuildOnUpdate>
              {slides.map((slide, i) => (
                <div key={i} className="swiper-slide center-all">
                  {this.renderSlide(slide, i)}
                </div>
              ))}
            </Swiper>
          </ReactResizeDetector>
          {zoomType === 'gallery' && (
            <NoSSR>
              <Gallery
                items={slides}
                index={selectedIndex}
                isOpen={isGalleryOpen}
                handleClose={() => this.setState({ isGalleryOpen: false })}
                bgOpacity={bgOpacity}
              />
            </NoSSR>
          )}
        </div>
      </div>
    )
  }
}

Carousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      urls: PropTypes.arrayOf(PropTypes.string),
      alt: PropTypes.string,
      thumbUrl: PropTypes.string,
      bestUrlIndex: PropTypes.number,
    })
  ),
}

export default Carousel
