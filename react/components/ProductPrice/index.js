import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isNil, path } from 'ramda'
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
    labelSellingPrice: null,
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
      showLabels,
      showSavings,
      labelSellingPrice,
      installments,
      installmentsClasses,
      styles,
      intl: { formatNumber },
    } = this.props

    let { classes } = this.props
    // avoiding undefined verifications
    classes = {
      ...Price.defaultProps.classes,
      ...classes
    }

    if ((showListPrice && isNil(listPrice)) || isNil(sellingPrice)) {
      return <Price.Loader classes={classes} {...styles} />
    }

    const differentPrices = showListPrice && sellingPrice !== listPrice

    return (
      <div className={classes.root}>
        {differentPrices && (
          <div className={classes.listPrice.container}>
            {showLabels && (
              <div className={classes.listPrice.label}>
                <FormattedMessage id="pricing.from" />
              </div>
            )}
            <span className={classes.listPrice.value}>
              {formatNumber(listPrice, this.currencyOptions)}
            </span>
          </div>
        )}
        <div className={classes.sellingPrice.container}>
          {showLabels && (
<<<<<<< HEAD
            <div className="vtex-price-selling__label dib">
              {labelSellingPrice || <FormattedMessage id="pricing.to" />}
=======
            <div className={classes.sellingPrice.label}>
              <FormattedMessage id="pricing.to" />
>>>>>>> Add classes prop to style Price component
            </div>
          )}
          <div className={classes.sellingPrice.value}>
            {formatNumber(sellingPrice, this.currencyOptions)}
          </div>
        </div>
        {showInstallments &&
          <Installments
            installments={installments}
            showLabels={showLabels}
            formatNumber={formatNumber}
            currencyOptions={this.currencyOptions}
            classes={installmentsClasses}
          />}
        {differentPrices && showSavings && (
          <div className={classes.savings.container}>
            <div className={classes.savings.value}>
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
          </div>
        )}
      </div>
    )
  }
}

Price.Loader = (loaderProps = {}) => (
  <div className={loaderProps.classes.rootLoader}>
    <ContentLoader
      style={{
        width: '100%',
        height: '100%',
      }}
      width={300}
      height={70}
      preserveAspectRatio='xMinYMin meet'
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
    labelSellingPrice: {
      type: 'string',
      title: 'editor.productPrice.labelSellingPrice',
      default: Price.defaultProps.labelSellingPrice,
      isLayout: true,
    },
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
    }
  },
}

export default priceWithIntel
