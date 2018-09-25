import React, { Component } from 'react'

import SKUSelector from './components/SKUSelector';
import { SKUSelectorContainerPropTypes } from './utils/proptypes'
import { getMainVariationName, getVariationOptions } from './utils'

import './global.css'

/**
 * Display a list of SKU items of a product and its specifications.
 */
export default class SKUSelectorContainer extends Component {
  constructor(props) {
    super(props)
    const { skuSelected } = props

    let mainVariationValue = ''
    if (skuSelected && skuSelected.variations) {
      const name = getMainVariationName(skuSelected.variations)
      mainVariationValue = skuSelected[name]
    }

    this.state = { mainVariationValue }
  }

  handleSelectSku = (skuId) => {
    //const slug = this.props.productSlug
    const slug = "ninja-300"

    this.context.navigate({
      page: 'store/product',
      params: { slug },
      query: `skuId=${skuId}`,
    })
  }

  handleSelectMainVariation = mainVariationValue => {
    console.log("set main", mainVariationValue)
    this.setState({ mainVariationValue })
  }

  render() {
    const { skuItems, skuSelected: { variations, itemId } } = this.props
    const { mainVariationValue } = this.state

    const mainName = getMainVariationName(variations)
    const mainVariation = {
      name: mainName,
      value: mainVariationValue,
      options: getVariationOptions(mainName, skuItems)
    }

    const secondaryVariation = {}

    const filteredSkus = skuItems.filter(sku => sku[mainVariation.name] === mainVariation.value)

    if (variations.length > 1) {
      secondaryVariation.name = variations.filter(variation => variation != mainVariation.name)[0]
      secondaryVariation.options = getVariationOptions(secondaryVariation.name, filteredSkus)
    }

    return (
      <SKUSelector
        mainVariation={mainVariation}
        secondaryVariation={secondaryVariation}
        onSelectSku={this.handleSelectSku}
        onSelectMainVariation={this.handleSelectMainVariation}
        selectedId={itemId}
        skus={filteredSkus}
      />
    )
  }
}

SKUSelectorContainer.contextTypes = {
  navigate: PropTypes.func,
}

SKUSelectorContainer.propTypes = SKUSelectorContainerPropTypes

SKUSelectorContainer.defaultProps = {
  skuItems: [],
}