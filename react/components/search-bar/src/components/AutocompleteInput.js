import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '@vtex/styleguide/lib/Input'

/** Midleware component to adapt the styleguide/Input to be used by the Downshift*/
export default class AutocompleteInput extends Component {
  render() {
    return (
      <Input size="large" onKeyPress={this.props.onKeyDown} {...this.props} />
    )
  }
}

AutocompleteInput.propTypes = {
  /** Downshift prop to be passed to the input*/
  autoComplete: PropTypes.string.isRequired,
  /** Input ID*/
  id: PropTypes.string.isRequired,
  /** Downshift prop to be passed to the input*/
  onBlur: PropTypes.func.isRequired,
  /** Downshift prop to be passed to the input*/
  onChange: PropTypes.func.isRequired,
  /** Downshift prop to be passed to the input*/
  onKeyDown: PropTypes.func.isRequired,
  /** Downshift prop to be passed to the input*/
  value: PropTypes.string.isRequired,
  /** Placeholder to be used on the input */
  placeholder: PropTypes.string.isRequired,
}
