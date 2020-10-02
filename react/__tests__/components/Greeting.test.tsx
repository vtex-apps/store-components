import React from 'react'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../node_modules/@vtex/test-tools/react... Remove this comment to see the full error message
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

  const renderComponent = (customProps: any) => {
    const props = {
      ...customProps,
    }

    return render(<Greeting {...props} />, { graphql: { mocks } })
  }

  it('should render name in orderForm', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
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
