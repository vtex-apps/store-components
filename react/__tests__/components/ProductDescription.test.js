import React from 'react'
import { render } from '@vtex/test-tools/react'
import ProductDescription from './../../ProductDescription'

describe('<ProductDescription />', () => {
  const renderComponent = customProps => {
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
    const { asFragment, getByText } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
    getByText('store/product-description.collapse.showMore')
  })

  it('should not show show more button', () => {
    const { debug, queryByText } = renderComponent({ collapseContent: false })
    expect(queryByText('store/product-description.collapse.showMore')).toBeNull()
  })
})
