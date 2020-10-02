import React from 'react'
import { render } from '@vtex/test-tools/react'

import Logo from '../../Logo'

describe('<Logo /> component', () => {
  const renderComponent = (customProps: any) => {
    const props = {
      title: 'title',
      ...customProps,
    }

    const comp = <Logo {...props} />

    return render(comp)
  }

  it('should match snapshot with link', () => {
    const { asFragment } = renderComponent({ href: 'http://logotest.test' })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot without link', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with url', () => {
    const { asFragment } = renderComponent({ url: 'http://logourl.test' })

    expect(asFragment()).toMatchSnapshot()
  })
})
