import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ContentLoader from 'react-content-loader'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'

import SpecificationRow from './SpecificationRow'

import './global.css'

/**
 * Product Description Component.
 * Render the description and technical specifications of a product
 */
class ProductDescription extends Component {
  render() {
    const { specifications, skuName, description } = this.props

    if (!description || !specifications) {
      return null
    }

    return (
      <div className="vtex-product-description ma2">
        <div className="f4 b ttu mb3">
          <FormattedMessage id="product-description.title" />
        </div>

        <span
          className="measure-wide"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {specifications.length > 0 && (
          <div className="vtex-product-specifications mt6">
            <div className="vtex-product-specifications__title f4 b ttu mb6-ns mb5-s">
              <FormattedMessage id="technicalspecifications.title" />
            </div>
            <table className="vtex-product-specifications__table w-100">
              <tbody>
                {skuName && (
                  <SpecificationRow name={`SKU ${skuName}`} />
                )}
                {specifications.map(specification => (
                  <SpecificationRow
                    key={specification.name}
                    name={specification.name}
                    values={specification.values.map((value, i) => (
                      <Fragment key={value}>
                        <span dangerouslySetInnerHTML={{ __html: value }} />{' '}
                        {i !== specification.values.length - 1 && <br />}
                      </Fragment>
                    ))}
                  />
                ))}
              </tbody>
            </table>
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
  /** Name of the current SKU */
  skuName: PropTypes.string,
}

export default injectIntl(ProductDescription)
