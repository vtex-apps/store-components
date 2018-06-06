import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DefaultLogo from './images/DefaultLogo.svg'

import './global.css'

/**
 * Logo of the store
 */
export default class Logo extends Component {
  static propTypes = {
    /** URL of the logo */
    url: PropTypes.string,
    /** Title to be displayed as alt text */
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    title: 'VTEX logo',
  }
  
  render() {
    const { url, title } = this.props
    return <img className="vtex-logo" src={url || DefaultLogo} alt={title} />
  }
}
