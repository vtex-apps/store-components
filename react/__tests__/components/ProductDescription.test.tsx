import React from 'react'
import { render } from '@vtex/test-tools/react'

import ProductDescription from '../../ProductDescription'

describe('<ProductDescription />', () => {
  const renderComponent = (customProps?: any) => {
    const props = {
      description: 'Test description',
      ...customProps,
    }

    return render(<ProductDescription {...props} />)
  }

  it('should be mounted', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toBeDefined()
  })

  it('should match the snapshot with description', () => {
    const { asFragment, queryByText } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
    expect(queryByText('Show more')).toBeInTheDocument()
  })

  it('should not show show more button', () => {
    const { queryByText } = renderComponent({ collapseContent: false })

    expect(queryByText('Show more')).toBeNull()
  })
})
