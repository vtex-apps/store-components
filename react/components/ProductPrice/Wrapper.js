import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty, has } from 'ramda'

import ProductPrice from './index'

const isAvailable = commertialOffer =>
  Number.isNaN(+path(['AvailableQuantity'], commertialOffer)) ||
  path(['AvailableQuantity'], commertialOffer) > 0

const ProductPriceWrapper = props => {
  const valuesFromContext = useContext(ProductContext)

  const commertialOffer = path(
    ['selectedItem', 'sellers', 0, 'commertialOffer'],
    valuesFromContext
  )

  const listPrice =
    props.listPrice != null
      ? props.listPrice
      : path(['ListPrice'], commertialOffer)

  const sellingPrice =
    props.sellingPrice != null
      ? props.sellingPrice
      : path(['Price'], commertialOffer)

  const installments =
    props.installments != null
      ? props.installments
      : path(['Installments'], commertialOffer)

  const showProductPrice =
    props.showProductPrice != null
      ? props.showProductPrice
      : isAvailable(commertialOffer)

  const isNotPDP = !has('query', props) && !has('params', props)
  const listPriceContainerClass = isNotPDP
    ? listPriceContainerClass
    : 't-small-s t-small-ns c-muted-2 mb2'
  const sellingPriceLabelClass = isNotPDP
    ? sellingPriceLabelClass
    : 't-heading-6-s t-heading-5-ns dib'
  const listPriceLabelClass = isNotPDP ? listPriceLabelClass : 'dib strike'
  const listPriceClass = isNotPDP ? listPriceClass : 'ph2 dib strike'
  const sellingPriceContainerClass = isNotPDP
    ? sellingPriceContainerClass
    : 'pv1 b c-on-base'
  const sellingPriceClass = isNotPDP
    ? sellingPriceClass
    : 't-heading-2-s dib ph2'
  const installmentContainerClass = isNotPDP
    ? installmentContainerClass
    : 't-mini-s t-small-ns c-on-base'
  const installmentClass = isNotPDP ? installmentClass : 't-body'
  const interestRateClass = isNotPDP ? interestRateClass : 'dib ph2'
  const savingsContainerClass = isNotPDP
    ? savingsContainerClass
    : 'c-success mt3'
  const savingsClass = isNotPDP ? savingsClass : 'dib t-small'
  const loaderClass = isNotPDP ? loaderClass : 'h4-s mw6-s pt2-s'

  if (!showProductPrice) {
    return null
  }

  return (
    <ProductPrice
      sellingPriceList={props.sellingPriceList}
      sellingPrice={sellingPrice}
      listPrice={listPrice}
      listPriceList={props.listPriceList}
      showListPrice={props.showListPrice}
      showSellingPriceRange={props.showSellingPriceRange}
      showListPriceRange={props.showListPriceRange}
      showInstallments={props.showInstallments}
      showLabels={props.showLabels}
      showSavings={props.showSavings}
      labelSellingPrice={props.labelSellingPrice}
      labelListPrice={props.labelListPrice}
      className={props.className}
      loaderClass={loaderClass}
      listPriceContainerClass={listPriceContainerClass}
      listPriceLabelClass={listPriceLabelClass}
      listPriceClass={listPriceClass}
      listPriceRangeClass={props.listPriceRangeClass}
      sellingPriceRangeClass={props.sellingPriceRangeClass}
      sellingPriceContainerClass={sellingPriceContainerClass}
      sellingPriceLabelClass={sellingPriceLabelClass}
      sellingPriceClass={sellingPriceClass}
      savingsContainerClass={savingsContainerClass}
      savingsClass={savingsClass}
      installments={installments}
      installmentClass={installmentClass}
      interestRateClass={interestRateClass}
      installmentContainerClass={installmentContainerClass}
      styles={props.styles}
    />
  )
}

ProductPriceWrapper.schema = {
  title: 'admin/editor.productPrice.title',
  description: 'admin/editor.productPrice.description',
  type: 'object',
  properties: {
    labelSellingPrice: {
      type: 'string',
      title: 'admin/editor.productPrice.labelSellingPrice',
      default: ProductPrice.defaultProps.labelSellingPrice,
      isLayout: false,
    },
    labelListPrice: {
      type: 'string',
      title: 'admin/editor.productPrice.labelListPrice',
      default: ProductPrice.defaultProps.labelListPrice,
      isLayout: false,
    },
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

export default ProductPriceWrapper
