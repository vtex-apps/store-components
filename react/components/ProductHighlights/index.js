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
    <div className={styles.content}>
      {highlights.map((item, i) => (
        <div className={styles.itemHighlight}>
          <div className={styles.highlightTitle}>{HtmlParser(item.name)}: {' '}</div>
          <div className={styles.highlightValue}>{HtmlParser(item.values[0])}</div>
        </div>
      ))}
    </div>
  )
}

ProductHighlights.defaultProps = {
  highlights: [],
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
