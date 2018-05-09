import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

import { Dots } from './Dots'
import { Arrow } from './Arrow'

import { getCorrectItemsPerPage } from './Utils'

import './global.css'

const VTEXClasses = {
  ARROW_RIGHT_CLASS: 'vtex-arrow-right',
  ARROW_LEFT_CLASS: 'vtex-arrow-left',
  DOTS_CLASS: 'vtex-dots',
}

/**
 * Slick Slider Component.
 */
export class SlickSlider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    sliderSettings: PropTypes.object,
    adaptToScreen: PropTypes.bool,
    defaultItemWidth: PropTypes.number,
    scrollByPage: PropTypes.bool,
  }

  resizeListener = () => {
    this.forceUpdate()
  }

  componentDidMount() {
    setTimeout(() => {
      this.forceUpdate()
    }, 50)
    if (this.props.adaptToScreen) {
      window.addEventListener('resize', this.resizeListener)
    }
  }

  componentWillUnmount() {
    if (this.props.adaptToScreen) {
      window.removeEventListener('resize', this.resizeListener)
    }
  }

  render() {
    const { sliderSettings, adaptToScreen, scrollByPage, defaultItemWidth, children } = this.props
    const itemsPerPage = getCorrectItemsPerPage(this._slick, defaultItemWidth, sliderSettings.slidesToShow)
    const settings = { ...sliderSettings }
    const numItems = children.length
    settings.nextArrow = <Arrow cssClass={VTEXClasses.ARROW_RIGHT_CLASS} />
    settings.prevArrow = <Arrow cssClass={VTEXClasses.ARROW_LEFT_CLASS} />
    settings.appendDots = dots => <Dots dots={dots} cssClass={VTEXClasses.DOTS_CLASS} />
    settings.slidesToShow = adaptToScreen ? itemsPerPage : settings.slidesToShow
    settings.slidesToScroll = scrollByPage ? settings.slidesToShow : settings.slidesToScroll
    sliderSettings.infinite = itemsPerPage < numItems
    return (
      <Slider {...settings} ref={function(c) { this._slick = c }.bind(this)}>
        {children}
      </Slider>
    )
  }
}
