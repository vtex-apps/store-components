import React from 'react'
import { render } from '@vtex/test-tools/react'

import BuyButton from '../../BuyButton'

describe('<BuyButton />', () => {
  const renderComponent = customProps => {
    const props = {
      ...customProps,
    }

    const comp = <BuyButton {...props}>Test</BuyButton>

    return render(comp)
  }

  function wait(ms) {
    var d = new Date()
    var d2 = null
    do {
      d2 = new Date()
    } while (d2 - d < ms)
  }

  it('should be rendered', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toBeDefined()
    expect(asFragment()).toBeTruthy()
  })

  it('should match snapshot normal', () => {
    const { asFragment } = renderComponent({ available: true, skuItems: [] })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot unavailable', () => {
    const { asFragment } = renderComponent({ available: false, skuItems: [] })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot loading', () => {
    const { asFragment } = renderComponent({ available: false })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should call onAddStart', () => {
    const onAddStart = jest.fn()
    const { getByText } = renderComponent({
      available: true,
      skuItems: [],
      onAddStart,
    })

    fireEvent.click(getByText(/test/i))
    expect(onAddStart).toHaveBeenCalled()
  })

  it('should call onAddEnd', async () => {
    const onAddFinish = jest.fn()
    const { getByText } = renderComponent({
      available: true,
      skuItems: [],
      onAddFinish,
    })
    fireEvent.click(getByText(/test/i))
    expect(onAddFinish).toHaveBeenCalled()
  })
})
