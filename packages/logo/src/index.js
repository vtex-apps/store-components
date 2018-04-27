import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Logo of the store
 */
class Logo extends Component {
  render() {
    const { url, title } = this.props

    return <img className="vtex-logo" src={url} alt={title} />
  }
}

Logo.propTypes = {
  /** URL of the logo */
  url: PropTypes.string.isRequired,
  /** Title to be displayed as alt text */
  title: PropTypes.string.isRequired,
}

Logo.schema = {
  title: 'Logo',
  description: 'Logo of the store',
  type: 'object',
  properties: {
    url: {
      title: 'Logo URL',
      type: 'string',
    },
    title: {
      title: 'Title text',
      type: 'string',
    },
  },
}

export default Logo
