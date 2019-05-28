import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { generateBlockClass } from '@vtex/css-handles'
import { formatIOMessage } from 'vtex.native-types'

import styles from './styles.css'

const Image = ({ src, alt, maxWidth, maxHeight, srcSet, sizes, blockClass, intl}) => {
  const classes = generateBlockClass(styles.imageElement, blockClass)
  const maxDimensions = {
    maxWidth: maxWidth,
    maxHeight: maxHeight,
  }

  return (
    <img src={src} 
    srcSet={srcSet}
    sizes={sizes}
    alt={formatIOMessage({id: alt, intl})}
    style={maxDimensions}
    className={classes} />
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
  intl: intlShape,
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
    blockClass: {
      title: 'admin/editor.blockClass.title',
      description: 'admin/editor.blockClass.description',
      type: 'string',
      isLayout: true,
    },
  },
}

export default injectIntl(Image)
