import React from 'react'
import { render, wait } from '@vtex/test-tools/react'

import orderFormQuery from '../../components/Greeting/queries/orderForm.gql'
import Greeting from '../../Greeting'

const mocks = [
  {
    request: {
      query: orderFormQuery,
    },
    result: {
      data: {
        minicart: {
          orderForm: '{ "clientProfileData": { "firstName": "Adam" } }',
        },
      },
    },
  },
]

describe('<Greeting /> component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  const renderComponent = customProps => {
    const props = {
      ...customProps,
    }

    return render(<Greeting {...props} />, { graphql: { mocks } })
  }

  it('should render name in orderForm', async () => {
    const { queryByText } = renderComponent()

    await wait(() => {
      jest.runAllTimers()
    })

    expect(queryByText('Adam')).not.toBeFalsy()
  })

  // eslint-disable-next-line jest/no-identical-title
  it('should render name in orderForm', async () => {
    const { queryByTestId } = renderComponent({ loading: true })

    await wait(() => {
      jest.runAllTimers()
    })

    expect(queryByTestId('greeting-loader')).not.toBeFalsy()
  })
})
