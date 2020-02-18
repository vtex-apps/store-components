import React from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { isEmpty, propOr, propEq } from 'ramda'
import { defineMessages } from 'react-intl'

import ProductSpecifications from './index'

const messages = defineMessages({
  editorProductSpecificationsTitle: {
    id: 'admin/editor.product-specifications.title',
    from: 'vtex.admin-messages',
  },
  editorProductSpecificationsItemsTitle: {
    id: 'admin/editor.product-specifications.items.title',
    from: 'vtex.admin-messages',
  },
  editorProductSpecificationsHiddenSpecificationsDescription: {
    id: 'admin/editor.product-specifications.hidden-specifications.description',
    from: 'vtex.admin-messages',
  },
  editorProductSpecificationsHiddenSpecificationsTitle: {
    id: 'admin/editor.product-specifications.hidden-specifications.title',
    from: 'vtex.admin-messages',
  },
  editorProductSpecificationsVisibleSpecificationsDescription: {
    id:
      'admin/editor.product-specifications.visible-specifications.description',
    from: 'vtex.admin-messages',
  },
  editorProductSpecificationsVisibleSpecificationsTitle: {
    id: 'admin/editor.product-specifications.visible-specifications.title',
    from: 'vtex.admin-messages',
  },
})

const getSpecifications = productContext => {
  if (!productContext || isEmpty(productContext)) {
    return []
  }
  const { product } = productContext
  const specificationGroups = propOr([], 'specificationGroups', product)
  const groupWithAll = specificationGroups.find(
    propEq('name', 'allSpecifications')
  )
  const allSpecifications = groupWithAll ? groupWithAll.specifications : []
  return allSpecifications
}

const ProductSpecificationsWrapper = ({
  hiddenSpecifications,
  visibleSpecifications,
  specifications: propsSpecifications,
  tabsMode, // This is a legacy prop passed by product-details
  showSpecificationsTab = false,
  collapsible = 'always',
}) => {
  const productContext = useProduct()
  const specifications = propsSpecifications || getSpecifications(productContext)

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
    title: messages.editorProductSpecificationsTitle.id,
    description: '',
    type: 'object',
    properties: {
      hiddenSpecifications: {
        items: {
          default: '',
          type: 'string',
          title: messages.editorProductSpecificationsItemsTitle.id,
        },
        description:
          messages.editorProductSpecificationsHiddenSpecificationsDescription
            .id,
        title: messages.editorProductSpecificationsHiddenSpecificationsTitle.id,
        type: 'array',
      },
      visibleSpecifications: {
        items: {
          default: '',
          type: 'string',
          title: messages.editorProductSpecificationsItemsTitle.id,
        },
        description:
          messages.editorProductSpecificationsVisibleSpecificationsDescription
            .id,
        title:
          messages.editorProductSpecificationsVisibleSpecificationsTitle.id,
        type: 'array',
      },
    },
  }
}

export default ProductSpecificationsWrapper
