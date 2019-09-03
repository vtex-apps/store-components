import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { match, compose, isEmpty, complement } from 'ramda'

import Vimeo from './Vimeo'
import YouTube from './Youtube'

import styles from '../../styles.css'

const isNotEmpty = complement(isEmpty)

const isVimeo = compose(isNotEmpty, match(/vimeo/))
const isYoutube = compose(isNotEmpty, match(/youtube|youtu.be/)) 

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
    const { url } = this.props

    return (
      <div className={styles.video}>
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

export default Video
