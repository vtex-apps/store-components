import React from 'react'
import { render, fireEvent, screen } from '@vtex/test-tools/react'

import Share from '../../Share'

const mockedUsePixelPush = jest.fn()

jest.mock('vtex.pixel-manager', () => ({
  usePixel: () => ({ push: mockedUsePixelPush }),
}))

describe('<Share />', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  const renderComponent = props => {
    return render(<Share imageUrl="" {...props} />)
  }

  it('should be mounted', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toBeDefined()
  })

  it('should match the snapshot with Facebook', () => {
    const { asFragment } = renderComponent({
      social: {
        Facebook: true,
      },
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match the snapshot with Twitter', () => {
    const { asFragment } = renderComponent({
      social: {
        Twitter: true,
      },
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match the snapshot with WhatsApp', () => {
    const { asFragment } = renderComponent({
      social: {
        WhatsApp: true,
      },
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match the snapshot with Telegram', () => {
    const { asFragment } = renderComponent({
      social: {
        Telegram: true,
      },
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match the snapshot with E-mail', () => {
    const { asFragment } = renderComponent({
      social: {
        'E-mail': true,
      },
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match the snapshot with multiples Socials', () => {
    const { asFragment } = renderComponent({
      social: {
        'E-mail': true,
        Twitter: true,
        Telegram: true,
      },
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot Loader', () => {
    const { asFragment } = renderComponent({ loading: true })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should send vtex:share with Facebook method when is clicked', async () => {
    await renderComponent({
      social: {
        Facebook: true,
      },
      loading: false,
    })

    const btn = screen.getByLabelText('facebook')

    fireEvent.click(btn)

    const expectedPixelEvent = {
      event: 'share',
      method: 'Facebook',
      contentType: 'product',
      itemId: '23087',
    }

    expect(mockedUsePixelPush).toHaveBeenCalledWith(expectedPixelEvent)
  })

  it('should send vtex:share with WhatsApp method when is clicked', async () => {
    await renderComponent({
      social: {
        WhatsApp: true,
      },
      loading: false,
    })

    const btn = screen.getByLabelText('whatsapp')

    fireEvent.click(btn)

    const expectedPixelEvent = {
      event: 'share',
      method: 'WhatsApp',
      contentType: 'product',
      itemId: '23087',
    }

    expect(mockedUsePixelPush).toHaveBeenCalledWith(expectedPixelEvent)
  })

  it('should send vtex:share with Twitter method when is clicked', async () => {
    await renderComponent({
      social: {
        Twitter: true,
      },
      loading: false,
    })

    const btn = screen.getByLabelText('twitter')

    fireEvent.click(btn)

    const expectedPixelEvent = {
      event: 'share',
      method: 'Twitter',
      contentType: 'product',
      itemId: '23087',
    }

    expect(mockedUsePixelPush).toHaveBeenCalledWith(expectedPixelEvent)
  })

  it('should send vtex:share with Telegram method when is clicked', async () => {
    await renderComponent({
      social: {
        Telegram: true,
      },
      loading: false,
    })

    const btn = screen.getByLabelText('telegram')

    fireEvent.click(btn)

    const expectedPixelEvent = {
      event: 'share',
      method: 'Telegram',
      contentType: 'product',
      itemId: '23087',
    }

    expect(mockedUsePixelPush).toHaveBeenCalledWith(expectedPixelEvent)
  })

  it('should send vtex:share with E-mail method when is clicked', async () => {
    await renderComponent({
      social: {
        'E-mail': true,
      },
      loading: false,
    })

    const btn = screen.getByLabelText('email')

    fireEvent.click(btn)

    const expectedPixelEvent = {
      event: 'share',
      method: 'E-mail',
      contentType: 'product',
      itemId: '23087',
    }

    expect(mockedUsePixelPush).toHaveBeenCalledWith(expectedPixelEvent)
  })
})
