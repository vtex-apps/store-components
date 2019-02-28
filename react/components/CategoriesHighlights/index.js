import categoriesHighlights from './categoriesHighlights.css'

import PropTypes from 'prop-types'
import { range, values } from 'ramda'
import React, { Component } from 'react'

import CategoryCard from './components/CategoryCard'
import { ITEMS_PER_ROW, RECTANGULAR, SQUARED } from './constants.js'
import { defineMessages } from 'react-intl'

const messages = defineMessages({
  title: {
    id: 'editor.categoriesHighlighted.title',
    defaultMessage: '', 
  },
  description: {
    id: 'editor.categoriesHighlighted.description',
    defaultMessage: '', 
  },
  showCategoriesHighlighted: {
    id: 'editor.categoriesHighlighted.showCategoriesHighlighted',
    defaultMessage: '', 
  },
  quantityOfItems: {
    id: 'editor.categoriesHighlighted.quantityOfItems',
    defaultMessage: '', 
  },
  cardShape: {
    id: 'editor.categoriesHighlighted.cardShape',
    defaultMessage: '', 
  },
  cardShapeSquared: {
    id: 'editor.categoriesHighlighted.cardShape.squared',
    defaultMessage: '', 
  },
  cardShapeRectangular: {
    id: 'editor.categoriesHighlighted.cardShape.rectangular',
    defaultMessage: '',
  },
  categoriesHighlighted: {
    id: 'editor.categoriesHighlighted.categoriesHighlighted',
    defaultMessage: '', 
  },
  category: {
    id: 'editor.categoriesHighlighted.category',
    defaultMessage: '', 
  },
  categoryName: {
    id: 'editor.categoriesHighlighted.item.categoryName',
    defaultMessage: '', 
  },
  categoryImage: {
    id: 'editor.categoriesHighlighted.item.categoryImage',
    defaultMessage: '',
  },
})

/**
 * CategoriesHighlights is a component responsible to display the
 * Categories highlighted in a department.
 */
class CategoriesHighlights extends Component {
  static propTypes = {
    /** Categories highlighted in the department */
    categoriesHighlighted: PropTypes.object,
    /** Flag which indicates if the categories highlighted should be displayed or not */
    showCategoriesHighlights: PropTypes.bool,
    /** Number of categories highlighted to be displayed (it should be 2 or 4) */
    quantityOfItems: PropTypes.number.isRequired,
    /** Shape of the card box which wraps each category (it should be 'squared' or 'rectangular')  */
    cardShape: PropTypes.oneOf([SQUARED, RECTANGULAR]).isRequired,
  }

  static defaultProps = {
    categoriesHighlighted: {},
    showCategoriesHighlighted: false,
    quantityOfItems: ITEMS_PER_ROW,
    cardShape: SQUARED,
  }

  static uiSchema = {
    categoriesHighlighted: {
      items: {
        image: {
          'ui:widget': 'image-uploader',
        },
      },
    },
  }

  static getSchema = ({ quantityOfItems }) => {
    let categoriesHighlightedProps = {}

    range(0, quantityOfItems || ITEMS_PER_ROW).forEach(index => {
      categoriesHighlightedProps[`category${index}`] = {
        type: 'object',
        title: messages.category,
        properties: {
          name: {
            type: 'string',
            default: '',
            title: messages.categoryName,
          },
          image: {
            type: 'string',
            title: messages.categoryImage,
            default: '',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
        },
      }
    })

    return {
      title: messages.title,
      description: messages.description,
      type: 'object',
      properties: {
        showCategoriesHighlighted: {
          type: 'boolean',
          title: messages.showCategoriesHighlighted,
          default: false,
          isLayout: true,
        },
        quantityOfItems: {
          type: 'number',
          title: messages.quantityOfItems,
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
        cardShape: {
          type: 'string',
          title: messages.cardShape,
          enum: [SQUARED, RECTANGULAR],
          enumNames: [
            messages.cardShapeSquared,
            messages.cardShapeRectangular,
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
        categoriesHighlighted: {
          type: 'object',
          title: messages.categoriesHighlighted,
          properties: categoriesHighlightedProps,
          isLayout: false,
        },
      },
    }
  }

  render() {
    const {
      categoriesHighlighted,
      showCategoriesHighlighted,
      quantityOfItems,
      cardShape,
    } = this.props

    if (!showCategoriesHighlighted) return null

    let categories = values(categoriesHighlighted).map(category => category)
    range(categories.length, quantityOfItems).forEach(() => {
      categories.push({
        name: '',
        image: '',
      })
    })

    return (
      <div className={`${categoriesHighlights[`${cardShape}CategoriesHighlights`]} relative`}>
        <div className="flex flex-row flex-wrap items-center justify-center">
          {range(0, quantityOfItems / ITEMS_PER_ROW).map(indexRow => (
            <div
              key={`row${indexRow}`}
              className="flex flex-row flex-wrap items-center justify-center">
              {range(0, ITEMS_PER_ROW).map(indexCol => (
                <CategoryCard
                  key={2 * indexRow + indexCol}
                  shape={cardShape}
                  {...categories[2 * indexRow + indexCol]}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default CategoriesHighlights
