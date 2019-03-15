import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'

import BuyButton from '../../BuyButton'

describe('<BuyButton />', () => {
  const renderComponent = (customProps, text = 'Test') => {
    const props = {
      ...customProps,
    }

    const comp = <BuyButton {...props}>{text}</BuyButton>

    return render(comp)
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

  it('should call onAddStart and onAddFinish', () => {
    const onAddStart = jest.fn()
    const onAddFinish = jest.fn()

    const buttonText = 'Test inside button'

    const { getByText } = renderComponent(
      {
        available: true,
        skuItems: [],
        onAddStart,
        onAddFinish,
      },
      buttonText
    )

    fireEvent.click(getByText(buttonText))
    const assertions = () => {
      expect(onAddStart).toBeCalledTimes(1)
      expect(onAddFinish).toBeCalledTimes(1)
    }
    expect.assertions(assertions)
  })
})
