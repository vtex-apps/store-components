import React, { useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { isNil, head, last, sort, equals } from 'ramda'
import { FormattedMessage, injectIntl } from 'react-intl'
import { IOMessage } from 'vtex.native-types'
import { useRuntime } from 'vtex.render-runtime'
import { formatCurrency } from 'vtex.format-currency'

import ProductPriceLoader from './Loader'
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
  return [head(sortedPrices), last(sortedPrices)]
}

const canShowListPrice = props => {
  const {
    sellingPriceList,
    sellingPrice,
    listPrice,
    listPriceList,
    showListPrice,
    showListPriceRange,
    showSellingPriceRange,
  } = props

  if (!showListPrice) {
    return false
  }

  const sellingPriceRange =
    (sellingPriceList && getPriceRange(sellingPriceList)) || []
  const listPriceRange = (listPriceList && getPriceRange(listPriceList)) || []

  const showingSellingPriceRange =
    showSellingPriceRange && isValidPriceRange(sellingPriceRange)
  const showingListPriceRange =
    showListPriceRange && isValidPriceRange(listPriceRange)

  if (showingSellingPriceRange && !showingListPriceRange) {
    return false
  }

  const sellingPriceToShow = showingSellingPriceRange
    ? sellingPriceRange
    : sellingPrice
  const listPriceToShow = showingListPriceRange ? listPriceRange : listPrice

  return !equals(listPriceToShow, sellingPriceToShow)
}

/**
 * The Price component. Shows the prices information of the Product Summary.
 */
const ProductPrice = (props, context) => {
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
    intl,
  } = props

  const { culture } = useRuntime()

  let { classes } = props

  // avoiding undefined verifications
  classes = {
    ...PriceWithIntl.defaultProps.classes,
    ...classes,
  }

  if ((showListPrice && isNil(listPrice)) || isNil(sellingPrice)) {
    return <ProductPriceLoader loaderClass={loaderClass} {...styles} />
  }

  const mayShowListPrice = canShowListPrice(props)

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
              <IOMessage id={labelListPrice} />
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
            <IOMessage id={labelSellingPrice} />
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
        />
      </div>
      {showInstallments && (
        <Installments
          installments={installments}
          showLabels={showLabels}
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
            className={classNames(productPrice.savingPriceValue, savingsClass)}
          >
            <FormattedMessage
              id="store/pricing.savings"
              values={{
                savings: formatCurrency({
                  intl,
                  culture,
                  value: listPrice - sellingPrice,
                }),
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

ProductPrice.propTypes = PricePropTypes

const PriceWithIntl = injectIntl(ProductPrice)

PriceWithIntl.defaultProps = {
  showSellingPriceRange: false,
  showListPriceRange: false,
  showListPrice: true,
  showLabels: true,
  showInstallments: false,
  showSavings: false,
  labelSellingPrice: null,
  labelListPrice: null,
}

PriceWithIntl.schema = {
  title: 'admin/editor.productPrice.title',
  description: 'admin/editor.productPrice.description',
  type: 'object',
  properties: {
    showSellingPriceRange: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showSellingPriceRange',
      default: PriceWithIntl.defaultProps.showSellingPriceRange,
      isLayout: true,
    },
    showListPriceRange: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showListPriceRange',
      default: PriceWithIntl.defaultProps.showListPriceRange,
      isLayout: true,
    },
    showListPrice: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showListPrice',
      default: PriceWithIntl.defaultProps.showListPrice,
      isLayout: true,
    },
    showLabels: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showLabels',
      default: PriceWithIntl.defaultProps.showLabels,
      isLayout: true,
    },
    showInstallments: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showInstallments',
      default: PriceWithIntl.defaultProps.showInstallments,
      isLayout: true,
    },
    showSavings: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showSavings',
      default: PriceWithIntl.defaultProps.showSavings,
      isLayout: true,
    },
  },
}

export default PriceWithIntl
