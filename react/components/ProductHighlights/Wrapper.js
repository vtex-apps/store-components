import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { isEmpty, propOr } from 'ramda'

import ProductHighlights from './index'

const ProductHighlightsWrapper = ({ conditional, ...props }) => {
  const valuesFromContext = useContext(ProductContext)

  const getHighlights = () => {
    const { product } = valuesFromContext

    const choose = propOr('', 'highlight', conditional)

    if (choose === 'editor.product-details.highlights.chooseDefault') {
      const typeHighlight = propOr('', 'typeHighlight', conditional)
      const highlightName = typeHighlight.trim()
      const names = highlightName.split(',')
      const specificationGroups = propOr([], 'specificationGroups', product)

      return names.reduce((acc, item) => {
        const highlightSpecificationGroup = specificationGroups.filter(
          x => x.name.toLowerCase() === item.trim().toLowerCase()
        )[0]
        const highlight = propOr(
          [],
          'specifications',
          highlightSpecificationGroup
        )
        return acc.concat(highlight)
      }, [])
    }

    if (choose === 'editor.product-details.highlights.chooseDefaultSpecification') {
      const typeSpecifications = propOr('', 'typeSpecifications', conditional)
      const specificationNames = typeSpecifications.trim().split(',')
      const allSpecifications = propOr([], 'properties', product)

      return specificationNames.reduce((acc, item) => {
        const highlight = allSpecifications.filter(
          x => x.name.toLowerCase() === item.trim().toLowerCase()
        )
        return acc.concat(highlight)
      }, [])
    }

    if (choose === 'editor.product-details.highlights.allSpecifications') {
      return propOr([], 'properties', product)
    }
  }

  const productHighlightsProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) return props

    return {
      highlights: getHighlights(),
    }
  }

  return (
    <ProductHighlights { ...productHighlightsProps() } />
  )
}

ProductHighlightsWrapper.schema = {
  // @TODO review title and description
  title: 'editor.product-details.title',
  description: 'editor.product-details.description',
  type: 'object',
  definitions: {
    highlightGroupDefault: {
      title: 'highlightGroupDefault',
      type: 'object',
      properties: {
        highlight: {
          title: 'editor.product-details.highlights.default',
          type: 'string',
          enum: [
            'editor.product-details.highlights.allSpecifications',
            'editor.product-details.highlights.chooseDefault',
            'editor.product-details.highlights.chooseDefaultSpecification',
          ],
          default: 'editor.product-details.highlights.allSpecifications',
        },
      },
      required: ['highlight'],
      dependencies: {
        highlight: {
          oneOf: [
            {
              properties: {
                highlight: {
                  enum: [
                    'editor.product-details.highlights.allSpecifications',
                  ],
                },
              },
            },
            {
              properties: {
                highlight: {
                  enum: ['editor.product-details.highlights.chooseDefault'],
                },
                typeHighlight: {
                  type: 'string',
                  title: 'editor.product-details.highlights.title',
                },
              },
              required: [''],
            },
            {
              properties: {
                highlight: {
                  enum: [
                    'editor.product-details.highlights.chooseDefaultSpecification',
                  ],
                },
                typeSpecifications: {
                  type: 'string',
                  title:
                    'editor.product-details.highlights.typeSpecifications.title',
                },
              },
              required: [''],
            },
          ],
        },
      },
    },
  },
  properties: {
    showHighlight: {
      type: 'boolean',
      title: 'editor.product-details.showHighlight.title',
      default: false,
      isLayout: false,
    },
    conditional: {
      title: 'Conditional',
      $ref: '#/definitions/highlightGroupDefault',
    },
  },
}

export default ProductHighlightsWrapper