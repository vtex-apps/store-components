import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import classNames from 'classnames'
import { path, equals } from 'ramda'

import { IconCaret } from 'vtex.store-icons'
import { NoSSR, withRuntimeContext } from 'vtex.render-runtime'

import Loader from './Loader.js'
import Video from '../Video'

import styles from '../../styles.css'
import './global.css'

import Gallery from '../Gallery'
import Slide from './Slide'
import Thumbnails from './Thumbnails'
import Swiper from 'react-id-swiper'

// const Swiper = window.navigator ? require('react-id-swiper').default : null

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
    const { activeIndex } = this.state
    const isVideo = this.isVideo
    const gallerySwiper = path(['swiper'], this.gallerySwiper.current)

    if (!equals(prevProps.slides, this.props.slides)) {
      this.setInitialVariablesState()
      this.setState(initialState)
      return
    }

    const paginationElement = path(['pagination', 'el'], gallerySwiper)
    if (paginationElement) paginationElement.hidden = isVideo[activeIndex]
  }

  onSlideChange = () => {
    const {
      zoomProps: { zoomType, desktopTrigger },
    } = this.props

    const activeIndex = path(
      ['swiper', 'activeIndex'],
      this.gallerySwiper.current
    )

    this.setState({ activeIndex, sliderChanged: false })

    if (zoomType === 'in-page' && desktopTrigger === 'on-hover') {
      const currentSwiper = path(['swiper'], this.gallerySwiper.current)
      currentSwiper.detachEvents()
    }
  }

  onImageLoad = i => () => {
    const loaded = { ...this.state.loaded }
    loaded[i] = true
    this.setState({ loaded })
  }

  openGallery = idx => {
    this.setState({ selectedIndex: idx, isGalleryOpen: true })
  }

  get slideZoom() {
    return path(['swiper', 'zoom'], this.gallerySwiper.current)
  }

  get galleryParams() {
    const { thumbSwiper } = this.state
    const {
      slides,
      zoomProps: { zoomType, desktopTrigger },
      runtime: {
        hints: { mobile },
      },
    } = this.props

    const iconSize = 24
    const caretClassName =
      'pv7 absolute top-50 translate--50y z-2 pointer c-action-primary'

    const toogleZoom = event => {
      const { sliderChanged } = this.state

      if (sliderChanged) {
        this.setState({ sliderChanged: false })
      } else {
        this.slideZoom.toggle(event)
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
      zoom: false,

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

    const zoomListeners = zoomType === 'in-page' &&
      desktop &&
      desktopTrigger === 'on-hover' && {
        onMouseMove: e => {
          this.slideZoom.in(e)
          // FIXME Won't be necessary to do this once we use a custom zoom and refactor this component.
          this.slideZoom.disable()
        },
        onMouseLeave: () => {
          this.slideZoom.out()
        },
      }

    return (
      <div className="relative overflow-hidden" aria-hidden="true">
        <Thumbnails
          slides={slides}
          onThumbClick={idx => this.gallerySwiper.current.swiper.slideTo(idx)}
          ref={this.thumbSwiper}
        />
        <div className={imageClasses}>
          <Swiper {...this.galleryParams} ref={this.gallerySwiper}>
            {slides.map((slide, i) => (
              <div
                key={i}
                className="swiper-slide center-all"
                {...zoomListeners}
              >
                <Slide
                  slide={slide}
                  onLoad={() => this.onImageLoad(i)}
                  onClick={
                    zoomType === 'gallery'
                      ? () => this.openGallery(i)
                      : undefined
                  }
                />
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
  zoomProps: PropTypes.shape({
    zoomType: PropTypes.string.required,
    desktopTrigger: PropTypes.string,
    bgOpacity: PropTypes.number,
  }),
}

export default withRuntimeContext(Carousel)
