import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { isEmpty, propOr } from 'ramda'

import ProductHighlights from './index'

const ProductHighlightsWrapper = (props: any) => {
  const { conditional } = props

  const valuesFromContext = useContext(ProductContext)

  const getHighlights = () => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'product' does not exist on type 'unknown... Remove this comment to see the full error message
    const { product } = valuesFromContext

    const choose = propOr('', 'highlight', conditional)

    if (choose === 'admin/editor.product-details.highlights.chooseDefault') {
      const typeHighlight = propOr('', 'typeHighlight', conditional)
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      const highlightName = typeHighlight.trim()
      const names = highlightName.split(',')
      const specificationGroups = propOr([], 'specificationGroups', product)

      return names.reduce((acc: any, item: any) => {
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        const [highlightSpecificationGroup] = specificationGroups.filter(
          (x: any) => x.name.toLowerCase() === item.trim().toLowerCase()
        )

        const highlight = propOr(
          [],
          'specifications',
          highlightSpecificationGroup
        )

        return acc.concat(highlight)
      }, [])
    }

    if (
      choose ===
      'admin/editor.product-details.highlights.chooseDefaultSpecification'
    ) {
      const typeSpecifications = propOr('', 'typeSpecifications', conditional)
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      const specificationNames = typeSpecifications.trim().split(',')
      const allSpecifications = propOr([], 'properties', product)

      return specificationNames.reduce((acc: any, item: any) => {
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        const highlight = allSpecifications.filter(
          (x: any) => x.name.toLowerCase() === item.trim().toLowerCase()
        )

        return acc.concat(highlight)
      }, [])
    }

    if (
      choose === 'admin/editor.product-details.highlights.allSpecifications'
    ) {
      return propOr([], 'properties', product)
    }
  }

  const productHighlightsProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) {
      return props
    }

    return {
      ...props,
      highlights: props.highlights || getHighlights(),
    }
  }

  return <ProductHighlights {...productHighlightsProps()} />
}

ProductHighlightsWrapper.schema = {
  // @TODO review title and description
  title: 'admin/editor.product-details.title',
  description: 'admin/editor.product-details.description',
  type: 'object',
  definitions: {
    highlightGroupDefault: {
      title: 'highlightGroupDefault',
      type: 'object',
      properties: {
        highlight: {
          title: 'admin/editor.product-details.highlights.default',
          type: 'string',
          enum: [
            'admin/editor.product-details.highlights.allSpecifications',
            'admin/editor.product-details.highlights.chooseDefault',
            'admin/editor.product-details.highlights.chooseDefaultSpecification',
          ],
          default: 'admin/editor.product-details.highlights.allSpecifications',
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
                    'admin/editor.product-details.highlights.allSpecifications',
                  ],
                },
              },
            },
            {
              properties: {
                highlight: {
                  enum: [
                    'admin/editor.product-details.highlights.chooseDefault',
                  ],
                },
                typeHighlight: {
                  type: 'string',
                  title: 'admin/editor.product-details.highlights.title',
                },
              },
              required: [''],
            },
            {
              properties: {
                highlight: {
                  enum: [
                    'admin/editor.product-details.highlights.chooseDefaultSpecification',
                  ],
                },
                typeSpecifications: {
                  type: 'string',
                  title:
                    'admin/editor.product-details.highlights.typeSpecifications.title',
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
      title: 'admin/editor.product-details.showHighlight.title',
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
