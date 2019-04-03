import { InMemoryCache } from 'apollo-cache-inmemory'
import React from 'react'
import { render } from '@vtex/test-tools/react'

import Greeting from '../../Greeting'

describe('<Greeting /> component', () => {
  const data = {
    minicart: {
      __typename: 'Minicart',
      orderForm: JSON.stringify({
        __typename: 'OrderFormClient',
        clientProfileData: {
          __typename: 'ClientProfileData',
          firstName: 'name',
        },
      }),
    },
  }

  const cache = new InMemoryCache()
  cache.writeData({ data })

  const renderComponent = customProps => {
    const props = {
      ...customProps,
    }

    return render(<Greeting {...props} />, { graphql: { cache: cache } })
  }

  it('should be rendered', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toBeTruthy()
  })

  it('should match snapshot without loading', () => {
    const { asFragment } = renderComponent()
    expect(asFragment({ loading: false })).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    const { asFragment } = renderComponent({ loading: true })
    expect(asFragment()).toMatchSnapshot()
  })
})
