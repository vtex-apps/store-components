import './global.css'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

import CategoryCard from './components/CategoryCard'

const MAX_NUMBER_OF_CATEGORIES = 4

/**
 * MainCategories is a component responsible to display the
 * Main Categories of a department.
 */
class MainCategories extends Component {
  static propTypes = {
    /** Main categories of the department */
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        /** Name of the category */
        name: PropTypes.string.isRequired,
        /** Image of the category */
        image: PropTypes.string,
      })
    ).isRequired,
  }

  static defaultProps = {
    categories: [],
  }

  static uiSchema = {
    categories: {
      items: {
        image: {
          'ui:widget': 'image-uploader',
        },
      },
    },
  }

  static getSchema = () => {
    return {
      title: 'editor.mainCategories.title',
      description: 'editor.mainCategories.description',
      type: 'object',
      properties: {
        categories: {
          type: 'array',
          title: 'editor.mainCategories.categories',
          minItens: 1,
          maxItens: MAX_NUMBER_OF_CATEGORIES,
          items: {
            type: 'object',
            title: 'editor.mainCategories.category',
            properties: {
              name: {
                type: 'string',
                default: '',
                title: 'editor.mainCategories.item.categoryName',
              },
              image: {
                type: 'string',
                title: 'editor.mainCategories.item.categoryImage',
                default: '',
                widget: {
                  'ui:widget': 'image-uploader',
                },
              },
            },
          },
        },
      },
    }
  }

  render() {
    const { categories } = this.props

    if (!categories.length) return null

    return (
      <div className="vtex-main-categories relative">
        <div className="flex flex-row flex-wrap items-center justify-center">
          {categories
            .slice(0, MAX_NUMBER_OF_CATEGORIES)
            .map((category, index) => (
              <div
                className="vtex-main-categories__category-card-container"
                key={index}>
                <CategoryCard {...category} />
              </div>
            ))}
        </div>
      </div>
    )
  }
}

export default MainCategories
