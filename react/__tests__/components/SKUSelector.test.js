import React from 'react'
import { render } from 'intl-helper'
import { fireEvent } from 'react-testing-library'

import SKUSelector from './../../SKUSelector'
import { getSKU } from 'sku-helper'

describe('<SKUSelector />', () => {
  const renderComponent = customProps => {
    const props = {
      skuSelected: getSKU(),
      skuItems: [getSKU('Black'), getSKU('Blue'), getSKU('Yellow')],
      ...customProps,
    }
    return render(<SKUSelector {...props} />)
  }

  it('should be mounted', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toBeDefined()
  })

  it('should match the snapshot', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should call onSKUSelected', () => {
    const onSKUSelected = jest.fn()
    const { container } = renderComponent({ onSKUSelected })
    const comp = container.querySelector('.skuSelectorItem')
    fireEvent.click(comp)
    expect(onSKUSelected).toBeCalledTimes(1)
  })
})
