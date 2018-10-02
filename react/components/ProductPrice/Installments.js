import React, { Component } from 'react'
import { isEmpty } from 'ramda'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import PricePropTypes from './propTypes'

/** Installments component */
export default class Installments extends Component {
  render() {
    const {
      installments,
      showLabels,
      formatNumber,
      currencyOptions,
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
      <span key="times">&times;</span>,
    ].map((element, index) => (
      <span className="vtex-price-installments__value" key={index}>
        {element}
      </span>
    ))

    return (
      <div className="vtex-price-installments__container c-muted-2">
        <div className="vtex-price-installments dib">
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
            <span>
              {installmentsElement} {timesElement} {installmentPriceElement}
            </span>
          )}
          {!installment.InterestRate && (
            <span className="pl1">
              <FormattedMessage id="pricing.interest-free" />
            </span>
          )}
        </div>
      </div>
    )
  }
}

Installments.propTypes = {
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
