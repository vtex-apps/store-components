import './global.css'

import PropTypes from 'prop-types'
import { range, values } from 'ramda'
import React, { Component } from 'react'

import CategoryCard from './components/CategoryCard'

/**
 * CategoriesHighlights is a component responsible to display the
 * Categories in Hightlight of a department.
 */
class CategoriesHighlights extends Component {
  static propTypes = {
    /** Categories in Highlight of the department */
    categories: PropTypes.object,
    /** Flag which indicates if the categories in highlight should be displayed or not */
    showCategoriesHighlights: PropTypes.bool.isRequired,
    /** Number of categories in highlight to be displayed (it should be 2 or 4) */
    quantityOfItems: PropTypes.number.isRequired,
  }

  static defaultProps = {
    categories: {},
    showCategoriesHighlights: false,
    quantityOfItems: 2,
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

  static getSchema = props => {
    const { showCategoriesHighlights, quantityOfItems } = props

    let categoriesProps = {}

    if (showCategoriesHighlights) {
      range(0, quantityOfItems).forEach(index => {
        categoriesProps[`category${index}`] = {
          type: 'object',
          title: 'editor.categoriesHighlights.category',
          properties: {
            name: {
              type: 'string',
              default: '',
              title: 'editor.categoriesHighlights.item.categoryName',
            },
            image: {
              type: 'string',
              title: 'editor.categoriesHighlights.item.categoryImage',
              default: '',
              widget: {
                'ui:widget': 'image-uploader',
              },
            },
          },
        }
      })
    }

    return {
      title: 'editor.categoriesHighlights.title',
      description: 'editor.categoriesHighlights.description',
      type: 'object',
      properties: {
        showCategoriesHighlights: {
          type: 'boolean',
          title: 'editor.categoriesHighlights.showCategoriesHighlights',
          default: false,
          isLayout: true,
        },
        quantityOfItems: {
          type: 'number',
          title: 'editor.categoriesHighlights.quantityOfItems',
          enum: [2, 4],
          default: 2,
          widget: {
            'ui:widget': 'radio',
            'ui:options': {
              inline: true,
            },
          },
          isLayout: true,
        },
        categories: {
          type: 'object',
          title: 'editor.categoriesHighlights.categories',
          properties: categoriesProps,
          isLayout: false,
        },
      },
    }
  }

  render() {
    const { categories, showCategoriesHighlights } = this.props

    if (!showCategoriesHighlights) return null

    return (
      <div className="vtex-categories-highlights relative">
        <div className="flex flex-row flex-wrap items-center justify-center">
          {values(categories).map((category, index) => (
            <div
              className="vtex-categories-highlights__category-card-container"
              key={index}>
              <CategoryCard {...category} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default CategoriesHighlights
