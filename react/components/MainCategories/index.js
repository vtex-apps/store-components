import './global.css'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

import CategoryCard from './components/CategoryCard'

const QUANTITY_ITENS = 4

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
    /** Flag which indicates if the main categories should be displayed or not */
    showMainCategories: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    categories: [],
    showMainCategories: false,
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
          minItens: QUANTITY_ITENS,
          maxItens: QUANTITY_ITENS,
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
          isLayout: false,
        },
        showMainCategories: {
          type: 'boolean',
          title: 'editor.mainCategories.showMainCategories',
          default: false,
          isLayout: true,
        },
      },
    }
  }

  render() {
    const { categories, showMainCategories } = this.props

    if (!categories.length || categories.length < QUANTITY_ITENS || !showMainCategories) return null

    return (
      <div className="vtex-main-categories relative">
        <div className="flex flex-row flex-wrap items-center justify-center">
          {categories.slice(0, QUANTITY_ITENS).map((category, index) => (
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
