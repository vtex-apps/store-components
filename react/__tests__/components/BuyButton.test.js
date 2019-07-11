import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'
import { MockedProvider } from 'react-apollo/test-utils'

import BuyButton from '../../BuyButton'

describe('<BuyButton />', () => {
  const renderComponent = (customProps, text = 'Test') => {
    const props = {
      available: true,
      ...customProps,
    }

    const comp = (
      <MockedProvider resolvers={{}}>
        <BuyButton {...props}>{text}</BuyButton>
      </MockedProvider>
    )

    return render(comp)
  }

  it('should be rendered', async () => {
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

  it('should call onAddStart and onAddFinish', async () => {
    const onAddStart = jest.fn()
    const onAddFinish = jest.fn()

    const buttonText = 'Add to cart'

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
    await new Promise(resolve => setTimeout(resolve, 0))
    const assertions = () => {
      expect(onAddStart).toBeCalledTimes(1)
      expect(onAddFinish).toBeCalledTimes(1)
    }
    expect.assertions(assertions)
  })
})
