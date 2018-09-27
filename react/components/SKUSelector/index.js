import React, { Component } from 'react'

import SKUSelector from './components/SKUSelector';
import { SKUSelectorContainerPropTypes } from './utils/proptypes'
import { getMainVariationName, getVariationOptions, getMaxSkuPrice, parseSku } from './utils'

import './global.css'

/**
 * Parse the skus to retrieve the given variations.
 */
export default (props) => {

  if (!props.skuSelected || !props.skuSelected.variations || props.skuSelected.variations.length === 0) return null

  const skuSelected = props.skuSelected && parseSku(props.skuSelected) || null
  const skuItems = props.skuItems && props.skuItems.map(sku => parseSku(sku)) || null

  return <SKUSelectorContainer {...props} skuSelected={skuSelected} skuItems={skuItems} />
}

/**
 * Display a list of SKU items of a product and its specifications.
 */
class SKUSelectorContainer extends Component {
  handleSelectSku = (skuId) => {
    const slug = this.props.productSlug

    this.context.navigate({
      page: 'store/product',
      params: { slug },
      query: `skuId=${skuId}`,
    })
  }

  render() {
    const { skuItems, skuSelected: { variations, itemId } } = this.props

    const name = getMainVariationName(variations)
    const mainVariation = {
      name,
      value: this.props.skuSelected[name],
      options: getVariationOptions(name, skuItems)
    }

    const maxSkuPrice = getMaxSkuPrice(skuItems)
    const secondaryVariation = {}

    const filteredSkus = skuItems.filter(sku => sku[mainVariation.name] === mainVariation.value)

    if (variations.length > 1) {
      secondaryVariation.name = variations.filter(variation => variation !== mainVariation.name)[0]
      secondaryVariation.options = getVariationOptions(secondaryVariation.name, filteredSkus)
    }

    return (
      <SKUSelector
        mainVariation={mainVariation}
        secondaryVariation={secondaryVariation}
        onSelectSku={this.handleSelectSku}
        maxSkuPrice={maxSkuPrice}
        selectedId={itemId}
      />
    )
  }
}

SKUSelectorContainer.contextTypes = {
  navigate: PropTypes.func,
}

SKUSelectorContainer.propTypes = SKUSelectorContainerPropTypes
