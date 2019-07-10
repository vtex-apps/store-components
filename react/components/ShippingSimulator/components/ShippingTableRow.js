import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import TranslateEstimate from 'vtex.shipping-estimate-translator/TranslateEstimate'
import classNames from 'classnames'

import styles from '../shippingSimulator.css'

const ShippingTableRow = ({ name, shippingEstimate, price, intl }) => {
  const {
    culture: { currency },
  } = useRuntime()

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
    // TODO: get Fraction digits from segment when data is available
    valueText = intl.formatNumber(price / 100, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  return (
    <tr key={name}>
      <td className={`${styles.shippingTableCell} pv1 ph3 t-small`}>
        <label className={styles.shippingTableLabel}>
          <input
            className={`${styles.shippingTableRadioBtn} mr4`}
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
