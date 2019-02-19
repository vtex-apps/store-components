import React from 'react'

import Animation from '../../Animation'
import { renderWithIntl } from '../../__helpers__/intl-helper'

describe('<Animation /> component', () => {
  let wrapper

  const renderComponent = customProps => {
    const comp = <Animation {...customProps}> Test </Animation>

    return renderWithIntl(comp)
  }

  beforeEach(() => {
    wrapper = renderComponent()
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper).toBeTruthy()
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
