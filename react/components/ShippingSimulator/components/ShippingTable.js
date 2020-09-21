import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import ShippingTableRow from './ShippingTableRow'
import styles from '../shippingSimulator.css'

const ShippingTable = ({ shipping }) => {
  if ((shipping?.logisticsInfo?.length ?? 0) === 0) {
    return null
  }

  const slaList = shipping.logisticsInfo.reduce(
    (slas, info) => [...slas, ...info.slas],
    []
  )

  if (slaList.length === 0) {
    return (
      <FormattedMessage id="store/shipping.empty-sla">
        {text => (
          <span className={`${styles.shippingNoMessage} dib t-small mt4`}>
            {text}
          </span>
        )}
      </FormattedMessage>
    )
  }

  return (
    <table
      className={`${styles.shippingTable} bt bb b--muted-4 c-muted-1 ph0 pv3 mt4 w-100`}
    >
      <thead className={`${styles.shippingTableHead} dn`}>
        <tr className={styles.shippingTableRow}>
          <th className={styles.shippingTableHeadDeliveryName}>
            <FormattedMessage id="store/shipping.deliveryName" />
          </th>
          <th className={styles.shippingTableHeadDeliveryEstimate}>
            <FormattedMessage id="store/shipping.deliveryEstimate" />
          </th>
          <th className={styles.shippingTableHeadDeliveryPrice}>
            <FormattedMessage id="store/shipping.deliveryPrice" />
          </th>
        </tr>
      </thead>
      <tbody className={styles.shippingTableBody}>
        {slaList.map(shippingItem => (
          <ShippingTableRow
            key={shippingItem.id}
            name={shippingItem.friendlyName}
            shippingEstimate={shippingItem.shippingEstimate}
            price={shippingItem.price}
          />
        ))}
      </tbody>
    </table>
  )
}

ShippingTable.propTypes = {
  /** Shipping informations */
  shipping: PropTypes.shape({
    logisticsInfo: PropTypes.arrayOf(
      PropTypes.shape({
        itemIndex: PropTypes.string,
        slas: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            friendlyName: PropTypes.string,
            price: PropTypes.number,
            shippingEstimate: PropTypes.string,
          })
        ),
      })
    ),
  }),
}

export default ShippingTable
