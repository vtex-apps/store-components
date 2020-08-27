import React from 'react'
import { render } from '@vtex/test-tools/react'

import Animation from '../../Animation'

describe('<Animation /> component', () => {
  const renderComponent = (customProps: any) => {
    const comp = <Animation {...customProps}> Test </Animation>

    return render(comp)
  }

  it('should be rendered', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const { asFragment } = renderComponent()

    expect(asFragment()).toBeTruthy()
  })

  it('should match snapshot animation left', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot animation right', () => {
    const { asFragment } = renderComponent({ type: 'drawerRight' })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot animation top', () => {
    const { asFragment } = renderComponent({ type: 'drawerTop' })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot animation bottom', () => {
    const { asFragment } = renderComponent({ type: 'drawerBottom' })

    expect(asFragment()).toMatchSnapshot()
  })
})
