import { range, values } from 'ramda'
import React, { Component } from 'react'

import categoriesHighlights from './categoriesHighlights.css'
import CategoryCard from './components/CategoryCard'
import { ITEMS_PER_ROW, RECTANGULAR, SQUARED } from './constants'

type OwnProps = {
  categoriesHighlighted?: any
  showCategoriesHighlighted?: boolean
  quantityOfItems: number
  cardShape: any // TODO: PropTypes.oneOf([SQUARED, RECTANGULAR])
}

type Props = OwnProps & typeof CategoriesHighlights.defaultProps

/**
 * CategoriesHighlights is a component responsible to display the
 * Categories highlighted in a department.
 */
class CategoriesHighlights extends Component<Props> {
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

  static getSchema = ({ quantityOfItems }: any) => {
    const categoriesHighlightedProps = {}

    range(0, quantityOfItems || ITEMS_PER_ROW).forEach(index => {
      // @ts-expect-error ts-migrate(7053) FIXME: No index signature with a parameter of type 'strin... Remove this comment to see the full error message
      categoriesHighlightedProps[`category${index}`] = {
        type: 'object',
        title: 'admin/editor.categoriesHighlighted.category',
        properties: {
          name: {
            type: 'string',
            default: '',
            title: 'admin/editor.categoriesHighlighted.item.categoryName',
          },
          image: {
            type: 'string',
            title: 'admin/editor.categoriesHighlighted.item.categoryImage',
            default: '',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
        },
      }
    })

    return {
      title: 'admin/editor.categoriesHighlighted.title',
      description: 'admin/editor.categoriesHighlighted.description',
      type: 'object',
      properties: {
        showCategoriesHighlighted: {
          type: 'boolean',
          title: 'admin/editor.categoriesHighlighted.showCategoriesHighlighted',
          default: false,
          isLayout: true,
        },
        quantityOfItems: {
          type: 'number',
          title: 'admin/editor.categoriesHighlighted.quantityOfItems',
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
          title: 'admin/editor.categoriesHighlighted.cardShape',
          enum: [SQUARED, RECTANGULAR],
          enumNames: [
            'admin/editor.categoriesHighlighted.cardShape.squared',
            'admin/editor.categoriesHighlighted.cardShape.rectangular',
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
          title: 'admin/editor.categoriesHighlighted.categoriesHighlighted',
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

    const categories = values(categoriesHighlighted).map(category => category)

    range(categories.length, quantityOfItems).forEach(() => {
      categories.push({
        name: '',
        image: '',
      })
    })

    return (
      <div
        className={`${
          categoriesHighlights[`${cardShape}CategoriesHighlights`]
        } relative`}
      >
        <div className="flex flex-row flex-wrap items-center justify-center">
          {range(0, quantityOfItems / ITEMS_PER_ROW).map(indexRow => (
            <div
              key={`row${indexRow}`}
              className="flex flex-row flex-wrap items-center justify-center"
            >
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
