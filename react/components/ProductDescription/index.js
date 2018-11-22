import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { Table } from 'vtex.styleguide'
import classNames from 'classnames'

import SpecificationRow from './SpecificationRow'

import './global.css'

/**
 * Product Description Component.
 * Render the description and technical specifications of a product
 */
class ProductDescription extends Component {

  static specificationSchema = {
    'properties': {
      'name': {
        'type': 'string',
        'title': 'Name',
        cellRenderer: ({ cellData: name }) => {
          return (
            <span className="vtex-product-specifications__specification-name dtc-ns tr-ns w-20-ns pb2-ns ttu t-body  c-muted-1 pt2  ph6 br-ns b--muted-3">
              {name}
            </span>
          )
        }
      },
      'values': {
        'type': "array",
        'title': 'Values',
        'items': {
          'type': 'string',
          'title': 'Items',
        },
        cellRenderer: ({ cellData: value }) => {
          return (
            <span className="vtex-product-specifications__specification-values dtc-ns pv2 ph6 c-muted-2 db-s">
              {value}
            </span>
          )
        }
      }
    }
  }

  render() {
    const { specifications, skuName, description } = this.props

    if (!description || !specifications) {
      return null
    }


    return (
      <div className="vtex-product-description ma2">
        <div className="t-heading-5 mb6-ns mb5-s">
          <FormattedMessage id="product-description.title" />
        </div>
        <span
          className="vtex-product-description__text measure-wide c-muted-1"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {specifications.length > 0 && (
          <div className="vtex-product-specifications mt6">
            <div className="vtex-product-specifications__title t-heading-5 mb6-ns mb5-s">
              <FormattedMessage id="technicalspecifications.title" />
            </div>
            <div className="vtex-product-specifications__table w-100">
              <Table items={specifications} schema={ProductDescription.specificationSchema} density={'high'} disableHeader />
            </div>
          </div>
        )}

        {specifications.length > 0 && (
          <div className="vtex-product-specifications mt6">
            <div className="vtex-product-specifications__title t-heading-5 mb6-ns mb5-s">
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
