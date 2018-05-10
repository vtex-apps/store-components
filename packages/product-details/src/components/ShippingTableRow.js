import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ShippingTableRow = ({ name, eta, value }) => {
  const etaClassName = classNames('vtex-shipping-table__cell', {
    'vtex-shipping-table__cell--center': eta === undefined,
  })

  const valueClassName = classNames('vtex-shipping-table__cell', {
    'vtex-shipping-table__cell--center': value === undefined || value === 0,
  })

  return (
    <tr key={name}>
      <td className="vtex-shipping-table__cell">
        <label>
          <input
            className="vtex-shipping-table__radio-input"
            name="shipping-option"
            type="radio"
            value={name}
          />

          {name}
        </label>
      </td>
      <td className={etaClassName}>
        {eta !== undefined ? `até ${eta} dias` : '-'}
      </td>
      <td className={valueClassName}>
        {value !== undefined ? (value === 0 ? 'Grátis' : `R$ ${value}`) : '-'}
      </td>
    </tr>
  )
}

ShippingTableRow.propTypes = {
  name: PropTypes.string,
  eta: PropTypes.number,
  value: PropTypes.number,
}

export default ShippingTableRow

