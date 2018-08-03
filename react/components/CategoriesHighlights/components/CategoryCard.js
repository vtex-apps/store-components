import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'render'

import categoryPlaceholder from '../images/category-placeholder.png'

/**
 * CategoryCard is a component responsible to display an image of a category
 * and provides the link to the category specified by its name.
 */
class CategoryCard extends Component {
  static propTypes = {
    /** Name of the category */
    name: PropTypes.string.isRequired,
    /** Image of the category */
    image: PropTypes.string,
  }

  render() {
    const { name, image } = this.props
    return (
      <div className="vtex-categories-highlights__category-card shadow-1">
        {/* TODO: Redirect to the page of the category specified by its name */}
        <Link>
          {image ? (
            <img src={image} alt={name} />
          ) : (
            <img src={categoryPlaceholder} alt="" />
          )}
        </Link>
      </div>
    )
  }
}

export default CategoryCard
