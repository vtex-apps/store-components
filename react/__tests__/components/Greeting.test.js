import React from 'react'
import { render } from 'intl-helper'

import Greeting from '../../Greeting'

describe('<Greeting /> component', () => {
  const renderComponent = customProps => {
    const props = {
      ...customProps,
      orderFormContext: {
        orderForm: { clientProfileData: { firstName: 'name' } },
      },
    }

    const comp = <Greeting {...props} />

    return render(comp)
  }

  it('should be rendered', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toBeTruthy()
  })

  it('should match snapshot without loading', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    const { asFragment } = renderComponent({ loading: true })
    expect(asFragment()).toMatchSnapshot()
  })
})
