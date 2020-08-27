import React, { Component } from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-slick` if it exists ... Remove this comment to see the full error message
import Slider from 'react-slick'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-resize-detector` if ... Remove this comment to see the full error message
import ReactResizeDetector from 'react-resize-detector'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.render-runtime"' has no exported mem... Remove this comment to see the full error message
import { NoSSR } from 'vtex.render-runtime'

import Dots from './components/Dots'
import Arrow from './components/Arrow'
import getItemsPerPage from './utils/ItemsPerPage'
import './global.css'
import slider from './slider.css'

const VTEXClasses = {
  ARROW_RIGHT_CLASS: `${slider.arrowRight}`,
  ARROW_LEFT_CLASS: `${slider.arrowLeft}`,
  DOTS_CLASS: `${slider.dots}`,
}

type Props = {
  sliderSettings?: any
  adaptToScreen?: boolean
  defaultItemWidth?: number
  scrollByPage?: boolean
  ssrFallback?: React.ReactElement
  leftArrowClasses?: string
  rightArrowClasses?: string
  dotsClasses?: string
}

/**
 * Slick Slider Component.
 */
export default class SlickSlider extends Component<Props> {
  _slick: any

  getSettings(slideWidth: any) {
    const {
      sliderSettings,
      adaptToScreen,
      scrollByPage,
      defaultItemWidth,
      children,
      leftArrowClasses,
      rightArrowClasses,
      dotsClasses,
    } = this.props

    const itemsPerPage = getItemsPerPage(
      this._slick,
      slideWidth,
      defaultItemWidth,
      sliderSettings.slidesToShow
    )

    const settings = { ...sliderSettings }
    // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
    const numItems = children.length

    settings.nextArrow = settings.nextArrow || (
      <Arrow
        customClasses={rightArrowClasses}
        cssClass={VTEXClasses.ARROW_RIGHT_CLASS}
      />
    )
    settings.prevArrow = settings.prevArrow || (
      <Arrow
        customClasses={leftArrowClasses}
        cssClass={VTEXClasses.ARROW_LEFT_CLASS}
      />
    )
    settings.appendDots = (dots: any) => (
      <Dots
        dots={dots}
        customClass={dotsClasses}
        cssClass={VTEXClasses.DOTS_CLASS}
      />
    )

    if (adaptToScreen) {
      settings.slidesToShow = itemsPerPage
    }

    if (scrollByPage) {
      settings.slidesToScroll = settings.slidesToShow
    }

    if (settings.infinite === undefined) {
      settings.infinite = settings.slidesToScroll < numItems
    }

    return settings
  }

  render() {
    const component = (
      <ReactResizeDetector handleWidth>
        {(width: any) => (
          <Slider
            {...this.getSettings(width)}
            ref={(c: any) => {
              this._slick = c
            }}
          >
            {this.props.children}
          </Slider>
        )}
      </ReactResizeDetector>
    )

    if (this.props.ssrFallback) {
      // eslint-disable-next-line react/jsx-handler-names
      return <NoSSR onSSR={this.props.ssrFallback}>{component}</NoSSR>
    }

    return component
  }
}
