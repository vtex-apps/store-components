import React from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { isEmpty, propOr } from 'ramda'

import ProductSpecifications from './index'

const getSpecifications = productContext => {
  if (!productContext || isEmpty(productContext)) {
    return []
  }

  const { product } = productContext
  const specificationGroups = propOr([], 'specificationGroups', product)
  const groupWithAll = specificationGroups.find(
    specificationGroup =>
      specificationGroup.originalName === 'allSpecifications' ||
      specificationGroup.name === 'allSpecifications'
  )

  const allSpecifications = groupWithAll ? groupWithAll.specifications : []

  return allSpecifications
}

/**
 * @deprecated This component is deprecated. Please use [vtex.product-specifications](https://github.com/vtex-apps/product-specifications) instead.
 */
function ProductSpecificationsWrapper({
  hiddenSpecifications,
  visibleSpecifications,
  specifications: propsSpecifications,
  tabsMode, // This is a legacy prop passed by product-details
  showSpecificationsTab = false,
  collapsible = 'always',
}) {
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

ProductSpecificationsWrapper.schema = {
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
      title: 'admin/editor.product-specifications.hidden-specifications.title',
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
      title: 'admin/editor.product-specifications.visible-specifications.title',
      type: 'array',
    },
  },
}

export default ProductSpecificationsWrapper
