import React, { Component, Fragment } from 'react'
import { arrayOf, string, shape } from 'prop-types'
import { FormattedMessage } from 'react-intl'

import './global.css'

export default class TechnicalSpecifications extends Component {
  static propTypes = {
    specifications: arrayOf(shape({
      name: string.isRequired,
      values: arrayOf(string).isRequired,
    }))
  }

  render() {
    const specifications = this.props.specifications

    if (!specifications || specifications.length === 0) {
      return null
    }

    return (
      <div className="vtex-product-specifications">
        <div className="vtex-product-specifications__title">
          <FormattedMessage id="technicalspecifications.title" />
        </div>
        <table className="vtex-product-specifications__table">
          <tbody>
            {specifications.map(specification => (
              <tr key={specification.name} className="vtex-product-specifications__table-row">
                <th className="vtex-product-specifications__specification-name">
                  {specification.name}
                </th>
                <td className="vtex-product-specifications__specification-values">
                  {specification.values.map(value => (
                    <Fragment key={value}>
                      {value} <br/>
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

