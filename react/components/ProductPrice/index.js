import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isNil } from 'ramda'
import ContentLoader from 'react-content-loader'
import { FormattedMessage, injectIntl } from 'react-intl'

import PricePropTypes from './propTypes'
import Installments from './Installments'

import './global.css'

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
    showInstallments: false,
    showSavings: false,
  }

  currencyOptions = {
    style: 'currency',
    currency: this.context.culture.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  render() {
    const {
      sellingPrice,
      listPrice,
      showListPrice,
      showInstallments,
      showSavings,
      installments,
      styles,
      intl: { formatNumber },
    } = this.props

    if ((showListPrice && isNil(listPrice)) || isNil(sellingPrice)) {
      return <Price.Loader {...styles} />
    }

    const differentPrices = showListPrice && sellingPrice !== listPrice

    return (
      <div className="flex flex-column justify-around mt3 mb3">
        {differentPrices && (
          <div className="c-muted-2 dib strike lh-copy mb2">
            {formatNumber(listPrice, this.currencyOptions)}
          </div>
        )}
        <div className="b dib c-on-base t-heading-2 lh-title">
          {formatNumber(sellingPrice, this.currencyOptions)}
        </div>
        {showInstallments &&
        <Installments
          installments={installments}
          formatNumber={formatNumber}
          currencyOptions={this.currencyOptions}
        />}
        {differentPrices && showSavings && (
          <div className="f5 dib c-success t-small lh-copy mt3 mb2">
            <FormattedMessage
              id="pricing.savings"
              values={{
                savings: formatNumber(
                  listPrice - sellingPrice,
                  this.currencyOptions
                ),
              }}
            />
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

Price.Loader.displayName = 'Price.Loader'

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
