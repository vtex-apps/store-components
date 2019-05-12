import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import classNames from 'classnames'
import { path, equals } from 'ramda'

import { IconCaret } from 'vtex.store-icons'
import { NoSSR, withRuntimeContext } from 'vtex.render-runtime'

import BlurredLoader from '../BlurredLoader'
import Loader from './Loader.js'
import Video from '../Video'

import styles from '../../styles.css'
import './global.css'

import Gallery from '../Gallery'

const Swiper = window.navigator ? require('react-id-swiper').default : null

const initialState = {
  loaded: [],
  thumbUrl: [],
  alt: [],
  thumbsLoaded: false,
  activeIndex: 0,
  isGalleryOpen: false,
}

class Carousel extends Component {
  state = initialState

  thumbSwiper = React.createRef()
  gallerySwiper = React.createRef()

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

  debouncedRebuildOnUpdate = debounce(() => {
    this.thumbSwiper.current && this.thumbSwiper.current.swiper.update()
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

  componentDidMount() {
    window.addEventListener('resize', this.debouncedRebuildOnUpdate)

    this.setInitialVariablesState()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedRebuildOnUpdate)

    this.debouncedRebuildOnUpdate.clear()
  }

  componentDidUpdate(prevProps) {
    const { loaded, activeIndex } = this.state
    const isVideo = this.isVideo
    const gallerySwiper = path(['swiper'], this.gallerySwiper.current)

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
    const activeIndex = path(
      ['swiper', 'activeIndex'],
      this.gallerySwiper.current
    )
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

  get slideZoom() {
    return path(['swiper', 'zoom'], this.gallerySwiper.current)
  }

  get galleryParams() {
    const { thumbSwiper } = this.state
    const {
      slides,
      zoomProps: { zoomType, desktopTrigger },
      runtime: { hints: { mobile } }
    } = this.props

    const iconSize = 24
    const caretClassName =
      'pv7 absolute top-50 translate--50y z-2 pointer c-action-primary'

    const toogleZoom = event => {
      const { sliderChanged } = this.state
      const gallerySwiperZoom = this.slideZoom

      if (sliderChanged) {
        this.setState({ sliderChanged: false })
      } else {
        gallerySwiperZoom.toggle(event)
      }
    }

    return {
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
        <span className={`swiper-caret-next pl7 pr5 right-0 ${caretClassName}`}>
          <IconCaret
            orientation="right"
            size={iconSize}
            className={styles.carouselIconCaretRight}
          />
        </span>
      ),
      renderPrevButton: () => (
        <span className={`swiper-caret-prev pr7 pl5 left-0 ${caretClassName}`}>
          <IconCaret
            orientation="left"
            size={iconSize}
            className={styles.carouselIconCaretLeft}
          />
        </span>
      ),
      on: {
        slideChange: this.onSlideChange,
        click: zoomType === 'in-page' && (mobile || desktopTrigger === 'on-hover') ? toogleZoom : undefined,
      },
    }
  }

  render() {
    const { thumbsLoaded, isGalleryOpen, selectedIndex } = this.state

    const {
      slides,
      position,
      zoomProps: { zoomType, bgOpacity, desktopTrigger },
      runtime: {
        hints: { desktop },
      },
    } = this.props

    if (!thumbsLoaded || Swiper == null) {
      return <Loader slidesAmount={slides ? slides.length : 0} />
    }

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

    const zoomListeners = desktop && desktopTrigger === 'on-hover' && {
      onMouseMove: e => {
        this.slideZoom.in(e)
        // I know this is is weird... But it was the only way I've found to
        // prevent the locking of the zoom after a click.
        this.slideZoom.disable()
      },
      onMouseLeave: () => this.slideZoom.out(),
    }

    return (
      <div className="relative overflow-hidden" aria-hidden="true">
        <div className={thumbClasses}>
          <Swiper {...thumbnailParams} ref={this.thumbSwiper}>
            {slides.map((slide, i) => (
              <div
                key={i}
                className="swiper-slide w-100 h-auto mb5 pointer"
                onClick={() => this.gallerySwiper.current.swiper.slideTo(i)}
              >
                <figure
                  itemProp="associatedMedia"
                  itemScope
                  itemType="http://schema.org/ImageObject"
                >
                  <img
                    className="w-100 h-auto db"
                    itemProp="thumbnail"
                    alt={slide.alt ? this.state.alt[i] : ''}
                    src={slide.thumbUrl || this.state.thumbUrl[i]}
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
          <Swiper {...this.galleryParams} ref={this.gallerySwiper}>
            {slides.map((slide, i) => (
              <div key={i} className="swiper-slide center-all" {...zoomListeners}>
                {this.renderSlide(slide, i)}
              </div>
            ))}
          </Swiper>
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

export default withRuntimeContext(Carousel)
