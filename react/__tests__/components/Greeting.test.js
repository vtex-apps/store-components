import React from 'react'

import Greeting from '../../Greeting'
import { renderWithIntl } from '../../__helpers__/intl-helper'

describe('<Container /> component', () => {
  const renderComponent = customProps => {
    const props = {
      ...customProps,
      orderFormContext: {
        orderForm: { clientProfileData: { firstName: 'name' } },
      },
    }

    const comp = <Greeting {...props} />

    return renderWithIntl(comp)
  }

  it('should be rendered', () => {
    const wrapper = renderComponent()
    expect(wrapper).toBeTruthy()
  })

  it('should match snapshot without loading', () => {
    const wrapper = renderComponent()
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    const wrapper = renderComponent({ loading: true })
    expect(wrapper).toMatchSnapshot()
  })
})
