import React from 'react'
import { shallow } from 'enzyme'
import { MockedProvider } from 'react-apollo/test-utils'

import BuyButton from '../index'

import addToCartMutation from '../mutations/addToCartMutation.gql'

describe('<BuyButton />', () => {
  const mocks = [
    {
      request: {
        operationName: 'addToCartMutation',
        query: addToCartMutation,
        variables: { _id: '123' },
      },
    },
  ]

  const wrapper = shallow(
    <MockedProvider mocks={mocks}>
      <BuyButton />
    </MockedProvider>
  )

  it('should match snapshot', () => {
    expect(wrapper.container).toMatchSnapshot()
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
  })
})
