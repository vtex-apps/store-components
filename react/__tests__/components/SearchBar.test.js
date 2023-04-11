import React from 'react'
import { render } from '@vtex/test-tools/react'

import SearchBar from '../../SearchBar'
import autocomplete from '../../graphql/autocomplete.gql'

jest.mock('vtex.pixel-manager', () => {
  return {
    usePixel: jest.fn(() => {
      return {
        push: jest.fn(() => {}),
      }
    }),
  }
})

describe('<SearchBar />', () => {
  const mockedResult = {
    request: {
      query: autocomplete,
    },
    result: {
      data: {
        loading: false,
        autocomplete: {
          itemsReturned: [{ thumb: 'thumb', name: 'name', href: 'href' }],
        },
      },
    },
  }

  const renderComponent = (customProps = {}) => {
    return render(<SearchBar {...customProps} />, {
      graphql: { mocks: [mockedResult] },
    })
  }

  it('should be able to mount and not break', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toBeTruthy()
  })

  it('should match snapshot', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should have CSS handle searchBarIcon', () => {
    const { container } = renderComponent()
    const element = container.querySelector('.searchBarIcon')

    expect(element).toBeTruthy()
  })

  it('should display internal search icon button', () => {
    const { container } = renderComponent({
      displayMode: 'search-button',
    })

    expect(container.querySelector('.searchBarIcon--search')).toBeTruthy()
  })

  it('should display internal clear icon button when a value is typed', () => {
    const { container } = renderComponent({
      displayMode: 'search-button',
      value: 'foo',
    })

    expect(container.querySelector('.searchBarIcon--search')).toBeTruthy()
  })

  it('should display external search icon button', () => {
    const { container } = renderComponent({
      displayMode: 'search-and-clear-buttons',
    })

    expect(
      container.querySelector('.searchBarIcon--external-search')
    ).toBeTruthy()
  })

  it('should display interal clear icon button when a value is typed', () => {
    const { container } = renderComponent({
      displayMode: 'search-and-clear-buttons',
      value: 'foo',
    })

    expect(container.querySelector('.searchBarIcon--clear')).toBeTruthy()
  })
})
