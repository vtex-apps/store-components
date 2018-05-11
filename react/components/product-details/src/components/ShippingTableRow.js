import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import classNames from 'classnames'

const ShippingTableRow = ({ name, eta, value, intl }) => {
  const etaClassName = classNames('vtex-shipping-table__cell', {
    'vtex-shipping-table__cell--center': eta === undefined,
  })

  const valueClassName = classNames('vtex-shipping-table__cell', {
    'vtex-shipping-table__cell--center': value === undefined,
  })

  let etaText, valueText

  if (eta === undefined) {
    etaText = '-'
  } else {
    etaText = intl.formatMessage({ id: 'shipping.eta' }, { eta })
  }

  if (value === undefined) {
    valueText = '-'
  } else if (value === 0) {
    valueText = intl.formatMessage({ id: 'shipping.free' })
  } else {
    valueText = intl.formatNumber(value, { style: 'currency', currency: 'BRL' })
  }

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
        {etaText}
      </td>
      <td className={valueClassName}>
        {valueText}
      </td>
    </tr>
  )
}

ShippingTableRow.propTypes = {
  name: PropTypes.string,
  eta: PropTypes.number,
  value: PropTypes.number,
  intl: intlShape.isRequired,
}

export default injectIntl(ShippingTableRow)

