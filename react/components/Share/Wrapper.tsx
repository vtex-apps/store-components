import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'
import { injectIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import Share from './index'

const ShareWrapper = (props: any) => {
  const { intl } = props

  const valuesFromContext = useContext(ProductContext)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'account' does not exist on type 'Runtime... Remove this comment to see the full error message
  const { account } = useRuntime()

  const shareProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) {
      return props
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedItem' does not exist on type 'un... Remove this comment to see the full error message
    const { selectedItem, product } = valuesFromContext

    const title = intl.formatMessage(
      { id: 'store/share.title' },
      {
        product: path(['productName'], product),
        sku: path(['name'], selectedItem),
        store: account,
      }
    )

    return {
      ...props,
      shareLabelClass: props.shareLabelClass || 'c-muted-2 t-small mb3',
      className: props.className || 'db',
      imageUrl:
        props.imageUrl || path(['items', 0, 'images', 0, 'imageUrl'], product),
      loading:
        props.loading != null ? props.loading : !path(['name'], selectedItem),
      title: props.title || title,
    }
  }

  return <Share {...shareProps()} />
}

ShareWrapper.schema = Share.schema

export default injectIntl(ShareWrapper)
