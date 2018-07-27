import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './global.css'

class CategoryCard extends Component {
  static propTypes = {
    /** Name of the Category */
    categoryName: PropTypes.string.isRequired,
    /** URL of the image that is related to the category */
    categoryImageUrl: PropTypes.string,
  }

  static defaultProps = {
    categoryName: 'Category Name',
  }

  render() {
    const { categoryName, categoryImageUrl } = this.props

    return (
      <div className="vtex-category-card shadow-1 flex items-center justify-center mv2 mh2">
        {
          categoryImageUrl 
          ? <img src={categoryImageUrl} alt={categoryName}/> 
          : <span className="f3 white">
              {categoryName}
            </span>
        }
      </div>
    )
  }
}

export default CategoryCard