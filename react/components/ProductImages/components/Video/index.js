import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { match, compose, isEmpty, complement } from 'ramda'

import Vimeo from './Vimeo'
import YouTube from './Youtube'

import { withCssHandles } from 'vtex.css-handles'

const isNotEmpty = complement(isEmpty)

const isVimeo = compose(isNotEmpty, match(/vimeo/))
const isYoutube = compose(isNotEmpty, match(/youtube|youtu.be/)) 

const CSS_HANDLES = ['productVideo', 'iframeContainer', 'iframe']

class Video extends Component {
  static getThumbUrl(url, thumbWidth) {
    if (isVimeo(url)) {
      return Vimeo.getThumbUrl(url, thumbWidth)
    }

    else if (isYoutube(url)) {
      return YouTube.getThumbUrl(url, thumbWidth)
    }
  }

  render() {
    const { url, cssHandles } = this.props

    return (
      <div className={cssHandles.productVideo}>
        {isVimeo(url) && <Vimeo {...this.props} />}
        {isYoutube(url) && <YouTube {...this.props} />}
      </div>
    )
  }
}

Video.propsTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setThumb: PropTypes.func,
  thumbWidth: PropTypes.number,
  className: PropTypes.string,
  play: PropTypes.bool,
}

export default withCssHandles(CSS_HANDLES)(Video)
