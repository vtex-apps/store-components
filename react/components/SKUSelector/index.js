import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SelectorManager from './components/SelectorManager'
import SelectorItem from './components/SelectorItem'

import VTEXClasses from './constants/CustomClasses'

import './global.css'

const FIRST_INDEX = 0

/**
 * Display a list of SKU items of a problem and its specifications.
 */
class SKUSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSKUIndex: FIRST_INDEX,
    }
  }

  handleSKUSelected = skuIndex => {
    this.setState({
      selectedSKUIndex: skuIndex,
    })
    if (this.props.onSKUSelected) {
      this.props.onSKUSelected(skuIndex)
    }
  }

  render() {
    const skuItems = this.props.skuItems
    const selectedSKUIndex = this.state.selectedSKUIndex
    return (
      <div className={`${VTEXClasses.SKU_SELECTOR} flex flex-column`}>
        <SelectorManager 
          title={this.props.title} 
          onItemClick={this.handleSKUSelected}>
          {
            skuItems.map(skuItem => (
              skuItem.images.length > FIRST_INDEX &&
              <SelectorItem key={skuItem.images[FIRST_INDEX].imageUrl}>
                <img
                  src={skuItem.images[FIRST_INDEX].imageUrl} 
                  alt={skuItem.images[FIRST_INDEX].imageLabel} 
                />
              </SelectorItem>
            ))
          }
        </SelectorManager>
        {
          skuItems.length > selectedSKUIndex &&
          skuItems[selectedSKUIndex].specs &&
          skuItems[selectedSKUIndex].specs.map(spec => (
            <SelectorManager
              key={spec.name}
              title={spec.name}>
              {
                spec.categories.map(category => (
                  <SelectorItem key={category.name}> 
                    <p className="b tc">
                      { category.name }
                    </p>
                  </SelectorItem>
                ))
              }
            </SelectorManager>
          ))
        }
      </div>
    )
  }
}

SKUSelector.propTypes = {
  /** Title which describes the SKU Selector Type */
  title: PropTypes.string.isRequired,
  /** List of SKU Items */
  skuItems: PropTypes.arrayOf(PropTypes.shape({
    /** Name of the SKU Item */
    name: PropTypes.string.isRequired,
    /** Images of the SKU item */
    images: PropTypes.arrayOf(PropTypes.shape({
      /** URL of source Image */
      imageUrl: PropTypes.string.isRequired,
      /** Brief description of the image */
      imageLabel: PropTypes.string.isRequired,
    })).isRequired,
    /** SKU Specifications */
    specs: PropTypes.arrayOf(PropTypes.shape({
      /** Name of the specification */
      name: PropTypes.string.isRequired,
      /** Categories which belongs to this specification */
      categories: PropTypes.arrayOf(PropTypes.shape({
        /** Name of the category */
        name: PropTypes.string.isRequired,
      })).isRequired,
    })),
  })).isRequired,
  /** Function that is called when a SKU item is clicked */
  onSKUSelected: PropTypes.func,
}

SKUSelector.defaultProps = {
  title: '',
  skuItems: [],
}

export default SKUSelector