import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './global.css'

/**
 * Logo of the store
 */
export default class Logo extends Component {
  static propTypes = {
    /** URL of the logo */
    url: PropTypes.string.isRequired,
    /** Title to be displayed as alt text */
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    url: 'http://brand.vtex.com/static/media/logo.2f3fc60b.svg',
    title: 'VTEX logo',
  }
  
  render() {
    const { url, title } = this.props
    return <img className="vtex-logo" src={url} alt={title} />
  }
}
