import React from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { isEmpty, propOr, propEq } from 'ramda'
import { defineMessages } from 'react-intl'

import ProductSpecifications from './index'

const messages = defineMessages({
  editorProductspecificationsTitle: {
    id: 'admin/editor.product-specifications.title',
    from: 'vtex.admin-messages'
  },
  editorProductspecificationsItemsTitle: {
    id: 'admin/editor.product-specifications.items.title',
    from: 'vtex.admin-messages'
  },
  editorProductspecificationsHiddenspecificationsDescription: {
    id: 'admin/editor.product-specifications.hidden-specifications.description',
    from: 'vtex.admin-messages'
  },
  editorProductspecificationsHiddenspecificationsTitle: {
    id: 'admin/editor.product-specifications.hidden-specifications.title',
    from: 'vtex.admin-messages'
  },
  editorProductspecificationsVisiblespecificationsDescription: {
    id: 'admin/editor.product-specifications.visible-specifications.description',
    from: 'vtex.admin-messages'
  },
  editorProductspecificationsVisiblespecificationsTitle: {
    id: 'admin/editor.product-specifications.visible-specifications.title',
    from: 'vtex.admin-messages'
  }
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
    title: messages.editorProductspecificationsTitle.id,
    description: '',
    type: 'object',
    properties: {
      hiddenSpecifications: {
        items: {
          default: '',
          type: 'string',
          title: messages.editorProductspecificationsItemsTitle.id
        },
        description: messages.editorProductspecificationsHiddenspecificationsDescription.id,
        title: messages.editorProductspecificationsHiddenspecificationsTitle.id,
        type: 'array'
      },
      visibleSpecifications: {
        items: {
          default: '',
          type: 'string',
          title: messages.editorProductspecificationsItemsTitle.id
        },
        description: messages.editorProductspecificationsVisiblespecificationsDescription.id,
        title: messages.editorProductspecificationsVisiblespecificationsTitle.id,
        type: 'array'
      }
    }
  }
}

export default ProductSpecificationsWrapper
