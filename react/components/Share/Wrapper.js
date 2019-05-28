import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'
import { injectIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import Share from './index'

const ShareWrapper = props => {
  const { intl, social } = props

  const valuesFromContext = useContext(ProductContext)
  const { account } = useRuntime()

  const shareProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) {
      return props
    }

    const { selectedItem, product } = valuesFromContext

    return {
      social,
      shareLabelClass: 'c-muted-2 t-small mb3',
      className: 'db',
      productImageUrl: path(['items', 0, 'images', 0, 'imageUrl'], product),
      loading: !path(['name'], selectedItem),
      title: intl.formatMessage(
        { id: 'share.title' },
        {
          product: path(['productName'], product),
          sku: path(['name'], selectedItem),
          store: account,
        }
      ),
    }
  }

  return <Share {...shareProps()} />
}

ShareWrapper.schema = Share.schema

export default injectIntl(ShareWrapper)
