import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import classNames from 'classnames'
import { path, equals } from 'ramda'

import { IconCaret } from 'vtex.store-icons'

import BlurredLoader from '../BlurredLoader'
import Loader from './Loader.js'
import Video from '../Video'

import styles from '../../styles.css'
import './global.css'

const Swiper = window.navigator ? require('react-id-swiper').default : null

const initialState = {
  loaded: [],
  thumbUrl: [],
  alt: [],
  thumbsLoaded: false,
  activeIndex: 0,
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

  onSlideChange = () => {
    const activeIndex = path([
      'swiper',
      'activeIndex',
      this.gallerySwiper.currrent,
    ])
    this.setState({ activeIndex })
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

  renderSlide = (slide, i) => {
    const { loaded } = this.state

    switch (slide.type) {
      case 'image':
        return (
          <div
            className={loaded[i] ? 'swiper-zoom-container' : 'overflow-hidden'}
          >
            <BlurredLoader
              loaderType="SPINNER"
              loaderUrl={slide.thumbUrl}
              realUrls={slide.urls}
              bestUrlIndex={slide.bestUrlIndex}
              alt={slide.alt}
              onload={this.onImageLoad(i)}
            />
          </div>
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

  render() {
    const { thumbSwiper, thumbsLoaded } = this.state
    const { slides } = this.props

    if (!thumbsLoaded || Swiper == null) {
      return <Loader slidesAmount={slides ? slides.length : 0} />
    }

    const iconSize = 24
    const caretClassName =
      'pv7 absolute top-50 translate--50y z-2 pointer c-action-primary'
    const galleryParams = {
      containerClass: 'swiper-container',
      pagination:
        slides.length > 1
          ? {
            el: '.swiper-pagination',
            clickable: true,
            bulletActiveClass:
              'c-action-primary swiper-pagination-bullet-active',
          }
          : {},
      navigation:
        slides.length > 1
          ? {
            prevEl: '.swiper-caret-prev',
            nextEl: '.swiper-caret-next',
            disabledClass: `c-disabled ${styles.carouselCursorDefault}`,
          }
          : {},
      thumbs: {
        swiper: thumbSwiper,
      },
      zoom: {
        maxRatio: 2,
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
      },
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
    }

    return (
      <div className={'relative overflow-hidden'}>
        <div
          className={classNames(
            `w-20 ${
            styles.carouselGaleryThumbs
            } bottom-0 top-0 left-0 absolute pr5 dn`,
            { 'db-ns': slides.length > 1 }
          )}
        >
          <Swiper {...thumbnailParams} ref={this.thumbSwiper}>
            {slides.map((slide, i) => (
              <div 
                key={i}
                className="swiper-slide w-100 h-auto mb5" 
                onClick={() => this.gallerySwiper.current.swiper.slideTo(i)}
              >
                <img
                  className="w-100 h-auto db"
                  alt={slide.alt ? this.state.alt[i] : ''}
                  src={slide.thumbUrl || this.state.thumbUrl[i]}
                />
                <div
                  className={`absolute absolute--fill b--solid b--muted-2 bw1 pointer ${
                    styles.carouselThumbBorder
                    }`}
                />
              </div>
            ))}
          </Swiper>
        </div>
        <div
          className={classNames(
            `w-100 border-box ${styles.carouselGaleryCursor}`,
            {
              'w-80-ns ml-20-ns': slides.length > 1,
            }
          )}
        >
          <Swiper {...galleryParams} ref={this.gallerySwiper}>
            {slides.map((slide, i) => (
              <div key={i} className="swiper-slide center-all">
                {this.renderSlide(slide, i)}
              </div>
            ))}
          </Swiper>
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
