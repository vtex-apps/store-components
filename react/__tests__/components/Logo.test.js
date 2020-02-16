import React from 'react'

import Logo from '../../Logo'
import { render } from '@vtex/test-tools/react'
import { messages } from '../../__mocks__/messages'

describe('<Logo /> component', () => {
  const renderComponent = customProps => {
    const props = {
      title: 'title',
      ...customProps,
    }
    const comp = <Logo {...props} />

    return render(comp, { messages })
  }

  it('should match snapshot with link', () => {
    const { asFragment } = renderComponent({ href: 'http://logotest.test' })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot without link', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with url', () => {
    const { asFragment } = renderComponent({ url: 'http://logourl.test' })
    expect(asFragment()).toMatchSnapshot()
  })
})
