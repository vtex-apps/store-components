import React from 'react'
import { render } from '@vtex/test-tools/react'

import Title from './../../Title'

describe('<Title /> component', () => {
  const renderComponent = customProps => {
    const props = {
      content: 'title',
      ...customProps,
    }
    const comp = <Title {...props} />

    return render(comp)
  }

  it('should be rendered', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toBeTruthy()
  })

  it('should match snapshot with default center alignment', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with left alignment', () => {
    const { asFragment } = renderComponent({ alignment: 'left' })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with right alignment', () => {
    const { asFragment } = renderComponent({ alignment: 'right' })
    expect(asFragment()).toMatchSnapshot()
  })
})
