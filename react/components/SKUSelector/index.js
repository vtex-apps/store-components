import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Selector from './components/Selector'
import SelectorItem from './components/SelectorItem'

import VTEXClasses from './constants/CustomClasses'

import './global.css'

const FIRST_INDEX = 0

/**
 * SKUSelector component.
 * Display a list of SKU Items and a list of SKU Specifications.
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
    this.props.onSKUSelected(skuIndex)
  }

  render() {
    return (
      <div className={`${VTEXClasses.SKU_SELECTOR} flex flex-column`}>
        <Selector 
          title="SKU" 
          onItemClick={this.handleSKUSelected}>
          {
            this.props.skuItems.map(skuItem => (
              <SelectorItem key={skuItem.images[FIRST_INDEX].imageUrl}>
                <img
                  src={skuItem.images[FIRST_INDEX].imageUrl} 
                  alt={skuItem.images[FIRST_INDEX].imageLabel} 
                />
              </SelectorItem>
            ))
          }
        </Selector>
        {
          this.props.skuItems[this.state.selectedSKUIndex].specs.map(spec => (
            <Selector
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
            </Selector>
          ))
        }
      </div>
    )
  }
}

SKUSelector.propTypes = {
  /** Title which describes the SKU Selector Type */
  title: PropTypes.string.isRequired,
  /** List of SKU Selector Items */
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
  onSKUSelected: PropTypes.func.isRequired,
}

export default SKUSelector