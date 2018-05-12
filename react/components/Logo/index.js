import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
    url: 'http://',
    title: 'VTEX logo',
  }
  render() {
    const { url, title } = this.props

    return <img className="vtex-logo" src={url} alt={title} />
  }
}
