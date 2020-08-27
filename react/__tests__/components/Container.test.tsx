import React from 'react'
import { render } from '@vtex/test-tools/react'

import Container from '../../Container'

describe('<Container /> component', () => {
  const renderComponent = (customProps: any) => {
    const comp = <Container {...customProps}> Test </Container>

    return render(comp)
  }

  it('should be rendered', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const { asFragment } = renderComponent()

    expect(asFragment()).toBeTruthy()
  })

  it('should match snapshot', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })
})
