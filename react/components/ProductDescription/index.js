import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import VTEXClasses from './CustomClasses'

import './global.css'

/**
 * Product Description Component.
 * Render the description and technical specifications of a product
 */
class ProductDescription extends Component {
  render() {
    const { specifications, skuName } = this.props

    return (
      <div className={`${VTEXClasses.PRODUCT_DESCRIPTION} ma2`}>
        <div className="f4 b ttu mb3">
          <FormattedMessage id="product-description.title" />
        </div>

        <span dangerouslySetInnerHTML={{ __html: this.props.children }} />

        {specifications.length > 0 && (
          <div className="vtex-product-specifications">
            <div className="vtex-product-specifications__title">
              <FormattedMessage id="technicalspecifications.title" />
            </div>
            <table className="vtex-product-specifications__table">
              <tbody>
                {skuName && (
                  <tr className="vtex-product-specifications__table-row">
                    <th className="vtex-product-specifications__specification-name">
                      SKU {skuName}
                    </th>
                    <td className="vtex-product-specifications__specification-values" />
                  </tr>
                )}
                {specifications.map(specification => (
                  <tr
                    key={specification.name}
                    className="vtex-product-specifications__table-row"
                  >
                    <th className="vtex-product-specifications__specification-name">
                      {specification.name}
                    </th>
                    <td className="vtex-product-specifications__specification-values">
                      {specification.values.map((value, i) => (
                        <Fragment key={value}>
                          <span dangerouslySetInnerHTML={{ __html: value }} />{' '}
                          {i !== specification.values.length - 1 && <br />}
                        </Fragment>
                      ))}
                    </td>
                  </tr>
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
  children: {},
}

ProductDescription.propTypes = {
  /** Children component which contains the product description */
  children: PropTypes.node.isRequired,
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
