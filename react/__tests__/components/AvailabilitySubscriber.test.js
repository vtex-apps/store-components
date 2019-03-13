import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { render } from '@vtex/test-tools/react'

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

    return render(component)
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
