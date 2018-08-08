import './global.css'

import PropTypes from 'prop-types'
import { range, values } from 'ramda'
import React, { Component } from 'react'

import CategoryCard from './components/CategoryCard'
import { ITEMS_PER_ROW, RECTANGULAR, SQUARED } from './constants.js'

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
    /** Shape of the box which wrapes each category (it should be 'squared' or 'rectangular')  */
    boxShape: PropTypes.oneOf([SQUARED, RECTANGULAR]).isRequired,
  }

  static defaultProps = {
    categories: {},
    showCategoriesHighlights: false,
    quantityOfItems: ITEMS_PER_ROW,
    boxShape: SQUARED,
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

    range(0, quantityOfItems || ITEMS_PER_ROW).forEach(index => {
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
        boxShape: {
          type: 'string',
          title: 'editor.categoriesHighlights.boxShape',
          enum: [SQUARED, RECTANGULAR],
          enumNames: [
            'editor.categoriesHighlights.boxShape.squared',
            'editor.categoriesHighlights.boxShape.rectangular',
          ],
          default: SQUARED,
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
      boxShape,
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
      <div className={`vtex-categories-highlights-${boxShape} relative`}>
        <div className="flex flex-row flex-wrap items-center justify-center">
          {range(0, quantityOfItems / ITEMS_PER_ROW).map(indexRow => (
            <div className="flex flex-row flex-wrap items-center justify-center">
              {range(0, ITEMS_PER_ROW).map(indexCol => (
                <div
                  className={`vtex-categories-highlights__category-${boxShape}-card`}
                  key={2 * indexRow + indexCol}>
                  <CategoryCard
                    shape={boxShape}
                    {...categories[2 * indexRow + indexCol]}
                  />
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
