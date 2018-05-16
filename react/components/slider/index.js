import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

import Dots from './Dots'
import Arrow from './Arrow'

import getItemsPerPage from './getItemsPerPage'

import './global.css'

const VTEXClasses = {
  ARROW_RIGHT_CLASS: 'vtex-slider__arrow-right',
  ARROW_LEFT_CLASS: 'vtex-slider__arrow-left',
  DOTS_CLASS: 'vtex-slider__dots',
}

/**
 * Slick Slider Component.
 */
export default class SlickSlider extends Component {
  static propTypes = {
    /** Array of items to be rendered inside the slider. */
    children: PropTypes.array.isRequired,
    /** Slider settigns. */
    sliderSettings: PropTypes.object,
    /** Makes the items per page to adapt by the slider width. */
    adaptToScreen: PropTypes.bool,
    /** Default item width, it's necessary when the adaptToScreen is true. */
    defaultItemWidth: PropTypes.number,
    /** If the scroll of items is by page or not. */
    scrollByPage: PropTypes.bool,
  }

  resizeListener = () => {
    this.forceUpdate()
  }

  componentDidMount() {
    this._timeout = setTimeout(() => {
      this.forceUpdate()
    }, 50)
    if (this.props.adaptToScreen) {
      window.addEventListener('resize', this.resizeListener)
    }
  }

  componentWillUnmount() {
    clearTimeout(this._timeout)
    if (this.props.adaptToScreen) {
      window.removeEventListener('resize', this.resizeListener)
    }
  }

  render() {
    const { sliderSettings, adaptToScreen, scrollByPage, defaultItemWidth, children } = this.props
    const itemsPerPage = getItemsPerPage(this._slick, defaultItemWidth, sliderSettings.slidesToShow)
    const settings = { ...sliderSettings }
    const numItems = children.length
    settings.nextArrow = <Arrow cssClass={VTEXClasses.ARROW_RIGHT_CLASS} />
    settings.prevArrow = <Arrow cssClass={VTEXClasses.ARROW_LEFT_CLASS} />
    settings.appendDots = dots => <Dots dots={dots} cssClass={VTEXClasses.DOTS_CLASS} />
    settings.slidesToShow = adaptToScreen ? itemsPerPage : settings.slidesToShow
    settings.slidesToScroll = scrollByPage ? settings.slidesToShow : settings.slidesToScroll
    settings.infinite = settings.infinite !== undefined
      ? settings.infinite : itemsPerPage < numItems
    return (
      <Slider {...settings} ref={(c) => {
        this._slick = c
      }}>
        {children}
      </Slider>
    )
  }
}
