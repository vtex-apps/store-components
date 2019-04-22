import * as React from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'
import { FormattedMessage } from 'react-intl'

import { BuyButton } from './index';

export default props => {
  const valuesFromContext = React.useContext(ProductContext)

  const buyButtonProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) return props

    const { product, selectedItem, selectedQuantity } = valuesFromContext

    const sellerId = path(['sellers', 0, 'sellerId'], selectedItem)
    const commertialOffer = path(['sellers', 0, 'commertialOffer'], selectedItem)

    const showBuyButton =
      Number.isNaN(+path(['AvailableQuantity'], commertialOffer)) ||
      path(['AvailableQuantity'], commertialOffer) > 0

    return {
      skuItems: selectedItem && sellerId && [
        {
          skuId: selectedItem.itemId,
          quantity: selectedQuantity,
          seller: sellerId,
          name: selectedItem.nameComplete,
          price: commertialOffer.Price,
          variant: selectedItem.name,
          brand: product.brand,
          index: 0,
          detailUrl: `/${product.linkText}/p`,
          imageUrl: path(['images', '0', 'imageUrl'], selectedItem),
          listPrice: path(['sellers', '0', 'commertialOffer', 'ListPrice'], selectedItem),
        },
      ],
      large: true,
      available: showBuyButton,
    }
  }

  return (
    <BuyButton { ...buyButtonProps() }>
      <FormattedMessage id="buy-button.add-to-cart" />
    </BuyButton>
  )
}