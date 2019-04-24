import * as React from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'

import ProductPrice from './index'

const styles = {
  'vtex-price-list__container--loader': {
    x: 0,
    width: '7.219em',
    height: '0.56em',
  },
  'vtex-price-selling__label--loader': {
    x: 0,
    y: '2em',
    width: '2.85em',
    height: '1.08em',
  },
  'vtex-price-selling--loader': {
    x: '3.25em',
    y: '0.86em',
    width: '14.572em',
    height: '2.176em',
  },
  'vtex-price-installments--loader': {
    x: 0,
    y: '3.75em',
    width: '12em',
    height: '0.825em',
  },
  'vtex-price-savings--loader': {
    x: 0,
    y: '5em',
    width: '10em',
    height: '0.686em',
  },
}

const ProductPriceWrapper = ({
  labelSellingPrice,
  showListPrice,
  showInstallments,
  showLabels,
  showSavings,
  ...props,
}) => {
  const valuesFromContext = React.useContext(ProductContext)

  const productPriceProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) 
      return {
        ...props,
        labelSellingPrice,
        showListPrice,
        showInstallments,
        showLabels,
        showSavings,      
      }

    const { selectedItem } = valuesFromContext
    const commertialOffer = path(['sellers', 0, 'commertialOffer'], selectedItem)

    return {
      styles: styles,
      listPriceContainerClass: 't-small-s t-small-ns c-muted-2 mb2',
      sellingPriceLabelClass: 't-heading-6-s t-heading-5-ns dib',
      listPriceLabelClass: 'dib strike',
      listPriceClass: 'ph2 dib strike',
      sellingPriceContainerClass: 'pv1 b c-on-base',
      sellingPriceClass: 't-heading-2-s dib ph2',
      installmentContainerClass: 't-mini-s t-small-ns c-on-base',
      installmentClass: 't-body',
      interestRateClass: 'dib ph2',
      savingsContainerClass: 'c-success mt3',
      savingsClass: 'dib t-small',
      loaderClass: 'h4-s mw6-s pt2-s',
      listPrice: path(['ListPrice'], commertialOffer),
      sellingPrice: path(['Price'], commertialOffer),
      installments: path(['Installments'], commertialOffer),
      labelSellingPrice,
      showLabels,
      showInstallments,
      showListPrice,
      showSavings,    
    }
  }

  return (
    <ProductPrice { ...productPriceProps() } />
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
      default: null,
      isLayout: true,
    },
    showListPrice: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showListPrice',
      default: true,
      isLayout: true,
    },
    showLabels: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showLabels',
      default: true,
      isLayout: true,
    },
    showInstallments: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showInstallments',
      default: false,
      isLayout: true,
    },
    showSavings: {
      type: 'boolean',
      title: 'admin/editor.productPrice.showSavings',
      default: false,
      isLayout: true,
    },
  },
}

export default ProductPriceWrapper
