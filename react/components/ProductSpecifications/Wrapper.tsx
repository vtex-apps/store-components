import React from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { isEmpty, propOr } from 'ramda'

import ProductSpecifications from './index'

const getSpecifications = (productContext: any) => {
  if (!productContext || isEmpty(productContext)) {
    return []
  }

  const { product } = productContext
  const specificationGroups = propOr([], 'specificationGroups', product)
  // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
  const groupWithAll = specificationGroups.find(
    (specificationGroup: any) =>
      specificationGroup.originalName === 'allSpecifications' ||
      specificationGroup.name === 'allSpecifications'
  )

  const allSpecifications = groupWithAll ? groupWithAll.specifications : []

  return allSpecifications
}

const ProductSpecificationsWrapper = ({
  hiddenSpecifications,
  visibleSpecifications,
  specifications: propsSpecifications,

  // This is a legacy prop passed by product-details
  tabsMode,

  showSpecificationsTab = false,
  collapsible = 'always',
}: any) => {
  const productContext = useProduct()
  const specifications =
    propsSpecifications || getSpecifications(productContext)

  return (
    <ProductSpecifications
      hiddenSpecifications={hiddenSpecifications}
      visibleSpecifications={visibleSpecifications}
      tabsMode={tabsMode != null ? tabsMode : showSpecificationsTab}
      specifications={specifications}
      collapsible={collapsible}
    />
  )
}

ProductSpecificationsWrapper.getSchema = () => {
  return {
    title: 'admin/editor.product-specifications.title',
    description: '',
    type: 'object',
    properties: {
      hiddenSpecifications: {
        items: {
          default: '',
          type: 'string',
          title: 'admin/editor.product-specifications.items.title',
        },
        description:
          'admin/editor.product-specifications.hidden-specifications.description',
        title:
          'admin/editor.product-specifications.hidden-specifications.title',
        type: 'array',
      },
      visibleSpecifications: {
        items: {
          default: '',
          type: 'string',
          title: 'admin/editor.product-specifications.items.title',
        },
        description:
          'admin/editor.product-specifications.visible-specifications.description',
        title:
          'admin/editor.product-specifications.visible-specifications.title',
        type: 'array',
      },
    },
  }
}

export default ProductSpecificationsWrapper
