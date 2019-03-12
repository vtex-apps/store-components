import React from 'react'
import { orderFormProps } from '@types/vtex-io'

import OrderForm from 'orderForm'

export const contextPropTypes = orderFormProps

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
  return class extends React.Component {
    render() {
      return <Comp {...this.props} {...extraProps} />
    }
  }
}
