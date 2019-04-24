import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import HtmlParser from 'react-html-parser'

import GradientCollapse from '../GradientCollapse/index'

import styles from './styles.css'

/**
 * Product Description Component.
 * Render the description of a product
 */
class ProductDescription extends Component {
  render() {
    const { description } = this.props

    if (!description) {
      return null
    }

    return (
      <div className={styles.productDescriptionContainer}>
        <FormattedMessage id="store/product-description.title">
          {txt => <h2 className="t-heading-5 mb5 mt0">{txt}</h2>}
        </FormattedMessage>

        <div className="c-muted-1">
          <GradientCollapse collapseHeight={220}>
            {HtmlParser(description)}
          </GradientCollapse>
        </div>
      </div>
    )
  }
}

ProductDescription.propTypes = {
  /** Product description string */
  description: PropTypes.string,
  /** Intl object to provides internationalization */
  intl: intlShape.isRequired,
}

export default injectIntl(ProductDescription)
