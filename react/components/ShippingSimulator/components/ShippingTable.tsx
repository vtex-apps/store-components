import React from 'react'
import { FormattedMessage } from 'react-intl'

import ShippingTableRow from './ShippingTableRow'
import styles from '../shippingSimulator.css'

type Props = {
  shipping?: {
    logisticsInfo?: Array<{
      itemIndex?: string
      slas?: Array<{
        id?: string
        friendlyName?: string
        price?: number
        shippingEstimate?: string
      }>
    }>
  }
}

const ShippingTable = ({ shipping }: Props) => {
  if ((shipping?.logisticsInfo?.length ?? 0) === 0) {
    return null
  }

  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  const slaList = shipping.logisticsInfo.reduce(
    // @ts-expect-error ts-migrate(2769) FIXME: Type '{ id?: string | undefined; friendlyName?: st... Remove this comment to see the full error message
    (slas, info) => [...slas, ...info.slas],
    []
  )

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'length' does not exist on type '{ itemIn... Remove this comment to see the full error message
  if (slaList.length === 0) {
    return (
      <FormattedMessage id="store/shipping.empty-sla">
        {(text) => (
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
        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'map' does not exist on type '{ itemIndex... Remove this comment to see the full error message */}
        {slaList.map((shippingItem: any) => (
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

export default ShippingTable
