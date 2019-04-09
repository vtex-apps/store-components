import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

class Image extends Component {
  render() {
    const { src, alt, maxWidth, maxHeight, srcset, sizes } = this.props
    const maxDimensions = {
      maxWidth: maxWidth,
      maxHeight: maxHeight,
    }
    return (
      <img src={src} alt={alt} style={maxDimensions} />
    )
  }
}

Image.propTypes = {
  
}

Image.defaultProps = {
  maxWidth: 'none',
  maxHeight: 'none',
}

export default Image
