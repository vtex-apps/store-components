import './global.css'

import PropTypes from 'prop-types'
import { range, values } from 'ramda'
import React, { Component } from 'react'

import CategoryCard from './components/CategoryCard'

const ITENS_PER_ROW = 2

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

  static getSchema = ({ quantityOfItems }) => {
    let categoriesHightlightsProps = {}

    range(0, quantityOfItems).forEach(index => {
      categoriesHightlightsProps[`category${index}`] = {
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
        categoriesHightlights: {
          type: 'object',
          title: 'editor.categoriesHighlights.categoriesHightlights',
          properties: categoriesHightlightsProps,
          isLayout: false,
        },
      },
    }
  }

  render() {
    const {
      categoriesHightlights,
      showCategoriesHighlights,
      quantityOfItems,
    } = this.props

    if (!showCategoriesHighlights) return null

    let categories = values(categoriesHightlights).map(category => category)
    range(categories.length, quantityOfItems).forEach(() => {
      categories.push({
        name: '',
        image: '',
      })
    })

    return (
      <div className="vtex-categories-highlights relative">
        <div className="flex flex-row flex-wrap items-center justify-center">
          {range(0, quantityOfItems / ITENS_PER_ROW).map(indexRow => (
            <div className="flex flex-row items-center justify-center">
              {range(0, ITENS_PER_ROW).map(indexCol => (
                <div
                  className="vtex-categories-highlights__category-card-container"
                  key={2 * indexRow + indexCol}>
                  <CategoryCard {...categories[2 * indexRow + indexCol]} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default CategoriesHighlights
