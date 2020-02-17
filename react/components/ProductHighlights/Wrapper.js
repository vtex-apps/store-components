import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { isEmpty, propOr } from 'ramda'
import { defineMessages } from 'react-intl'

import ProductHighlights from './index'

const messages = defineMessages({
  editorProductdetailsTitle: {
    id: 'admin/editor.product-details.title',
    from: 'vtex.admin-messages',
  },
  editorProductdetailsDescription: {
    id: 'admin/editor.product-details.description',
    from: 'vtex.admin-messages',
  },
  editorProductdetailsHighlightsDefault: {
    id: 'admin/editor.product-details.highlights.default',
    from: 'vtex.admin-messages',
  },
  editorProductdetailsHighlightsAllspecifications: {
    id: 'admin/editor.product-details.highlights.allSpecifications',
    from: 'vtex.admin-messages',
  },
  editorProductdetailsHighlightsChoosedefault: {
    id: 'admin/editor.product-details.highlights.chooseDefault',
    from: 'vtex.admin-messages',
  },
  editorProductdetailsHighlightsChoosedefaultspecification: {
    id: 'admin/editor.product-details.highlights.chooseDefaultSpecification',
    from: 'vtex.admin-messages',
  },
  editorProductdetailsHighlightsTitle: {
    id: 'admin/editor.product-details.highlights.title',
    from: 'vtex.admin-messages',
  },
  editorProductdetailsHighlightsTypespecificationsTitle: {
    id: 'admin/editor.product-details.highlights.typeSpecifications.title',
    from: 'vtex.admin-messages',
  },
  editorProductdetailsShowhighlightTitle: {
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

    if (choose === messages.editorProductdetailsHighlightsChoosedefault.id) {
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
      messages.editorProductdetailsHighlightsChoosedefaultspecification.id
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
      choose === messages.editorProductdetailsHighlightsAllspecifications.id
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
  title: messages.editorProductdetailsTitle.id,
  description: messages.editorProductdetailsDescription.id,
  type: 'object',
  definitions: {
    highlightGroupDefault: {
      title: 'highlightGroupDefault',
      type: 'object',
      properties: {
        highlight: {
          title: messages.editorProductdetailsHighlightsDefault.id,
          type: 'string',
          enum: [
            messages.editorProductdetailsHighlightsAllspecifications.id,
            messages.editorProductdetailsHighlightsChoosedefault.id,
            messages.editorProductdetailsHighlightsChoosedefaultspecification
              .id,
          ],
          default: messages.editorProductdetailsHighlightsAllspecifications.id,
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
                    messages.editorProductdetailsHighlightsAllspecifications.id,
                  ],
                },
              },
            },
            {
              properties: {
                highlight: {
                  enum: [
                    messages.editorProductdetailsHighlightsChoosedefault.id,
                  ],
                },
                typeHighlight: {
                  type: 'string',
                  title: messages.editorProductdetailsHighlightsTitle.id,
                },
              },
              required: [''],
            },
            {
              properties: {
                highlight: {
                  enum: [
                    messages
                      .editorProductdetailsHighlightsChoosedefaultspecification
                      .id,
                  ],
                },
                typeSpecifications: {
                  type: 'string',
                  title:
                    messages
                      .editorProductdetailsHighlightsTypespecificationsTitle.id,
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
      title: messages.editorProductdetailsShowhighlightTitle.id,
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
