import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { isEmpty, propOr } from 'ramda'
import { defineMessages } from 'react-intl'

import ProductHighlights from './index'

const messages = defineMessages({
  editorProductDetailsTitle: {
    id: 'admin/editor.product-details.title',
    from: 'vtex.admin-messages',
  },
  editorProductDetailsDescription: {
    id: 'admin/editor.product-details.description',
    from: 'vtex.admin-messages',
  },
  editorProductDetailsHighlightsDefault: {
    id: 'admin/editor.product-details.highlights.default',
    from: 'vtex.admin-messages',
  },
  editorProductDetailsHighlightsAllSpecifications: {
    id: 'admin/editor.product-details.highlights.allSpecifications',
    from: 'vtex.admin-messages',
  },
  editorProductDetailsHighlightsChooseDefault: {
    id: 'admin/editor.product-details.highlights.chooseDefault',
    from: 'vtex.admin-messages',
  },
  editorProductDetailsHighlightsChooseDefaultSpecification: {
    id: 'admin/editor.product-details.highlights.chooseDefaultSpecification',
    from: 'vtex.admin-messages',
  },
  editorProductDetailsHighlightsTitle: {
    id: 'admin/editor.product-details.highlights.title',
    from: 'vtex.admin-messages',
  },
  editorProductDetailsHighlightsTypeSpecificationsTitle: {
    id: 'admin/editor.product-details.highlights.typeSpecifications.title',
    from: 'vtex.admin-messages',
  },
  editorProductDetailsShowhighlightTitle: {
    id: 'admin/editor.product-details.showHighlight.title',
    from: 'vtex.admin-messages',
  },
})

const ProductHighlightsWrapper = props => {
  const { conditional } = props

  const valuesFromContext = useContext(ProductContext)

  const getHighlights = () => {
    const { product } = valuesFromContext

    const choose = propOr('', 'highlight', conditional)

    if (choose === messages.editorProductDetailsHighlightsChooseDefault.id) {
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

    if (
      choose ===
      messages.editorProductDetailsHighlightsChooseDefaultSpecification.id
    ) {
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

    if (
      choose === messages.editorProductDetailsHighlightsAllSpecifications.id
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
  title: messages.editorProductDetailsTitle.id,
  description: messages.editorProductDetailsDescription.id,
  type: 'object',
  definitions: {
    highlightGroupDefault: {
      title: 'highlightGroupDefault',
      type: 'object',
      properties: {
        highlight: {
          title: messages.editorProductDetailsHighlightsDefault.id,
          type: 'string',
          enum: [
            messages.editorProductDetailsHighlightsAllSpecifications.id,
            messages.editorProductDetailsHighlightsChooseDefault.id,
            messages.editorProductDetailsHighlightsChooseDefaultSpecification
              .id,
          ],
          default: messages.editorProductDetailsHighlightsAllSpecifications.id,
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
                    messages.editorProductDetailsHighlightsAllSpecifications.id,
                  ],
                },
              },
            },
            {
              properties: {
                highlight: {
                  enum: [
                    messages.editorProductDetailsHighlightsChooseDefault.id,
                  ],
                },
                typeHighlight: {
                  type: 'string',
                  title: messages.editorProductDetailsHighlightsTitle.id,
                },
              },
              required: [''],
            },
            {
              properties: {
                highlight: {
                  enum: [
                    messages
                      .editorProductDetailsHighlightsChooseDefaultSpecification
                      .id,
                  ],
                },
                typeSpecifications: {
                  type: 'string',
                  title:
                    messages
                      .editorProductDetailsHighlightsTypeSpecificationsTitle.id,
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
      title: messages.editorProductDetailsShowhighlightTitle.id,
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
