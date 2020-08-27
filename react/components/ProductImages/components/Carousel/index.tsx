/* eslint-disable react/prop-types */
import React, { Component } from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/debounce` if it exists or ... Remove this comment to see the full error message
import debounce from 'debounce'
import classNames from 'classnames'
import { path, equals } from 'ramda'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-resize-detector` if ... Remove this comment to see the full error message
import ReactResizeDetector from 'react-resize-detector'
import { IconCaret } from 'vtex.store-icons'
import { withCssHandles, applyModifiers } from 'vtex.css-handles'

import Video, { getThumbUrl } from '../Video'
import ProductImage from '../ProductImage'
import styles from '../../styles.css'
import './global.css'
import ThumbnailSwiper from './ThumbnailSwiper'
import {
  THUMBS_ORIENTATION,
  THUMBS_POSITION_HORIZONTAL,
} from '../../utils/enums'

/**
 * ReactIdSwiper cannot be SSRendered, so this is a fake swiper that copies some of its classes and HTML layout and render only the first image of the children array.
 */
const FakeSwiper = ({
  children,
  containerClass,
  direction = THUMBS_ORIENTATION.HORIZONTAL,
}: any) => {
  const swiperContainerDirection =
    direction === THUMBS_ORIENTATION.HORIZONTAL
      ? 'swiper-container-horizontal'
      : direction === THUMBS_ORIENTATION.VERTICAL
      ? 'swiper-container-vertical'
      : ''

  const childrenArray = React.Children.toArray(children)

  if (childrenArray.length === 0) {
    return null
  }

  const [child] = childrenArray
  const childClass = path(['props', 'className'], child)
  const newChildClass = childClass
    ? `${childClass} swiper-slide-active`
    : childClass

  return (
    <div
      className={`${containerClass} swiper-container-initialized ${swiperContainerDirection}`}
    >
      <div className="swiper-wrapper">
        {/* @ts-expect-error ts-migrate(2769) FIXME: Type 'string' is not assignable to type 'ReactElem... Remove this comment to see the full error message */}
        {React.cloneElement(child, {
          className: newChildClass,
        })}
      </div>
    </div>
  )
}

/** Swiper and its modules are imported using require to avoid breaking SSR */
const Swiper = window.navigator
  ? require('react-id-swiper/lib/ReactIdSwiper').default
  : FakeSwiper
// eslint-disable-next-line padding-line-between-statements
const SwiperModules = window.navigator ? require('swiper/dist/js/swiper') : {}

const CSS_HANDLES = [
  'carouselContainer',
  'productImagesThumbsSwiperContainer',
  'productImagesGallerySwiperContainer',
  'productImagesGallerySlide',
  'swiperCaret',
  'swiperCaretNext',
  'swiperCaretPrev',
  'productImagesThumbCaret',
  'swiperBullet',
]

const initialState = {
  loaded: [],
  thumbUrl: [],
  alt: [],
  thumbsLoaded: false,
  activeIndex: 0,
}

type CarouselProps = {
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

type CarouselState = any

class Carousel extends Component<CarouselProps, CarouselState> {
  isVideo: any
  thumbLoadCount: any

  thumbSwiper = null
  gallerySwiper = null
  state = initialState

  async setInitialVariablesState() {
    const slides = this.props.slides || []

    this.isVideo = []
    this.thumbLoadCount = 0

    slides.forEach(async (slide, i) => {
      if (slide.type === 'video') {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'src' does not exist on type '{ type?: st... Remove this comment to see the full error message
        const thumbUrl = await getThumbUrl(slide.src, slide.thumbWidth)

        this.isVideo[i] = true
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        this.setVideoThumb(i)(thumbUrl)
        this.thumbLoadFinish()
      } else {
        this.getThumb(slide.thumbUrl)
      }
    })
  }

  updateSwiperSize = debounce(() => {
    if (this.thumbSwiper) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this.thumbSwiper.update()
    }

    if (this.gallerySwiper) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      this.gallerySwiper.update()
    }
  }, 500)

  thumbLoadFinish = () => {
    this.thumbLoadCount++
    if (
      !this.props.slides ||
      this.thumbLoadCount === this.props.slides.length
    ) {
      this.setState({ thumbsLoaded: true })
    }
  }

  getThumb = (thumbUrl: any) => {
    if (!window.navigator) return // Image object doesn't exist when it's being rendered in the server side
    const image = new Image()

    image.onload = () => {
      this.thumbLoadFinish()
    }

    image.onerror = () => {
      this.thumbLoadFinish()
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

  componentDidUpdate(prevProps: CarouselProps) {
    const { loaded, activeIndex } = this.state
    const { isVideo } = this

    if (!equals(prevProps.slides, this.props.slides)) {
      this.setInitialVariablesState()
      this.setState(initialState)
      if (this.props.slides && this.props.slides.length > 1) {
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        this.gallerySwiper && this.gallerySwiper.slideTo(0)
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        this.thumbSwiper && this.thumbSwiper.slideTo(0)
      }

      return
    }

    const paginationElement = path(['pagination', 'el'], this.gallerySwiper)

    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    if (paginationElement) paginationElement.hidden = isVideo[activeIndex]

    const gallerySwiperZoom = path(['zoom'], this.gallerySwiper)

    if (gallerySwiperZoom) {
      loaded[activeIndex]
        ? // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
          gallerySwiperZoom.enable()
        : // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
          gallerySwiperZoom.disable()
    }
  }

  onSlideChange = () => {
    const activeIndex = path(['activeIndex'], this.gallerySwiper)

    this.setState({ activeIndex, sliderChanged: true })
  }

  setVideoThumb = (i: any) => (url: any, title: any) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const thumbUrl = { ...this.state.thumbUrl }
    // eslint-disable-next-line react/no-access-state-in-setstate
    const alt = { ...this.state.alt }

    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    thumbUrl[i] = url
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    alt[i] = title

    this.setState({ thumbUrl, alt })
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
    const {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'cssHandles' does not exist on type 'Read... Remove this comment to see the full error message
      cssHandles,
      slides = [],
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'showPaginationDots' does not exist on ty... Remove this comment to see the full error message
      showPaginationDots = true,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'showNavigationArrows' does not exist on ... Remove this comment to see the full error message
      showNavigationArrows = true,
    } = this.props

    const iconSize = 24
    const caretClassName =
      'pv8 absolute top-50 translate--50y z-2 pointer c-action-primary'

    return {
      modules: [SwiperModules.Pagination, SwiperModules.Navigation],
      containerClass: `swiper-container ${cssHandles.productImagesGallerySwiperContainer}`,
      ...(slides.length > 1 &&
        showPaginationDots && {
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            // custom props from vtex/swiper
            bulletSelector: `.swiper-pagination-bullet`,
            bulletClass: `swiper-pagination-bullet ${cssHandles.swiperBullet}`,
            bulletActiveClass: `c-action-primary swiper-pagination-bullet-active ${applyModifiers(
              cssHandles.swiperBullet,
              'active'
            )}`,
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
        swiper: this.thumbSwiper,
      },
      threshold: 10,
      resistanceRatio: slides.length > 1 ? 0.85 : 0,
      ...(showNavigationArrows && {
        renderNextButton: () => (
          <span
            className={`swiper-caret-next pl7 pr2 right-0 ${caretClassName} ${cssHandles.swiperCaret} ${cssHandles.swiperCaretNext}`}
          >
            <IconCaret
              orientation="right"
              size={iconSize}
              className={styles.carouselIconCaretRight}
            />
          </span>
        ),
        renderPrevButton: () => (
          <span
            className={`swiper-caret-prev pr7 pl2 left-0 ${caretClassName} ${cssHandles.swiperCaret} ${cssHandles.swiperCaretPrev}`}
          >
            <IconCaret
              orientation="left"
              size={iconSize}
              className={styles.carouselIconCaretLeft}
            />
          </span>
        ),
      }),
      on: {
        slideChange: this.onSlideChange,
      },
      getSwiper: (swiper: any) => {
        if (this.gallerySwiper !== swiper) {
          this.gallerySwiper = swiper
        }
      },
    }
  }

  get thumbnailsParams() {
    const {
      displayThumbnailsArrows,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'thumbnailsOrientation' does not exist on... Remove this comment to see the full error message
      thumbnailsOrientation,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'cssHandles' does not exist on type 'Read... Remove this comment to see the full error message
      cssHandles,
    } = this.props

    const isThumbsVertical =
      thumbnailsOrientation === THUMBS_ORIENTATION.VERTICAL

    const caretSize = 24
    const caretClassName = `${cssHandles.productImagesThumbCaret} absolute z-2 pointer c-action-primary flex pv2`
    const caretStyle = { transition: 'opacity 200ms' }

    return {
      modules: [SwiperModules.Navigation],
      ...(displayThumbnailsArrows && {
        navigation: {
          prevEl: '.swiper-thumbnails-caret-prev',
          nextEl: '.swiper-thumbnails-caret-next',
          disabledClass: `c-disabled o-0 pointer-events-none ${styles.carouselCursorDefault}`,
          hiddenClass: 'dn',
        },
        renderNextButton: () => {
          const classes = classNames(
            'swiper-thumbnails-caret-next',
            caretClassName,
            {
              [`bottom-0 pt7 left-0 justify-center w-100 ${styles.gradientBaseBottom}`]: isThumbsVertical,
              [`right-0 top-0 items-center h-100 pl6 ${styles.gradientBaseRight}`]: !isThumbsVertical,
            }
          )

          return (
            <span className={classes} style={caretStyle}>
              <IconCaret
                orientation={isThumbsVertical ? 'down' : 'right'}
                size={caretSize}
              />
            </span>
          )
        },
        renderPrevButton: () => {
          const classes = classNames(
            'swiper-thumbnails-caret-prev top-0 left-0',
            caretClassName,
            {
              [`pb7 justify-center w-100 ${styles.gradientBaseTop}`]: isThumbsVertical,
              [`items-center h-100 pr6 ${styles.gradientBaseLeft}`]: !isThumbsVertical,
            }
          )

          return (
            <span className={classes} style={caretStyle}>
              <IconCaret
                orientation={isThumbsVertical ? 'up' : 'left'}
                size={caretSize}
              />
            </span>
          )
        },
      }),
      observer: true,
      containerClass: `swiper-container h-100 ${cssHandles.productImagesThumbsSwiperContainer}`,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      freeMode: false,
      // It seems crazy but this is just
      // an workaround to make it work the thumbnails with the carousel
      slideActiveClass: 'undefined',
      slideNextClass: 'undefined',
      slidePrevClass: 'undefined',
      direction: thumbnailsOrientation,
      slidesPerView: 'auto',
      touchRatio: 1,
      mousewheel: false,
      preloadImages: true,
      shouldSwiperUpdate: true,
      zoom: false,
      threshold: 8,
      /* Slides are grouped when thumbnails arrows are enabled
       * so that clicking on next/prev will scroll more than
       * one thumbnail */
      slidesPerGroup: displayThumbnailsArrows ? 4 : 1,
      getSwiper: (swiper: any) => {
        if (this.thumbSwiper !== swiper) {
          this.thumbSwiper = swiper
        }
      },
    }
  }

  render() {
    const { thumbsLoaded, activeIndex } = this.state

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

    const thumbnailSwiper = thumbsLoaded && hasThumbs && (
      <ThumbnailSwiper
        isThumbsVertical={isThumbsVertical}
        slides={slides}
        activeIndex={activeIndex}
        swiperParams={this.thumbnailsParams}
        thumbUrls={this.state.thumbUrl}
        position={position}
        onThumbClick={(index: any) =>
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          this.gallerySwiper && this.gallerySwiper.slideTo(index)
        }
        thumbnailAspectRatio={thumbnailAspectRatio}
        thumbnailMaxHeight={thumbnailMaxHeight}
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

    const SliderComponent = slides.length === 1 ? FakeSwiper : Swiper

    return (
      <div className={containerClasses} aria-hidden="true">
        {isThumbsVertical && thumbnailSwiper}
        <div className={imageClasses}>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <ReactResizeDetector handleHeight onResize={this.updateSwiperSize}>
            <SliderComponent {...this.galleryParams} shouldSwiperUpdate>
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className={`${cssHandles.productImagesGallerySlide} swiper-slide center-all`}
                >
                  {this.renderSlide(slide, i)}
                </div>
              ))}
            </SliderComponent>
          </ReactResizeDetector>
          {!isThumbsVertical && thumbnailSwiper}
        </div>
      </div>
    )
  }
}

// @ts-expect-error ts-migrate(2345) FIXME: Type '{ cssHandles: Record<string, string>; }' has... Remove this comment to see the full error message
export default withCssHandles(CSS_HANDLES)(Carousel)
