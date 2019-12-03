import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import TranslateEstimate from 'vtex.shipping-estimate-translator/TranslateEstimate'
import classNames from 'classnames'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['shippingTableCell', 'shippingTableLabel', 'shippingTableRadioBtn']

const ShippingTableRow = ({ name, shippingEstimate, price }) => {
  const handles = useCssHandles(CSS_HANDLES)
  const etaClassName = classNames(
    `${handles.shippingTableCell} pv1 ph3 t-small c-muted-2`,
    {
      tc: typeof shippingEstimate === 'undefined',
    }
  )

  const valueClassName = classNames(
    `${handles.shippingTableCell} pv1 ph3 t-small c-muted-2`,
    {
      tc: typeof price === 'undefined',
    }
  )

  let valueText

  if (typeof price === 'undefined') {
    valueText = '-'
  } else if (price === 0) {
    valueText = <FormattedMessage id="store/shipping.free" />
  } else {
    valueText = <FormattedCurrency value={price / 100} />
  }

  return (
    <tr key={name}>
      <td className={`${handles.shippingTableCell} pv1 ph3 t-small`}>
        <label className={handles.shippingTableLabel}>
          <input
            className={`${handles.shippingTableRadioBtn} mr4`}
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
}

export default ShippingTableRow
