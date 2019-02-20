import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { renderWithIntl } from 'intl-helper'

import AvailabilitySubscriber from '../../AvailabilitySubscriber'

describe('<AvailabilitySubscriber />', () => {
  function renderComponent(customProps = {}) {
    const props = {
      skuId: '111111',
      ...customProps,
    }
    const component = (
      <MockedProvider mocks={[]}>
        <AvailabilitySubscriber {...props} />
      </MockedProvider>
    )

    return renderWithIntl(component)
  }

  it('should be able to mount and not break', () => {
    expect(renderComponent()).toBeTruthy()
  })

  it('should match snapshot', () => {
    expect(renderComponent()).toMatchSnapshot()
  })
})
