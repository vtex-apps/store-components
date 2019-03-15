import React from 'react'
import PropTypes from 'prop-types'

import OrderForm from 'orderForm'

export const contextPropTypes = PropTypes.any

export const orderFormConsumer = Comp => {
  const extraProps = {
    orderFormContext: {
      orderForm: OrderForm,
      refetch: () => {},
      updateOrderForm: () => {},
      updateOrderFormProfile: () => {},
      updateAndRefetchOrderForm: () => {},
      updateToastMessage: () => {},
      updateOrderFormShipping: () => {},
      loading: false,
      message: {
        isSuccess: true,
        message: 'some message',
      },
      addItem: () =>
        new Promise(resolve => {
          resolve({ data: { addItem: { items: OrderForm.items } } })
        }),
    },
  }
  return function WrappedOrderFormConsumer(props) {
    return <Comp {...props} {...extraProps} />
  }
}
