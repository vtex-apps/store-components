import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { isNil } from 'ramda'
import ContentLoader from 'react-content-loader'
import { FormattedMessage, injectIntl } from 'react-intl'

import PricePropTypes from './propTypes'
import Installments from './Installments'

import productPrice from './styles.css'
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
      className,
      loaderClass,
      listPriceContainerClass,
      listPriceLabelClass,
      listPriceClass,
      sellingPriceContainerClass,
      sellingPriceLabelClass,
      sellingPriceClass,
      savingsContainerClass,
      savingsClass,
      installments,
      installmentClass,
      interestRateClass,
      installmentContainerClass,
      styles,
      intl: { formatNumber },
    } = this.props

    let { classes } = this.props
    // avoiding undefined verifications
    classes = {
      ...Price.defaultProps.classes,
      ...classes,
    }

    if ((showListPrice && isNil(listPrice)) || isNil(sellingPrice)) {
      return <Price.Loader loaderClass={loaderClass} {...styles} />
    }

    const differentPrices = showListPrice && sellingPrice !== listPrice

    return (
      <div className={classNames(productPrice.priceContainer, className)}>
        {differentPrices && (
          <div
            className={classNames(
              productPrice.listPrice,
              listPriceContainerClass
            )}
          >
            {showLabels && (
              <div
                className={classNames(
                  productPrice.listPriceLabel,
                  'dib ph2 t-small-ns t-mini'
                )}
              >
                <FormattedMessage id="store/pricing.from" />
              </div>
            )}
            <span
              className={classNames(
                productPrice.listPriceValue,
                listPriceClass
              )}
            >
              {formatNumber(listPrice, this.currencyOptions)}
            </span>
          </div>
        )}
        <div
          className={classNames(
            productPrice.sellingPrice,
            sellingPriceContainerClass
          )}
        >
          {showLabels && listPrice !== sellingPrice && (
            <div
              className={classNames(
                productPrice.sellingPriceLabel,
                sellingPriceLabelClass
              )}
            >
              {labelSellingPrice || <FormattedMessage id="store/pricing.to" />}
            </div>
          )}
          <div
            className={classNames(productPrice.sellingPrice, sellingPriceClass)}
          >
            {formatNumber(sellingPrice, this.currencyOptions)}
          </div>
        </div>
        {showInstallments && (
          <Installments
            installments={installments}
            showLabels={showLabels}
            formatNumber={formatNumber}
            currencyOptions={this.currencyOptions}
            className={installmentContainerClass}
            interestRateClass={interestRateClass}
            installmentClass={installmentClass}
          />
        )}
        {differentPrices && showSavings && (
          <div
            className={classNames(
              productPrice.savingPrice,
              savingsContainerClass
            )}
          >
            <div
              className={classNames(
                productPrice.savingPriceValue,
                savingsClass
              )}
            >
              <FormattedMessage
                id="store/pricing.savings"
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
  <div
    className={classNames(
      productPrice.priceContainer,
      productPrice.priceLoaderContainer,
      loaderProps.loaderClass
    )}
  >
    <ContentLoader
      style={{
        width: '100%',
        height: '100%',
      }}
      width={300}
      height={70}
      preserveAspectRatio="xMinYMin meet"
      {...loaderProps}
    >
      <rect
        height="0.75em"
        width="50%"
        x="25%"
        {...loaderProps[productPrice.listPriceLoader]}
      />
      <rect {...loaderProps[productPrice.sellingPriceLabelLoader]} />
      <rect
        height="1em"
        width="70%"
        x="15%"
        y="1.25em"
        {...loaderProps[productPrice.sellingPriceLoader]}
      />
      <rect
        height="0.75em"
        width="80%"
        x="10%"
        y="2.75em"
        {...loaderProps[productPrice.installmentsPriceLoader]}
      />
      <rect {...loaderProps[productPrice.savingsPriceLoader]} />
    </ContentLoader>
  </div>
)

Price.Loader.displayName = 'Price.Loader'

const priceWithIntel = injectIntl(Price)

priceWithIntel.schema = {
  title: 'admin/editor.productPrice.title',
  description: 'admin/editor.productPrice.description',
  type: 'object',
  properties: {
    labelSellingPrice: {
      type: 'string',
      title: 'admin/editor.productPrice.labelSellingPrice',
      default: Price.defaultProps.labelSellingPrice,
      isLayout: true,
    },
    showListPrice: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showListPrice',
      default: Price.defaultProps.showListPrice,
      isLayout: true,
    },
    showLabels: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showLabels',
      default: Price.defaultProps.showLabels,
      isLayout: true,
    },
    showInstallments: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showInstallments',
      default: Price.defaultProps.showInstallments,
      isLayout: true,
    },
    showSavings: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showSavings',
      default: Price.defaultProps.showSavings,
      isLayout: true,
    },
  },
}

export default priceWithIntel
