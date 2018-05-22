import React, { Component, Fragment } from 'react'
import { arrayOf, string, shape } from 'prop-types'
import { FormattedMessage } from 'react-intl'

import './global.css'

export default class TechnicalSpecifications extends Component {
  static propTypes = {
    specifications: arrayOf(shape({
      name: string.isRequired,
      values: arrayOf(string).isRequired,
    })),
    skuName: string,
  }

  static defaultProps = {
    specifications: [],
  }

  render() {
    const { specifications, skuName } = this.props

    if (!specifications.length) {
      return null
    }

    return (
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
              <tr key={specification.name} className="vtex-product-specifications__table-row">
                <th className="vtex-product-specifications__specification-name">
                  {specification.name}
                </th>
                <td className="vtex-product-specifications__specification-values">
                  {specification.values.map((value, i) => (
                    <Fragment key={value}>
                      {value} {i !== specification.values.length - 1 && <br />}
                    </Fragment>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

