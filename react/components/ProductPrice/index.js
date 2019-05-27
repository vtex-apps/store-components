import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { isNil, head, last, sort, equals } from 'ramda'
import ContentLoader from 'react-content-loader'
import { FormattedMessage, injectIntl } from 'react-intl'
import { IOMessage } from 'vtex.native-types'

import PricePropTypes from './propTypes'
import Installments from './Installments'
import Price from './Price'

import productPrice from './styles.css'

const isValidPriceRange = priceRange => {
  const [lowPrice, highPrice] = priceRange
  return priceRange.length === 2 && lowPrice !== highPrice
}

const getPriceRange = prices => {
  const sortedPrices = sort((a, b) => a - b, prices)
  return [
    head(sortedPrices),            
    last(sortedPrices)
  ]
}
/**
 * The Price component. Shows the prices information of the Product Summary.
 */
class ProductPrice extends Component {
  static contextTypes = {
    culture: PropTypes.object,
  }

  static propTypes = PricePropTypes

  static defaultProps = {
    showSellingPriceRange: false,
    showListPriceRange: false,
    showListPrice: true,
    showLabels: true,
    showInstallments: false,
    showSavings: false,
    labelSellingPrice: null,
    labelListPrice: null
  }

  currencyOptions = {
    style: 'currency',
    currency: this.context.culture.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  mayShowListPrice = () => {
    const { 
      sellingPriceList,
      sellingPrice,
      listPrice,
      listPriceList,
      showListPrice,
      showListPriceRange,
      showSellingPriceRange,
    } = this.props

    if (!showListPrice) {
      return false
    }

    const sellingPriceRange = (sellingPriceList && getPriceRange(sellingPriceList)) || []
    const listPriceRange = (listPriceList && getPriceRange(listPriceList)) || []

    const showingSellingPriceRange = showSellingPriceRange && isValidPriceRange(sellingPriceRange)
    const showingListPriceRange = showListPriceRange && isValidPriceRange(listPriceRange)

    if (showingSellingPriceRange && !showingListPriceRange) {
      return false
    }

    const sellingPriceToShow = showingSellingPriceRange ? sellingPriceRange : sellingPrice
    const listPriceToShow = showingListPriceRange ? listPriceRange : listPrice

    return !equals(listPriceToShow, sellingPriceToShow)
  }

  render() {
    const {
      sellingPriceList,
      sellingPrice,
      listPrice,
      listPriceList,
      showListPrice,
      showSellingPriceRange,
      showListPriceRange,
      showInstallments,
      showLabels,
      showSavings,
      labelSellingPrice,
      labelListPrice,
      className,
      loaderClass,
      listPriceContainerClass,
      listPriceLabelClass,
      listPriceClass,
      listPriceRangeClass,
      sellingPriceRangeClass,
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
      ...ProductPrice.defaultProps.classes,
      ...classes,
    }

    if ((showListPrice && isNil(listPrice)) || isNil(sellingPrice)) {
      return <ProductPrice.Loader loaderClass={loaderClass} {...styles} />
    }

    const mayShowListPrice = this.mayShowListPrice()

    const sellingPriceRange = sellingPriceList && getPriceRange(sellingPriceList)
    const listPriceRange = listPriceList && getPriceRange(listPriceList)
    
    return (
      <div className={classNames(productPrice.priceContainer, className)}>
        {mayShowListPrice && (
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
                  listPriceLabelClass,
                  'dib ph2 t-small-ns t-mini'
                )}
              >
                {!isNil(labelListPrice) ? (labelListPrice ) : <IOMessage id="store/pricing.from" />}
              </div>
            )}
            <Price
              showPriceRange={showListPriceRange}
              priceRange={listPriceRange}
              price={listPrice}
              rangeContainerClasses={classNames(
                productPrice.listPriceValue,
                listPriceRangeClass
              )}
              singleContainerClasses={classNames(
                productPrice.listPriceValue,
                listPriceClass
              )}
              currencyOptions={this.currencyOptions}
            />
          </div>
        )}
        <div
          className={classNames(
            productPrice.sellingPrice,
            sellingPriceContainerClass
          )}
        >
          {showLabels && mayShowListPrice && (
            <div
              className={classNames(
                productPrice.sellingPriceLabel,
                sellingPriceLabelClass
              )}
            >
              {!isNil(labelSellingPrice) ? (labelSellingPrice ) : <IOMessage id="store/pricing.to" />}
            </div>
          )}
          <Price
            showPriceRange={showSellingPriceRange}
            priceRange={sellingPriceRange}
            price={sellingPrice}
            rangeContainerClasses={classNames(
              productPrice.sellingPrice,
              sellingPriceRangeClass
            )}
            singleContainerClasses={classNames(
              productPrice.sellingPrice, 
              sellingPriceClass
            )}
            currencyOptions={this.currencyOptions}
          />
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
        {mayShowListPrice && showSavings && (
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

ProductPrice.Loader = (loaderProps = {}) => (
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

ProductPrice.Loader.displayName = 'ProductPrice.Loader'

const priceWithIntl = injectIntl(ProductPrice)

priceWithIntl.schema = {
  title: 'admin/editor.productPrice.title',
  description: 'admin/editor.productPrice.description',
  type: 'object',
  properties: {
    showSellingPriceRange: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showSellingPriceRange',
      default: ProductPrice.defaultProps.showSellingPriceRange,
      isLayout: true,
    },
    showListPriceRange: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showListPriceRange',
      default: ProductPrice.defaultProps.showListPriceRange,
      isLayout: true,
    },
    showListPrice: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showListPrice',
      default: ProductPrice.defaultProps.showListPrice,
      isLayout: true,
    },
    showLabels: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showLabels',
      default: ProductPrice.defaultProps.showLabels,
      isLayout: true,
    },
    showInstallments: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showInstallments',
      default: ProductPrice.defaultProps.showInstallments,
      isLayout: true,
    },
    showSavings: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showSavings',
      default: ProductPrice.defaultProps.showSavings,
      isLayout: true,
    },
  },
}

export default priceWithIntl