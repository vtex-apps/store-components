import React from 'react'
import { render } from 'enzyme'

import ProductImages from '../../ProductImages'

describe('<ProductImages /> component', () => {
  function renderComponent(customProps = {}) {
    const component = <ProductImages {...customProps} />

    return render(component)
  }

  it('should be able to mount and not break', () => {
    const component = renderComponent()
    expect(component).toBeTruthy()
  })

  it('should match snapshot without images', () => {
    const component = renderComponent()
    expect(component).toMatchSnapshot()
  })

  it('should match snapshot with images', () => {
    const component = renderComponent({ images: [] })
    expect(component).toMatchSnapshot()
  })
})
