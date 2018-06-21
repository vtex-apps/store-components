import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { indexBy, prop } from 'ramda'

import { SOCIAL_ENUM } from './constants/social'
import SocialButton from './components/SocialButton'

import './global.css'

class Share extends Component {
  static propTypes = {
    /** Social Networks configuration */
    social: PropTypes.object.isRequired,
    /** Share buttons options */
    options: PropTypes.shape({
      /** Share buttons size in pixels */
      size: PropTypes.number,
    }),
    /** Share URL title */
    title: PropTypes.string,
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
    title: 'editor.share.title',
    description: 'editor.share.description',
    type: 'object',
    properties: {
      social: {
        title: 'editor.share.social.title',
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
      title,
      options: { size },
    } = this.props

    return (
      <div className="vtex-share flex flex-row">
        {Object.keys(social).map(
          (socialNetwork, index) =>
            social[socialNetwork] && (
              <div
                className={`vtex-share__${socialNetwork}-button ph1`}
                key={index}>
                <SocialButton
                  url={window.location && window.location.href}
                  message={title}
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
