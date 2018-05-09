import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '@vtex/styleguide/lib/Input'

export default class AutocompleteInput extends Component {
  render() {
    return (
      <Input size="large" onKeyPress={this.props.onKeyDown} {...this.props} />
    )
  }
}

AutocompleteInput.propTypes = {
  autoComplete: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}
