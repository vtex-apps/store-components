import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { mount } from 'enzyme'
import { IntlProvider } from 'react-intl'

import autocomplete from '../../components/SearchBar/queries/autocomplete.gql'
import SearchBar from '../../SearchBar'

describe('<SearchBar />', () => {
  let wrapper

  beforeEach(done => {
    wrapper = mount(
      <MockedProvider
        mocks={[
          {
            request: {
              query: autocomplete,
              variables: {
                maxRows: 2,
                searchTerm: 'shirt',
              },
            },
            result: {
              data: {
                loading: false,
                autocomplete: {
                  itemsReturned: [
                    { thumb: 'thumb', name: 'name', href: 'href' },
                  ],
                },
              },
            },
          },
        ]}
      >
        <IntlProvider
          messages={{
            'search.placeholder': 'Search here',
            'search.noMatches': 'Nothing was found',
          }}
          locale="en"
        >
          <SearchBar />
        </IntlProvider>
      </MockedProvider>
    )

    process.nextTick(() => {
      wrapper.update()
      done()
      return wrapper
    })
  })

  it('should be able to mount and not break', () => {
    expect(wrapper).toBeTruthy()
  }, 10000)

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
