import React from 'react'
import { render } from '@vtex/test-tools/react'

import ProductDescription from '../../ProductDescription'

describe('<ProductDescription />', () => {
  const renderComponent = (customProps: any) => {
    const props = {
      description: 'Test description',
      ...customProps,
    }

    return render(<ProductDescription {...props} />)
  }

  it('should be mounted', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const { asFragment } = renderComponent()

    expect(asFragment()).toBeDefined()
  })

  it('should match the snapshot with description', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const { asFragment, getByText } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
    getByText('Show more')
  })

  it('should not show show more button', () => {
    const { queryByText } = renderComponent({ collapseContent: false })

    expect(queryByText('Show more')).toBeNull()
  })
})
