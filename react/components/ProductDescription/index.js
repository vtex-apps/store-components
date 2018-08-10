import './global.css';

import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ContentLoader from 'react-content-loader';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import VTEXClasses from './CustomClasses';

/**
 * Product Description Component.
 * Render the description and technical specifications of a product
 */
class ProductDescription extends Component {
  static Loader = (loaderProps = {}) => (
    <div className="vtex-product-specifications vtex-product-specifications-loader">
      <ContentLoader
        style={{
          width: '100%',
          height: '100%',
        }}
        height="100%"
        width="100%"
        {...loaderProps}>
        <rect
          width="15em"
          height="2em"
          {...loaderProps[
            'vtex-product-specifications__description-title--loader'
          ]}
        />
        <rect
          width="100%"
          height="5em"
          y="3em"
          {...loaderProps['vtex-product-specifications__description--loader']}
        />
        <rect
          width="15em"
          height="2em"
          y="11em"
          {...loaderProps['vtex-product-specifications__title--loader']}
        />
        <rect
          width="100%"
          height="12em"
          y="14em"
          {...loaderProps['vtex-product-specifications__table--loader']}
        />
      </ContentLoader>
    </div>
  )
  render() {
    const { specifications, skuName, description } = this.props

    if (!description || !specifications) {
      return <ProductDescription.Loader {...this.props.styles} />
    }

    return (
      <div className={`${VTEXClasses.PRODUCT_DESCRIPTION} ma2`}>
        <div className="f4 b ttu mb3">
          <FormattedMessage id="product-description.title" />
        </div>

        <span
          className="measure-wide"
          dangerouslySetInnerHTML={{ __html: description }}
        />

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
                    className="vtex-product-specifications__table-row">
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
}

ProductDescription.propTypes = {
  /** Product description string */
  description: PropTypes.string.isRequired,
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
  /** Component and content loader styles */
  styles: PropTypes.object,
}

export default injectIntl(ProductDescription)
