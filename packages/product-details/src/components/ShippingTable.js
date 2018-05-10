import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ShippingTableRow from './ShippingTableRow'

export default class ShippingTable extends Component {
  static propTypes = {
    /** Placeholder */
    shippingOptionList: PropTypes.any,
  }

  render() {
    const { shippingOptionList } = this.props

    if (shippingOptionList.length === 0) {
      return null
    }

    return (
      <table className="vtex-shipping-table">
        <tbody>
          {shippingOptionList.map(shipping => (
            <ShippingTableRow key={shipping.name} {...shipping} />
          ))}
        </tbody>
      </table>
    )
  }
}

