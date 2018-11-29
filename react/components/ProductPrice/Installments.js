import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { isEmpty } from 'ramda'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import PricePropTypes from './propTypes'

/** Installments component */
export default class Installments extends Component {
  static propTypes = {
    /** Classes to be applied to the root element */
    className: PropTypes.string,
    /** Classes to be applied to installment value element */
    installmentClass: PropTypes.string,
    /** Classes to be applied to interest rate element */
    interestRateClass: PropTypes.string,
    /** Product installments to be displayed */
    installments: PricePropTypes.installments,
    /** Pages editor config to display labels */
    showLabels: PropTypes.bool.isRequired,
    /** react-intl function to format the prices*/
    formatNumber: PropTypes.func.isRequired,
    /** Options to be passe to the formatNumber function*/
    currencyOptions: PropTypes.shape({
      style: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      minimumFractionDigits: PropTypes.number.isRequired,
      maximumFractionDigits: PropTypes.number.isRequired,
    }).isRequired,
  }
  render() {
    const {
      showLabels,
      formatNumber,
      installments,
      currencyOptions,
      className,
      installmentClass,
      interestRateClass,
    } = this.props

    if (!installments || isEmpty(installments)) {
      return null
    }

    const noInterestRateInstallments = installments.filter(
      installment => !installment.InterestRate
    )

    /*
     * - The selected installment will be the one with the highest `NumberOfInstallments`;
     * - If there is no 'interest-free' installments, the normal installments will be analyzed.
     */
    const installment = (isEmpty(noInterestRateInstallments)
      ? installments
      : noInterestRateInstallments
    ).reduce(
      (previous, current) =>
        previous.NumberOfInstallments > current.NumberOfInstallments
          ? previous
          : current
    )

    const formattedInstallmentPrice = formatNumber(
      installment.Value,
      currencyOptions
    )

    const [installmentsElement, installmentPriceElement, timesElement] = [
      installment.NumberOfInstallments,
      formattedInstallmentPrice,
      <Fragment>&times;</Fragment>,
    ].map((element, index) => (
      <span className={installmentClass} key={index}>
        {element}
      </span>
    ))

    return (
      <div className={classNames('vtex-price-installments__container', className)}>
        {showLabels ? (
          <FormattedMessage
            id="pricing.installment-display"
            values={{
              installments: installmentsElement,
              installmentPrice: installmentPriceElement,
              times: timesElement,
            }}
          />
        ) : (
            <Fragment>
              {installmentsElement} {timesElement} {installmentPriceElement}
            </Fragment>
          )}
        {!installment.InterestRate && (
          <div className={classNames('vtex-price-installments__interest-rate', interestRateClass)}>
            <FormattedMessage id="pricing.interest-free" />
          </div>
        )}
      </div>
    )
  }
}
