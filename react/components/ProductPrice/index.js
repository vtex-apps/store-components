import './global.css'

import PropTypes from 'prop-types'
import { isNil } from 'ramda'
import React, { Component } from 'react'
import ContentLoader from 'react-content-loader'
import { FormattedMessage, injectIntl } from 'react-intl'

import PricePropTypes from './propTypes'
import Installments from './Installments'

/**
 * The Price component. Shows the prices information of the Product Summary.
 */
class Price extends Component {
  static contextTypes = {
    culture: PropTypes.object,
  }

  static propTypes = PricePropTypes

  static defaultProps = {
    showListPrice: true,
    showLabels: true,
    showInstallments: false,
    showSavings: false,
  }

  currencyOptions = {
    style: 'currency',
    currency: this.context.culture.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

<<<<<<< HEAD
=======
  getInstallmentsNode() {
    const {
      installments,
      showLabels,
      intl: { formatNumber },
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
      this.currencyOptions
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

>>>>>>> removing console warnings
  render() {
    const {
      sellingPrice,
      listPrice,
      showListPrice,
      showInstallments,
      showLabels,
      showSavings,
      installments,
      styles,
      intl: { formatNumber },
    } = this.props

    if ((showListPrice && isNil(listPrice)) || isNil(sellingPrice)) {
      return <Price.Loader {...styles} />
    }

    const differentPrices = showListPrice && sellingPrice !== listPrice
    console.log('version')
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
              {formatNumber(listPrice, this.currencyOptions).replace(" ", '')}
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
            {formatNumber(sellingPrice, this.currencyOptions).replace(" ", '')}
          </div>
        </div>
        {showInstallments &&
          <Installments
            installments={installments}
            showLabels={showLabels}
            formatNumber={formatNumber}
            currencyOptions={this.currencyOptions}
          />}
        {differentPrices &&
          showSavings && (
            <div className="vtex-price-savings__container">
              <div className="vtex-price-savings dib">
                <FormattedMessage
                  id="pricing.savings"
                  values={{
                    savings: formatNumber(
                      listPrice - sellingPrice,
                      this.currencyOptions
                    ).replace(" ", ''),
                  }}
                />
              </div>
            </div>
          )}
      </div>
    )
  }
}

Price.Loader = (loaderProps = {}) => (
  <div className="vtex-price vtex-price-loader">
    <ContentLoader
      style={{
        width: '100%',
        height: '100%',
      }}
      height="100%"
      width="100%"
      {...loaderProps}>
      <rect
        height="0.75em"
        width="50%"
        x="25%"
        {...loaderProps['vtex-price-list__container--loader']}
      />
      <rect {...loaderProps['vtex-price-selling__label--loader']} />
      <rect
        height="1em"
        width="70%"
        x="15%"
        y="1.25em"
        {...loaderProps['vtex-price-selling--loader']}
      />
      <rect
        height="0.75em"
        width="80%"
        x="10%"
        y="2.75em"
        {...loaderProps['vtex-price-installments--loader']}
      />
      <rect {...loaderProps['vtex-price-savings--loader']} />
    </ContentLoader>
  </div>
)


const priceWithIntel = injectIntl(Price)

priceWithIntel.schema = {
  title: 'editor.productPrice.title',
  description: 'editor.productPrice.description',
  type: 'object',
  properties: {
    showListPrice: {
      type: 'boolean',
      title: 'editor.productPrice.showListPrice',
      default: Price.defaultProps.showListPrice,
      isLayout: true,
    },
    showLabels: {
      type: 'boolean',
      title: 'editor.productPrice.showLabels',
      default: Price.defaultProps.showLabels,
      isLayout: true,
    },
    showInstallments: {
      type: 'boolean',
      title: 'editor.productPrice.showInstallments',
      default: Price.defaultProps.showInstallments,
      isLayout: true,
    },
    showSavings: {
      type: 'boolean',
      title: 'editor.productPrice.showSavings',
      default: Price.defaultProps.showSavings,
      isLayout: true,
    },
  },
}

export default priceWithIntel
