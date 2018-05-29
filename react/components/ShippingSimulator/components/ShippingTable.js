import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ShippingTableRow from './ShippingTableRow'

export default class ShippingTable extends Component {
  static propTypes = {
    /** Placeholder */
    shipping: PropTypes.shape({
      logisticsInfo: PropTypes.arrayOf(PropTypes.shape({
        itemIndex: PropTypes.string,
        slas: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          price: PropTypes.number,
          shippingEstimate: PropTypes.string,
        })),
      })),
    }),
  }

  render() {
    const { shipping } = this.props

    if (!shipping || !shipping.logisticsInfo || shipping.logisticsInfo.length === 0) {
      return null
    }

    const slaList = shipping.logisticsInfo.reduce(
      (slas, info) => [...slas, ...info.slas],
      []
    )

    return (
      <table className="vtex-shipping-table">
        <tbody>
          {slaList.map(shipping => (
            <ShippingTableRow key={shipping.id} {...shipping} />
          ))}
        </tbody>
      </table>
    )
  }
}

