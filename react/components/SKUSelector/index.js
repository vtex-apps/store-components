import React, { Component } from 'react'
import { withRuntimeContext } from 'render'

import SKUSelector from './components/SKUSelector'
import { SKUSelectorContainerPropTypes } from './utils/proptypes'
import { getMainVariationName, getVariationOptions, getMaxSkuPrice, parseSku } from './utils'

import './global.css'

/**
 * Display a list of SKU items of a product and its specifications.
 */
class SKUSelectorContainer extends Component {
  handleSkuSelection = (skuId) => {
    this.props.onSKUSelected ? this.props.onSKUSelected(skuId) : this.redirectToSku(skuId)
  }

  redirectToSku(skuId) {
    const { runtime: { navigate } } = this.props
    const slug = this.props.productSlug

    navigate({
      page: 'store.product',
      params: { slug },
      query: `skuId=${skuId}`,
    })
  }

  render() {
    if (!this.props.skuSelected || !this.props.skuSelected.variations || this.props.skuSelected.variations.length === 0) return null

    const skuSelected = this.props.skuSelected && parseSku(this.props.skuSelected)
    const skuItems = this.props.skuItems && this.props.skuItems.map(sku => parseSku(sku))
    const itemId = skuSelected.itemId
    const variations = skuSelected.variations

    const name = getMainVariationName(variations)
    const mainVariation = {
      name,
      value: skuSelected[name],
      options: getVariationOptions(name, skuItems),
    }

    const maxSkuPrice = getMaxSkuPrice(skuItems)
    const secondaryVariation = {}

    const filteredSkus = skuItems.filter(sku => sku[name] === mainVariation.value)

    if (variations.length > 1) {
      secondaryVariation.name = variations.filter(variation => variation !== name)[0]
      secondaryVariation.options = getVariationOptions(secondaryVariation.name, filteredSkus)
    }

    return (
      <SKUSelector
        mainVariation={mainVariation}
        secondaryVariation={secondaryVariation}
        onSelectSku={this.handleSkuSelection}
        maxSkuPrice={maxSkuPrice}
        selectedId={itemId}
      />
    )
  }
}

SKUSelectorContainer.propTypes = SKUSelectorContainerPropTypes

export default withRuntimeContext(SKUSelectorContainer)
