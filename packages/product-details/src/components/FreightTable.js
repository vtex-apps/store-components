import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FreightTableRow from './FreightTableRow'

export default class FreightTable extends Component {
  static propTypes = {
    /** Placeholder */
    freightOptionList: PropTypes.any,
  }

  render() {
    const { freightOptionList } = this.props

    if (freightOptionList.length === 0) {
      return null
    }

    return (
      <table className="vtex-freight-table">
        <tbody>
          {freightOptionList.map(freight => (
            <FreightTableRow key={freight.name} {...freight} />
          ))}
        </tbody>
      </table>
    )
  }
}

