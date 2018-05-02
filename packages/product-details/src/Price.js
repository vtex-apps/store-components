import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FormattedMessage,
  injectIntl,
  intlShape,
  addLocaleData,
} from 'react-intl'

import enLocale from './locales/en-US.json'
import ptLocale from './locales/pt-BR.json'
import esLocale from './locales/es-AR.json'

addLocaleData([
  { ...enLocale, locale: 'en-US' },
  { ...ptLocale, locale: 'pt-BR' },
  { ...esLocale, locale: 'es-AR' },
])

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
      installmentPrice,
      showInstallments,
      showLabels,
      intl: { formatNumber },
    } = this.props

    const showListPrice = this.props.showListPrice && sellingPrice !== listPrice

    const currencyOptions = {
      style: 'currency',
      currency: this.context.culture.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }

    const formattedInstallmentPrice = formatNumber(
      installmentPrice,
      currencyOptions
    )

    return (
      <div className="vtex-price tc fabriga">
        {showListPrice && (
          <div className="pv1 f6-ns f7-s normal">
            {showLabels && (
              <div className="vtex-price-list__label dib">
                <FormattedMessage id="pricing.from" />
              </div>
            )}
            <div className="vtex-price-list dib strike ph2">
              {formatNumber(listPrice, currencyOptions)}
            </div>
          </div>
        )}
        <div className="pv1 b f4-ns f5-s">
          {showLabels && (
            <div className="vtex-selling-price__label dib">
              <FormattedMessage id="pricing.to" />
            </div>
          )}
          <div className="vtex-selling-price dib ph2">
            {formatNumber(sellingPrice, currencyOptions)}
          </div>
        </div>
        {showInstallments &&
          installments &&
          installmentPrice && (
          <div className="f6-ns f7-s">
            <div className="vtex-price-installments dib">
              {showLabels ? (
                <FormattedMessage
                  id="pricing.installment-display"
                  values={{
                    installments,
                    installmentPrice: formattedInstallmentPrice,
                    times: <span>&times;</span>,
                  }}
                />
              ) : (
                <span>
                  {installments} &times; {formattedInstallmentPrice}
                </span>
              )}
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
  /** Determines if the list price is shown or not */
  showListPrice: PropTypes.bool.isRequired,
  /** Determines if the labels are shown. If false, only the values will be shown */
  showLabels: PropTypes.bool.isRequired,
  /** Determines if the installments are shown */
  showInstallments: PropTypes.bool.isRequired,
  /** Available number of installments */
  installments: PropTypes.number,
  /** Single installment price */
  installmentPrice: PropTypes.number,
  /** intl property to format data */
  intl: intlShape.isRequired,
}

Price.defaultProps = {
  showListPrice: true,
  showLabels: true,
  showInstallments: false,
}

export default injectIntl(Price)
