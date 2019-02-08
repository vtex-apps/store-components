import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import HtmlParser from 'react-html-parser'

import GradientCollapse from './components/GradientCollapse'

import styles from './styles.css'

/**
 * Product Description Component.
 * Render the description and technical specifications of a product
 */
class ProductDescription extends Component {
  render() {
    const { specifications, description } = this.props

    if (!description || !specifications) {
      return null
    }

    return (
      <div className={styles.productDescriptionContainer}>
        <FormattedMessage id="product-description.title">
          {(txt) => (<h2 className="t-heading-5 mb5 mt0">{txt}</h2>)}
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

ProductDescription.defaultProps = {
  specifications: [],
}

ProductDescription.propTypes = {
  /** Product description string */
  description: PropTypes.string,
  /** Intl object to provides internationalization */
  intl: intlShape.isRequired,
  /** Specifications that will be displayed on the table */
  specifications: PropTypes.arrayOf(
    PropTypes.shape({
      /** Specification name */
      name: PropTypes.string.isRequired,
      /** Specifications value */
      values: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
}

export default injectIntl(ProductDescription)
