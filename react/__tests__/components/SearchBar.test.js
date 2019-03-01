import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { render } from 'intl-helper'
import { createClientMock } from '../../testUtils/mockProvider'

import SearchBar from '../../SearchBar'

describe('<SearchBar />', () => {
  const mockedResult = {
    data: {
      loading: false,
      autocomplete: {
        itemsReturned: [{ thumb: 'thumb', name: 'name', href: 'href' }],
      },
    },
  }

  const renderComponent = (customProps = {}) => {
    const client = createClientMock(mockedResult)
    return render(
      <MockedProvider client={client}>
        <SearchBar />
      </MockedProvider>
    )
  }

  it('should be able to mount and not break', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toBeTruthy()
  })

  it('should match snapshot', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})
