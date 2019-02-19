import React from 'react'

import { render } from 'enzyme'

import CategoriesHighlights from '../../CategoriesHighlights'

describe('<CategoriesHighlights />', () => {
  const defaultProps = {
    cardShape: 'squared',
    showCategoriesHighlighted: true,
  }

  const renderComponent = customProps => {
    const props = {
      ...defaultProps,
      ...customProps,
    }

    return render(<CategoriesHighlights {...props} />)
  }

  it('should be rendered', () => {
    const wrapper = renderComponent()
    expect(wrapper).toBeDefined()
    expect(wrapper).toBeTruthy()
  })

  it('should match snapshot Squared', () => {
    const wrapper = renderComponent()
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot Rectangular', () => {
    const wrapper = renderComponent({ cardShape: 'rectangular' })
    expect(wrapper).toMatchSnapshot()
  })
})
