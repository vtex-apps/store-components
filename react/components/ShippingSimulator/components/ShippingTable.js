import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import { GROUPED } from '../constants/PricingMode'
import ShippingTableRow from './ShippingTableRow'
import styles from '../shippingSimulator.css'

const ShippingTable = ({ shipping, pricingMode, orderByShippingEstimate }) => {
  if ((shipping?.logisticsInfo?.length ?? 0) === 0) {
    return null
  }

  let slaList = shipping.logisticsInfo.reduce(
    (slas, info) => [...slas, ...info.slas],
    []
  )

  const slaSumValuesList = []

  if (pricingMode === GROUPED) {
    slaList.reduce(function (res, value) {
      if (!res[value.id]) {
        res[value.id] = { id: value.id, ...value, price: 0 }
        slaSumValuesList.push(res[value.id])
      }

      res[value.id].price += value.price

      return res
    }, {})
  }

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

  //Sort the list by estimated time
  if(orderByShippingEstimate) {
    function OrderByShippingEst(a, b, replaceType) {
      let aInt = 0;
      let bInt = 0;
      try {
        aInt = parseInt(a.shippingEstimate.toString().replace(replaceType, "").replace("bd", ""));
        bInt = parseInt(b.shippingEstimate.toString().replace(replaceType, "").replace("bd", ""));
      }
      catch {
        return 0;
      }
  
      if (aInt < bInt) {
        return -1;
      }
      if (aInt > bInt ) {
        return 1;
      }
      return 0;
    }

    const listMin = slaList.filter((x) => x.shippingEstimate.includes("m")).sort(function (a, b) {
      return OrderByShippingEst(a, b, "m");
    });

    const listDay = slaList.filter((x) => x.shippingEstimate.includes("bd")).sort(function (a, b) {
      return OrderByShippingEst(a, b, "bd");
    });  

    const newList = listMin.concat(listDay);
    slaList = newList;
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
        {(pricingMode === GROUPED ? slaSumValuesList : slaList).map(
          shippingItem => (
            <ShippingTableRow
              key={shippingItem.id}
              name={shippingItem.friendlyName}
              shippingEstimate={shippingItem.shippingEstimate}
              price={shippingItem.price}
            />
          )
        )}
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
  pricingMode: PropTypes.enum,
}

export default ShippingTable
