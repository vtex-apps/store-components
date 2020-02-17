import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path } from 'ramda'
import { defineMessages } from 'react-intl'

import ProductDescription from './index'

const messages = defineMessages({
  editorProductdescriptionTitle: {
    id: 'admin/editor.product-description.title',
    from: 'vtex.admin-messages',
  },
  editorProductdescriptionTitlepropTitle: {
    id: 'admin/editor.product-description.title-prop.title',
    from: 'vtex.admin-messages',
  },
})

const ProductDescriptionWrapper = props => {
  const valuesFromContext = useContext(ProductContext)
  const description =
    props.description != null
      ? props.description
      : path(['product', 'description'], valuesFromContext)

  return (
    <ProductDescription
      title={props.title}
      description={description}
      collapseContent={props.collapseContent}
    />
  )
}

ProductDescriptionWrapper.schema = {
  title: messages.editorProductdescriptionTitle.id,
}

ProductDescriptionWrapper.defaultProps = {
  collapseContent: true,
}

export default ProductDescriptionWrapper
