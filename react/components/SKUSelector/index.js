import React, { Component } from 'react'
import { withRuntimeContext } from 'vtex.render-runtime'

import SKUSelector from './components/SKUSelector'
import { SKUSelectorContainerPropTypes } from './utils/proptypes'
import {
  getMainVariationName,
  getVariationOptions,
  getMaxSkuPrice,
  parseSku,
} from './utils'

/**
 * Display a list of SKU items of a product and its specifications.
 */
class SKUSelectorContainer extends Component {
  static defaultProps = {
    alwaysShowSecondary: true,
  }

  state = { mainVariation: null, secondaryVariation: null }

  buildVariations = rawSkuSelected => {
    const skuSelected = rawSkuSelected && parseSku(rawSkuSelected)
    const skuItems =
      this.props.skuItems && this.props.skuItems.map(sku => parseSku(sku))
    const itemId = skuSelected.itemId
    const variations = skuSelected.variations

    const name = getMainVariationName(variations)
    const mainVariation = {
      name,
      value: this.props.skuSelected ? skuSelected[name] : null,
      options: getVariationOptions(name, skuItems),
    }

    const secondaryVariation = { value: this.props.skuSelected ? itemId : null }

    const filteredSkus = skuItems.filter(sku => sku[name] === skuSelected[name])

    if (variations.length > 1) {
      secondaryVariation.name = variations.find(variation => variation !== name)
      secondaryVariation.options = getVariationOptions(
        secondaryVariation.name,
        filteredSkus
      )
    }

    return { mainVariation, secondaryVariation }
  }

  componentDidMount() {
    this.setState(
      this.buildVariations(this.props.skuSelected || this.props.skuItems[0])
    )
  }

  handleSkuSelection = (isMainVariation, skuId) => {
    const selectedSku = this.props.skuItems.find(
      ({ itemId }) => itemId === skuId
    )
    const variations = this.buildVariations(selectedSku)

    variations.mainVariation.value = selectedSku.variations[0].values[0]
    variations.secondaryVariation.value = null
    // If there is secondary variation and there is only one option, assign skuId value to it
    if (
      variations.secondaryVariation.options &&
      variations.secondaryVariation.options.length === 1
    ) {
      variations.secondaryVariation.value = skuId
    }
    if (!isMainVariation) {
      variations.secondaryVariation.value = skuId
    }

    this.setState(variations)

    const isSecondaryPicked = !!variations.secondaryVariation.value

    this.props.onSKUSelected
      ? this.props.onSKUSelected(skuId, isMainVariation, isSecondaryPicked)
      : this.redirectToSku(skuId, isMainVariation)
  }

  redirectToSku(skuId, isMainVariation) {
    const {
      runtime: { setQuery },
    } = this.props

    setQuery({ skuId }, { replace: !isMainVariation })
  }

  render() {
    if (!this.props.skuItems || this.props.skuItems.length === 0) {
      return null
    }
    const skuItems =
      this.props.skuItems && this.props.skuItems.map(sku => parseSku(sku))

    const maxSkuPrice = getMaxSkuPrice(skuItems)

    return (
      <SKUSelector
        mainVariation={this.state.mainVariation}
        secondaryVariation={this.state.secondaryVariation}
        onSelectSku={this.handleSkuSelection}
        maxSkuPrice={maxSkuPrice}
        alwaysShowSecondary={this.props.alwaysShowSecondary}
      />
    )
  }
}

SKUSelectorContainer.propTypes = SKUSelectorContainerPropTypes

export default withRuntimeContext(SKUSelectorContainer)
