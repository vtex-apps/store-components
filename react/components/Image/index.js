import React from 'react'
import PropTypes from 'prop-types'
import { generateBlockClass } from '@vtex/css-handles'
import { injectIntl, intlShape } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'

import styles from './styles.css'

const Image = ({ src, alt, maxWidth, maxHeight, srcSet, sizes, blockClass, link, intl }) => {
  const img = renderImg({src, alt, maxHeight, maxWidth, srcSet, sizes, blockClass, intl})
  return link ? (
    <a
      href={formatIOMessage({ id: link.url, intl })}
      rel={link.attributeNofollow ? 'nofollow' : ''}
      target={link.newTab ? '_blank' : ''}
      title={formatIOMessage({ id: link.attributeTitle, intl })}
    >
      {img}
    </a>
  ) : (
    img
  )
}

const renderImg = ({src, alt, maxWidth, maxHeight, srcSet, sizes, blockClass, intl}) => {
  const classes = generateBlockClass(styles.imageElement, blockClass)
  const maxDimensions = {
    maxWidth: maxWidth,
    maxHeight: maxHeight,
  }

  const formattedSrc = formatIOMessage({ id: src, intl })
  const formattedAlt = formatIOMessage({ id: alt, intl })
  return (
    <img src={formattedSrc} srcSet={srcSet} sizes={sizes} alt={formattedAlt} style={maxDimensions} className={classes} />
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  maxWidth: PropTypes.string,
  maxHeight: PropTypes.string,
  link: PropTypes.object,
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
