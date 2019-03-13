import { InMemoryCache } from 'apollo-cache-inmemory'
import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { render } from '@vtex/test-tools/react'

import Greeting from '../../Greeting'

describe('<Greeting /> component', () => {
  const data = {
    minicart: {
      __typename: 'Minicart',
      orderForm: {
        __typename: 'OrderFormClient',
        clientProfileData: {
          __typename: 'ClientProfileData',
          firstName: 'name',
        },
      },
    },
  }
  const cache = new InMemoryCache()
  cache.writeData({ data })

  const renderComponent = customProps => {
    const props = {
      ...customProps,
    }

    const comp = (
      <MockedProvider cache={cache} resolvers={{}}>
        <Greeting {...props} />
      </MockedProvider>
    )

    return render(comp)
  }

  it('should be rendered', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toBeTruthy()
  })

  it('should match snapshot without loading', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    const { asFragment } = renderComponent({ loading: true })
    expect(asFragment()).toMatchSnapshot()
  })
})
