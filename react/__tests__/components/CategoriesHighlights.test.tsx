import React from 'react'
import { render } from '@vtex/test-tools/react'

import CategoriesHighlights from '../../CategoriesHighlights'

describe('<CategoriesHighlights />', () => {
  const renderComponent = (customProps: any) => {
    const props = {
      cardShape: 'squared',
      showCategoriesHighlighted: true,
      ...customProps,
    }

    return render(<CategoriesHighlights {...props} />)
  }

  it('should be rendered', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const { asFragment } = renderComponent()

    expect(asFragment()).toBeDefined()
    expect(asFragment()).toBeTruthy()
  })

  it('should match snapshot Squared', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot Rectangular', () => {
    const { asFragment } = renderComponent({ cardShape: 'rectangular' })

    expect(asFragment()).toMatchSnapshot()
  })
})
