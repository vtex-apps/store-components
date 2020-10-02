import React from 'react'
import { FormattedNumber } from 'react-intl'
import { IOMessage } from 'vtex.native-types'

import styles from './styles.css'

const calculateDiscountTax = (listPrice: any, sellingPrice: any) => {
  return (listPrice - sellingPrice) / listPrice
}

type DiscountBadgeProps = {
  listPrice: number
  sellingPrice: number
  label?: string
  children: React.ReactNode
}

/**
 * The discount badge component. It receives the product's list and selling prices
 * and calculates the discount percent to show it in the product's sumary.
 */
const DiscountBadge = ({
  listPrice,
  sellingPrice,
  label = '',
  children,
}: DiscountBadgeProps) => {
  const percent = calculateDiscountTax(listPrice, sellingPrice)
  const shouldShowPercentage = percent && percent >= 0.01

  return (
    <div className={`${styles.discountContainer} relative dib`}>
      {shouldShowPercentage ? (
        <div
          className={`${styles.discountInsideContainer} t-mini white absolute right-0 pv2 ph3 bg-emphasis z-1`}
        >
          {/* @ts-expect-error ts-migrate(2739) FIXME: Type '{ children: (labelValue: any) => Element; id... Remove this comment to see the full error message */}
          <IOMessage id={label}>
            {(labelValue: any) => (
              <>
                {!labelValue && '-'}
                <FormattedNumber value={percent} style="percent" />{' '}
                {labelValue && ' '}
                {labelValue && <span>{labelValue}</span>}
              </>
            )}
          </IOMessage>
        </div>
      ) : null}
      {children}
    </div>
  )
}

export default DiscountBadge
