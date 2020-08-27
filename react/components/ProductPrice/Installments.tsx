import React, { Fragment } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { injectIntl, FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { isEmpty } from 'ramda'
import { formatCurrency } from 'vtex.format-currency'

// @ts-expect-error ts-migrate(6133) FIXME: 'PricePropTypes' is declared but its value is neve... Remove this comment to see the full error message
import PricePropTypes from './propTypes'
import productPrice from './styles.css'

type Props = {
  className?: string
  installmentClass?: string
  interestRateClass?: string
  installments?: any // TODO: PricePropTypes.installments
  showLabels: boolean
  intl: any
}

/** Installments component */
const Installments = ({
  showLabels,
  installments = [],
  className,
  installmentClass,
  interestRateClass,
  intl,
}: Props) => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'culture' does not exist on type 'Runtime... Remove this comment to see the full error message
  const { culture } = useRuntime()

  if (
    !installments ||
    isEmpty(
      installments.filter(
        ({ NumberOfInstallments }: any) => NumberOfInstallments > 1
      )
    )
  ) {
    return null
  }

  const noInterestRateInstallments = installments.filter(
    (installment: any) =>
      !installment.InterestRate && installment.NumberOfInstallments > 1
  )

  /*
   * - The selected installment will be the one with the highest `NumberOfInstallments`;
   * - If there is no 'interest-free' installments, the normal installments will be analyzed.
   */
  const installment = (isEmpty(noInterestRateInstallments)
    ? installments
    : noInterestRateInstallments
  ).reduce((previous: any, current: any) =>
    previous.NumberOfInstallments > current.NumberOfInstallments
      ? previous
      : current
  )

  const formattedInstallmentPrice = formatCurrency({
    intl,
    culture,
    value: installment.Value,
  })

  const [installmentsElement, installmentPriceElement, timesElement] = [
    installment.NumberOfInstallments,
    formattedInstallmentPrice,
    <Fragment key="x">x</Fragment>,
  ].map((element, index) => (
    <span className={installmentClass} key={index}>
      {element}
    </span>
  ))

  return (
    <div className={classNames(productPrice.installmentsPrice, className)}>
      {showLabels ? (
        <FormattedMessage
          id="store/pricing.installment-display"
          values={{
            installments: installmentsElement,
            installmentPrice: installmentPriceElement,
            times: timesElement,
          }}
        />
      ) : (
        <Fragment>
          {installmentsElement}
          {timesElement} {installmentPriceElement}
        </Fragment>
      )}
      {!installment.InterestRate && (
        <div
          className={classNames(
            productPrice.interestRatePrice,
            interestRateClass
          )}
        >
          <FormattedMessage id="store/pricing.interest-free" />
        </div>
      )}
    </div>
  )
}

export default injectIntl(Installments)
