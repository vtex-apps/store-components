import React from 'react'
import { render } from '@vtex/test-tools/react'

import AvailabilitySubscriber from '../../AvailabilitySubscriber'
import { messages } from '../../__mocks__/messages'

describe('<AvailabilitySubscriber />', () => {
  function renderComponent(customProps = {}) {
    const props = {
      skuId: '111111',
      available: false,
      ...customProps,
    }

    return render(<AvailabilitySubscriber {...props} />, {
      graphql: { mocks: [] },
      messages,
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
})
