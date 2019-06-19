import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import classNames from 'classnames'
import TranslateEstimate from 'vtex.shipping-estimate-translator/TranslateEstimate'

const ShippingTableRow = ({ name, shippingEstimate, price, intl }) => {
  const etaClassName = classNames('vtex-shipping-table__cell', {
    'vtex-shipping-table__cell--center': shippingEstimate === undefined,
  })

  const valueClassName = classNames('vtex-shipping-table__cell', {
    'vtex-shipping-table__cell--center': price === undefined,
  })

  let valueText

  if (price === undefined) {
    valueText = '-'
  } else if (price === 0) {
    valueText = intl.formatMessage({ id: 'shipping.free' })
  } else {
    valueText = intl.formatNumber(parseInt(price, 10) / 100, {
      style: 'currency',
      currency: 'BRL',
    })
  }

  return (
    <tr key={name}>
      <td className="vtex-shipping-table__cell">
        <label className="vtex-shipping-table__shipping-name-label">
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
        <TranslateEstimate shippingEstimate={shippingEstimate} />
      </td>
      <td className={valueClassName}>{valueText}</td>
    </tr>
  )
}

ShippingTableRow.propTypes = {
  name: PropTypes.string,
  shippingEstimate: PropTypes.string,
  price: PropTypes.number,
  intl: intlShape.isRequired,
}

export default injectIntl(ShippingTableRow)
