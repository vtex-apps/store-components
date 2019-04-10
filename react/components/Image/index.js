import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { generateBlockClass } from '@vtex/css-handles'

import styles from './styles.css'

const Image = ({ src, alt, maxWidth, maxHeight, srcset, sizes, blockClass }) => {
  const classes = generateBlockClass(styles.imageElement, blockClass)
  const maxDimensions = {
    maxWidth: maxWidth,
    maxHeight: maxHeight,
  }
  return (
    <img src={src} srcset={srcset} sizes={sizes} alt={alt} style={maxDimensions} className={classes} />
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  maxWidth: PropTypes.string,
  maxHeight: PropTypes.string,
  srcset: PropTypes.string,
  sizes: PropTypes.string,
  blockClass: PropTypes.string,
}

Image.defaultProps = {
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
    blockClass: {
      title: 'editor.blockClass.title',
      description: 'editor.blockClass.description',
      type: 'string',
      isLayout: true,
    },
  },
}

export default Image
