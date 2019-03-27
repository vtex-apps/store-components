import React from 'react'
import orderForm from 'orderForm'

const mockOrderForm = {
  orderForm: {
    orderFormId: '123',
  },
  addItem: () => new Promise(resolve => resolve({ data: { addItem: [] } })),
  refetch: () => new Promise(resolve => resolve()),
}

export function orderFormConsumer(Comp) {
  return class extends React.Component {
    render() {
      return <Comp {...this.props} orderFormContext={mockOrderForm} />
    }
  }
}
