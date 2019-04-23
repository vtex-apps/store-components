import * as React from 'react'
import { ProductContext } from 'vtex.product-context'
import { path, isEmpty } from 'ramda'

import AvailabilitySubscriber from './index';

export default (props) => {
  const valuesFromContext = React.useContext(ProductContext)

  const availabilitySuvscriberProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) return props
    
    const { selectedItem } = valuesFromContext

    return {
      skuId: path(['itemId'], selectedItem),
    }
  }

  return (
    <AvailabilitySubscriber { ...availabilitySuvscriberProps() } />
  )
}
