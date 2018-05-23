import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { indexBy, prop } from 'ramda'

import { SOCIAL_ENUM } from './constants/social'
import { SocialButton } from './utils/socialResolver'

import './global.css'

class Share extends Component {
  static propTypes = {
    social: PropTypes.object.isRequired,
    options: PropTypes.shape({
      size: PropTypes.number,
    }),
    quantity: PropTypes.number,
  }

  static defaultProps = {
    social: {
      Facebook: true,
      Twitter: true,
      WhatsApp: true,
    },
    options: {},
  }

  static schema = {
    title: 'Share',
    description: 'List of share buttons',
    type: 'object',
    properties: {
      social: {
        title: 'Social Networks',
        type: 'object',
        properties: {
          ...indexBy(
            prop('title'),
            SOCIAL_ENUM.map(socialNetwork => ({
              type: 'boolean',
              title: socialNetwork,
              default: Share.defaultProps.social[socialNetwork],
            }))
          ),
        },
      },
    },
  }

  render() {
    const {
      social,
      options: { size },
    } = this.props

    return (
      <div className="vtex-share flex">
        {Object.keys(social).map(
          (socialNetwork, index) =>
            social[socialNetwork] && (
              <div className="ph1" key={index}>
                <SocialButton
                  url={window.location && window.location.href}
                  socialEnum={socialNetwork}
                  size={size}
                />
              </div>
            )
        )}
      </div>
    )
  }
}

export default Share
