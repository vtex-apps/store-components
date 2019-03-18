import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import HtmlParser from 'react-html-parser'

import styles from './styles.css'

/**
 * Product highlights Component.
 * Render the highlights specifications of a product.
 */
const ProductHighlights = ({ ...props }) => {
  const { highlights } = props
  return (
    <ul className={styles.content}>
      {highlights.map((item, i) => (
        <li key={i} className={`t-heading-5`}>
          {HtmlParser(item.name)}:{' '}
          <span className={`f5`}>{HtmlParser(item.values[0])}</span>{' '}
        </li>
      ))}
    </ul>
  )
}

ProductHighlights.defaultProps = {
  services: [],
}

ProductHighlights.propTypes = {
  /** Intl object to provides internationalization */
  intl: intlShape.isRequired,
  /** Specifications that will be displayed on the table */
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      /** Highlight name */
      name: PropTypes.string.isRequired,
      /** Highlight value */
      values: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
}

export default injectIntl(ProductHighlights)
