import React from 'react'
import { render } from '@vtex/test-tools/react'

import Share from '../../Share'

describe('<Share />', () => {
  const renderComponent = (props: any) => {
    return render(<Share imageUrl="" {...props} />)
  }

  it('should be mounted', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
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
})
