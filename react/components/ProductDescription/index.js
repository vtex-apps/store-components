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

    const specificationItems = specifications.map(specification => {
      return { property: specification.name, specifications: specification.values[0] }
    })

    return (
      <div className={`${styles.productDescriptionContainer} flex-l`}>
        <div className="w-100 w-60-l">
          <div className="t-heading-5 mb5">
            <FormattedMessage id="product-description.title" />
          </div>

          <div className="c-muted-1">
            <GradientCollapse collapseHeight={220}>
              {HtmlParser(description)}
            </GradientCollapse>
          </div>
        </div>
        {specifications.length > 0 && (
          <div className={`${styles.specifications} mt9 mt0-l w-100 w-40-l pl8-l`}>
            <div className={`${styles.specificationsTitle} t-heading-5 mb5`}>
              <FormattedMessage id="technicalspecifications.title" />
            </div>
            <GradientCollapse collapseHeight={220}>
              <table className={`${styles.specificationsTable} w-100 bg-base border-collapse`}>
                <thead>
                  <tr>
                    <th className="w-50 b--muted-4 bb bt c-muted-2 t-body tl pa5">
                      <FormattedMessage id="product-description.property" />
                    </th>
                    <th className="w-50 b--muted-4 bb bt c-muted-2 t-body tl pa5">
                      <FormattedMessage id="product-description.specification" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specificationItems.map((specification, i) => (
                    <tr key={i}>
                      <td className="w-50 b--muted-4 bb pa5">{specification.property}</td>
                      <td className="w-50 b--muted-4 bb pa5">{specification.specifications}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GradientCollapse>
          </div>
        )}
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
