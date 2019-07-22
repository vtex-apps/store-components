import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { generateBlockClass } from '@vtex/css-handles'

import styles from './styles.css'

const Image = ({ src, alt, maxWidth, maxHeight, srcSet, sizes, blockClass, href }) => {
  const img = renderImg({src, alt, maxHeight, maxWidth, srcSet, sizes, blockClass})
  return href? (<a href={href}>{img}</a>) : img;
}

const renderImg = ({src, alt, maxWidth, maxHeight, srcSet, sizes, blockClass}) => {
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
  href: PropTypes.string,
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
  blockClass: PropTypes.string,
}

Image.defaultProps = {
  alt: '',
  maxWidth: 'none',
  maxHeight: 'none',
  href: '',
  srcSet: '',
  sizes: '',
}

Image.schema = {
  title: 'admin/editor.image.title',
  description: 'admin/editor.image.description',
  type: 'object',
  properties: {
    blockClass: {
      title: 'admin/editor.blockClass.title',
      description: 'admin/editor.blockClass.description',
      type: 'string',
      isLayout: true,
    },
  },
}

export default Image
