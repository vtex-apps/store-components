import React from 'react'

const mockOrderForm = {
  orderForm: {
    orderFormId: '123',
  },
  addItem: () => {},
  refetch: () => {},
}

export function orderFormConsumer(Comp) {
  return class extends React.Component {
    render() {
      return <Comp {...this.props} orderFormContext={mockOrderForm} />
    }
  }
}
