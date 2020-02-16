import React from 'react'

import Container from '../../Container'
import { render } from '@vtex/test-tools/react'
import { messages } from '../../__mocks__/messages'

describe('<Container /> component', () => {
  const renderComponent = customProps => {
    const comp = <Container {...customProps}> Test </Container>

    return render(comp, { messages })
  }

  it('should be rendered', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toBeTruthy()
  })

  it('should match snapshot', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})
