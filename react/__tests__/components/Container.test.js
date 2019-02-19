import React from 'react'

import Container from '../../Container'
import { render } from 'enzyme'

describe('<Container /> component', () => {
  const renderComponent = customProps => {
    const comp = <Container {...customProps}> Test </Container>

    return render(comp)
  }

  it('should be rendered', () => {
    const wrapper = renderComponent()
    expect(wrapper).toBeTruthy()
  })

  it('should match snapshot', () => {
    const wrapper = renderComponent()
    expect(wrapper).toMatchSnapshot()
  })
})
