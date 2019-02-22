import React from 'react'
import PropTypes from 'prop-types'
import { renderWithIntl } from 'intl-helper'

import Share from './../../Share'

describe('<Share />', () => {
  const renderComponent = props => {
    return renderWithIntl(<Share {...props} />)
  }

  it('should be mounted', () => {
    expect(renderComponent()).toBeDefined()
  })

  it('should match the snapshot with Facebook', () => {
    expect(
      renderComponent({
        social: {
          Facebook: true,
        },
      })
    ).toMatchSnapshot()
  })

  it('should match the snapshot with Twitter', () => {
    expect(
      renderComponent({
        social: {
          Twitter: true,
        },
      })
    ).toMatchSnapshot()
  })

  it('should match the snapshot with WhatsApp', () => {
    expect(
      renderComponent({
        social: {
          WhatsApp: true,
        },
      })
    ).toMatchSnapshot()
  })

  it('should match the snapshot with Telegram', () => {
    expect(
      renderComponent({
        social: {
          Telegram: true,
        },
      })
    ).toMatchSnapshot()
  })

  it('should match the snapshot with Google+', () => {
    expect(
      renderComponent({
        social: {
          'Google+': true,
        },
      })
    ).toMatchSnapshot()
  })

  it('should match the snapshot with E-mail', () => {
    expect(
      renderComponent({
        social: {
          'E-mail': true,
        },
      })
    ).toMatchSnapshot()
  })

  it('should match the snapshot with multiples Socials', () => {
    expect(
      renderComponent({
        social: {
          'E-mail': true,
          Twitter: true,
          Telegram: true,
        },
      })
    ).toMatchSnapshot()
  })

  it('should match snapshot Loader', () => {
    expect(renderComponent({ loading: true })).toMatchSnapshot()
  })
})
