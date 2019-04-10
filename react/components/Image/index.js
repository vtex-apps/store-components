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
      <img src={src} srcset={srcset} sizes={sizes} alt={alt} style={maxDimensions} className={styles.imageElement} />
    )
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  maxWidth: PropTypes.string,
  maxHeight: PropTypes.string,
  srcset: PropTypes.string,
  sizes: PropTypes.string,
}

Image.defaultProps = {
  src: '',
  alt: '',
  maxWidth: 'none',
  maxHeight: 'none',
  srcset: '',
  sizes: '',
}

Image.schema = {
  title: 'editor.image.title',
  description: 'editor.image.description',
  type: 'object',
  properties: {
    src: {
      type: 'string',
      title: 'editor.image.src.title',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    alt: {
      type: 'string',
      title: 'editor.image.alt.title',
    },
  },
}

export default Image
