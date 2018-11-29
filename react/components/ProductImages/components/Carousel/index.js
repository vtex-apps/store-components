import React, { Component } from 'react'
import BluredLoader from '../BluredLoader'
import {IconCaretLeft, IconCaretRight} from 'vtex.styleguide'
import Video from '../Video'
import debounce from 'debounce'
import Loader from './Loader.js'

import './global.css'

const Swiper = window.navigator ? require('react-id-swiper').default : null

class Carousel extends Component {
  constructor(props){
    super(props)

    this.isVideo = []
    this.state = {
      Swiper: null,
      loaded: [],
      thumbSwiper: null,
      gallerySwiper: null,
      thumbUrl: [],
      alt: [],
      thumbsLoaded: false,
      activeIndex: 0,
    }

    this.rebuildGalleryOnUpdate = false
    this.thumbLoadCount = 0

    this.props.slides.forEach((slide, i) => {
      if(slide.type === 'video') {
        this.isVideo[i] = true
        Video.getThumbUrl(slide.src, slide.thumbWidth).then(this.getThumb)
      }
      else this.getThumb(slide.thumbUrl)
    })
  }

  debouncedRebuildOnUpdate = debounce(() => {
    this.state.thumbSwiper && this.state.thumbSwiper.update()
  }, 500)

  getThumb = (thumbUrl) => {
    if(!window.navigator) return // Image object doesn't exist when it's being rendered in the server side

    const image = new Image()
    image.onload = () => {
      this.thumbLoadCount++
      if(this.thumbLoadCount === this.props.slides.length)
        this.setState({thumbsLoaded: true})
    }
    image.src = thumbUrl
  }

  componentDidMount() {
    window.addEventListener('resize', this.debouncedRebuildOnUpdate)
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.debouncedRebuildOnUpdate)
  }

  linkThumb = () => {
    const _this = this
    return function () {
      this.visibleSlidesIndexes || (this.visibleSlidesIndexes = [])  // Swiper bug fix
      _this.rebuildGalleryOnUpdate = true
      _this.setState({ thumbSwiper: this })
    }
  }

  linkGallery = () => {
    const _this = this
    return function () {
      _this.setState({ gallerySwiper: this })
    }
  }

  onSlideChange = () => {
    const _this = this
    return function() {
      return
      const { activeIndex } = this
      _this.setState({ activeIndex })
    }
  }

  setVideoThumb = (i) => (url, title) => {
    const thumbUrl = {...this.state.thumbUrl}
    const alt = {...this.state.alt}

    thumbUrl[i] = url
    alt[i] = title

    this.setState({thumbUrl, alt})
  }

  onImageLoad = (i) => () => {
    const loaded = {...this.state.loaded}
    loaded[i] = true
    this.setState({loaded})
  }

  renderSlide = (slide, i) => {
    const {loaded} = this.state

    switch (slide.type) {
      case "image":
        return (
          <div className={loaded[i] ? "swiper-zoom-container" : "overflow-hidden"}>
            <BluredLoader
              loaderType="spinner"
              loaderUrl={slide.thumbUrl}
              realUrls={slide.urls}
              thresholds={slide.thresholds}
              alt={slide.alt}
              onload={this.onImageLoad(i)}/>
          </div>)
      case "video":
        return <Video url={slide.src} setThumb={this.setVideoThumb(i)} playing={i === this.state.activeIndex} id={i}/>
      default:
        return null
    }
  }

  render() {
    const { thumbSwiper, gallerySwiper, thumbsLoaded, loaded, activeIndex } = this.state
    const { rebuildGalleryOnUpdate, isVideo } = this
    const { slides } = this.props

    if(!thumbsLoaded || Swiper == null) return <Loader slidesAmount={slides.length}/>

    const galleryParams = {
      containerClass: "swiper-container",
      pagination: slides.length > 1 ? {
        el: '.swiper-pagination',
        clickable: true,
        bulletActiveClass: "c-action-primary swiper-pagination-bullet-active",
      } : {},
      navigation: slides.length > 1 ? {
        prevEl: '.swiper-caret-prev',
        nextEl: '.swiper-caret-next',
        disabledClass: 'c-disabled',
      } : {},
      thumbs: {
        swiper: thumbSwiper
      },
      zoom: {
        maxRatio: 2,
      },
      rebuildOnUpdate: rebuildGalleryOnUpdate,
      resistanceRatio: slides.length > 1 ? 0.85 : 0,
      renderNextButton: () => <span className="swiper-caret-next pv7 pl7 absolute top-50 translate--50y z-2 right-1 pointer c-action-primary "><IconCaretRight/></span>,
      renderPrevButton: () => <span className="swiper-caret-prev pv7 pr7 absolute top-50 translate--50y z-2 left-1 pointer c-action-primary "><IconCaretLeft/></span>,
      on: {
        init: this.linkGallery(),
        slideChange: this.onSlideChange(),
      }
    }
    this.rebuildGalleryOnUpdate = false

    const thumbnailParams = {
      observer: true,
      containerClass: "swiper-container h-100",
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      freeMode: true,
      direction: 'vertical',
      slidesPerView: 'auto',
      touchRatio: 0.4,
      mousewheel: true,
      preloadImages: true,
      on: {
        init: this.linkThumb(),
      },
      shouldSwiperUpdate: true,
    }

    if(gallerySwiper) {
      gallerySwiper.pagination.el && (gallerySwiper.pagination.el.hidden = isVideo[activeIndex])

      loaded[activeIndex] ?
        gallerySwiper.zoom.enable() :
        gallerySwiper.zoom.disable()
    }

    return (
      <div className={`relative overflow-hidden`}>
        <div className={`w-20 gallery-thumbs bottom-0 top-0 left-0 absolute pr5 dn ${slides.length > 1 && 'db-ns'}`}>
          <Swiper {...thumbnailParams}>
            {slides.map((slide, i) => (
              <div key={i} className="swiper-slide w-100 h-auto mb5">
                <img className="w-100 h-auto db"
                     alt={slide.alt ? this.state.alt[i] : ""}
                     src={slide.thumbUrl || this.state.thumbUrl[i]}/>
                <div className="absolute absolute--fill b--solid b--action-primary bw1 thumb-border"/>
              </div>
            ))}
          </Swiper>
        </div>
        <div className={`w-100 ${slides.length > 1 && 'w-80-ns ml-20-ns'} border-box gallery-cursor`}>
          <Swiper {...galleryParams}>
            {slides.map((slide, i) => (
              <div key={i} className="swiper-slide center-all">
                { this.renderSlide(slide, i) }
              </div>
            ))}
          </Swiper>
        </div>
      </div>);
  }
}

export default Carousel;
