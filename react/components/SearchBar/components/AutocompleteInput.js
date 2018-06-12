import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '@vtex/styleguide/lib/Input'

/** Midleware component to adapt the styleguide/Input to be used by the Downshift*/
export default class AutocompleteInput extends Component {
  render() {
    return (
      <Input size="large" onKeyPress={(evt) => {
        this.props.onKeyDown(evt)
      }} {...this.props} />
    )
  }
}

AutocompleteInput.propTypes = {
  /** Downshift prop to be passed to the input*/
  autoComplete: PropTypes.string,
  /** Input ID*/
  id: PropTypes.string,
  /** Downshift prop to be passed to the input*/
  onBlur: PropTypes.func,
  /** Downshift prop to be passed to the input*/
  onChange: PropTypes.func,
  /** Downshift prop to be passed to the input*/
  onKeyDown: PropTypes.func,
  /** Downshift prop to be passed to the input*/
  value: PropTypes.string,
  /** Placeholder to be used on the input */
  placeholder: PropTypes.string,
}
