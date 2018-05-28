import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'ramda'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'

/**
 * The Price component. Shows the prices information of the Product Summary.
 */
class Price extends Component {
  static contextTypes = {
    culture: PropTypes.object,
  }

  render() {
    const {
      sellingPrice,
      listPrice,
      installments,
      showInstallments,
      showLabels,
      showSavings,
      intl: { formatNumber },
    } = this.props

    const noInterestRateInstallments = installments.filter(
      installment => !installment.InterestRate
    )

    const installment = (isEmpty(noInterestRateInstallments)
      ? installments
      : noInterestRateInstallments
    ).reduce(
      (ac, inst) =>
        ac.NumberOfInstallments > inst.NumberOfInstallments ? ac : inst
    )

    const differentPrices =
      this.props.showListPrice && sellingPrice !== listPrice

    const currencyOptions = {
      style: 'currency',
      currency: this.context.culture.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }

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
      <div className="vtex-price flex flex-column justify-around">
        {differentPrices && (
          <div className="vtex-price-list__container pv1 normal">
            {showLabels && (
              <div className="vtex-price-list__label dib strike">
                <FormattedMessage id="pricing.from" />
              </div>
            )}
            <div className="vtex-price-list dib ph2 strike">
              {formatNumber(listPrice, currencyOptions)}
            </div>
          </div>
        )}
        <div className="vtex-price-selling__container pv1 b">
          {showLabels && (
            <div className="vtex-price-selling__label dib">
              <FormattedMessage id="pricing.to" />
            </div>
          )}
          <div className="vtex-price-selling dib ph2">
            {formatNumber(sellingPrice, currencyOptions)}
          </div>
        </div>
        {showInstallments &&
          installment && (
          <div className="vtex-price-installments__container">
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
                  {installmentsElement} {timesElement}{' '}
                  {installmentPriceElement}
                </span>
              )}
              {!installment.InterestRate && (
                <span className="pl1">
                  <FormattedMessage id="pricing.interest-free" />
                </span>
              )}
            </div>
          </div>
        )}
        {differentPrices &&
          showSavings && (
          <div className="vtex-price-savings__container">
            <div className="vtex-price-savings dib">
              <FormattedMessage
                id="pricing.savings"
                values={{
                  savings: formatNumber(
                    listPrice - sellingPrice,
                    currencyOptions
                  ),
                }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

Price.propTypes = {
  /** Product selling price */
  sellingPrice: PropTypes.number.isRequired,
  /** Product list price */
  listPrice: PropTypes.number.isRequired,
  /** Set visibility of list price */
  showListPrice: PropTypes.bool.isRequired,
  /** Set visibility of labels */
  showLabels: PropTypes.bool.isRequired,
  /** Set visibility of installments */
  showInstallments: PropTypes.bool.isRequired,
  /** Set visibility of savings */
  showSavings: PropTypes.bool,
  /** Available installments */
  installments: PropTypes.arrayOf(
    PropTypes.shape({
      /** Installment value */
      Value: PropTypes.number.isRequired,
      /** Interest rate (zero if interest-free) */
      InterestRate: PropTypes.number.isRequired,
      /** Calculated total value */
      TotalValuePlusInterestRate: PropTypes.number,
      /** Number of installments */
      NumberOfInstallments: PropTypes.number.isRequired,
      /** Installments offer name */
      Name: PropTypes.string,
    })
  ),
  /** intl property to format data */
  intl: intlShape.isRequired,
}

Price.defaultProps = {
  showListPrice: true,
  showLabels: true,
  showInstallments: false,
}

export default injectIntl(Price)
