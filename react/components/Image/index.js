import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { generateBlockClass } from '@vtex/css-handles'

import styles from './styles.css'

const Image = ({ src, alt, maxWidth, maxHeight, srcSet, sizes, blockClass }) => {
  const classes = generateBlockClass(styles.imageElement, blockClass)
  const maxDimensions = {
    maxWidth: maxWidth,
    maxHeight: maxHeight,
  }
  return (
    <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} style={maxDimensions} className={classes} />
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  maxWidth: PropTypes.string,
  maxHeight: PropTypes.string,
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
  blockClass: PropTypes.string,
}

Image.defaultProps = {
  alt: '',
  maxWidth: 'none',
  maxHeight: 'none',
  srcSet: '',
  sizes: '',
}

Image.schema = {
  title: 'admin/editor.image.title',
  description: 'admin/editor.image.description',
  type: 'object',
  properties: {
    src: {
      type: 'string',
      title: 'admin/editor.image.src.title',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    alt: {
      type: 'string',
      title: 'admin/editor.image.alt.title',
    },
    blockClass: {
      title: 'admin/editor.blockClass.title',
      description: 'admin/editor.blockClass.description',
      type: 'string',
      isLayout: true,
    },
  },
}

export default Image
