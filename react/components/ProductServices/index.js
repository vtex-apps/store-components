import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import HtmlParser from 'react-html-parser'


import styles from './styles.css'

/**
 * Product Services Component.
 * Render the services of a product.
 */
class ProductServices extends Component {

  render() {
    const { highlights } = this.props
    return (
      <ul className={styles.content}>
        {highlights.map((item, i) => (
          <li key={i} className={`t-heading-5`}>{HtmlParser(item.name)}: <span className={`t-small`}>{HtmlParser(item.values[0])}</span> </li>
        ))}
      </ul>
    )
  }
}

ProductServices.defaultProps = {
  services: [],
}

ProductServices.propTypes = {
  /** Intl object to provides internationalization */
  intl: intlShape.isRequired,
  /** Services that will be displayed on the table */
  services: PropTypes.arrayOf(
    PropTypes.shape({
      /** Service name */
      name: PropTypes.string.isRequired,
      /** Service value */
      values: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
}

export default injectIntl(ProductHighlights)