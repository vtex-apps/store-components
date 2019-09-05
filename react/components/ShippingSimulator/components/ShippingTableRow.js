import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import TranslateEstimate from 'vtex.shipping-estimate-translator/TranslateEstimate'
import classNames from 'classnames'
import { FormattedCurrency } from 'vtex.format-currency'

import styles from '../shippingSimulator.css'

const ShippingTableRow = ({ friendlyName, shippingEstimate, price, intl }) => {
  const etaClassName = classNames(
    `${styles.shippingTableCell} pv1 ph3 t-small c-muted-2`,
    {
      tc: typeof shippingEstimate === 'undefined',
    }
  )

  const valueClassName = classNames(
    `${styles.shippingTableCell} pv1 ph3 t-small c-muted-2`,
    {
      tc: typeof price === 'undefined',
    }
  )

  let valueText

  if (typeof price === 'undefined') {
    valueText = '-'
  } else if (price === 0) {
    valueText = intl.formatMessage({ id: 'store/shipping.free' })
  } else {
    valueText = <FormattedCurrency value={price / 100} />
  }

  return (
    <tr key={friendlyName}>
      <td className={`${styles.shippingTableCell} pv1 ph3 t-small`}>
        <label className={styles.shippingTableLabel}>
          <input
            className={`${styles.shippingTableRadioBtn} mr4`}
            name="shipping-option"
            type="radio"
            value={friendlyName}
          />
          {friendlyName}
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
  friendlyName: PropTypes.string,
  shippingEstimate: PropTypes.string,
  price: PropTypes.number,
  intl: intlShape.isRequired,
}

export default injectIntl(ShippingTableRow)
