import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { renderWithIntl } from 'intl-helper'
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
    return renderWithIntl(
      <MockedProvider client={client}>
        <SearchBar />
      </MockedProvider>
    )
  }

  it('should be able to mount and not break', () => {
    expect(renderComponent({ hasIconLeft: true })).toBeTruthy()
  })

  it('should match snapshot', () => {
    expect(renderComponent({ hasIconLeft: true })).toMatchSnapshot()
  })
})
