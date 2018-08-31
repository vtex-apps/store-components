import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Input } from 'vtex.styleguide'
import IconSearch from '../images/IconSearch'

/** Midleware component to adapt the styleguide/Input to be used by the Downshift*/
export default class AutocompleteInput extends Component {
  render() {
    const { onGoToSearchPage, ...restProps } = this.props

    const suffixIcon = (
      <span className="flex items-center pointer" onClick={onGoToSearchPage}>
        <IconSearch color="#979899" />
      </span>
    )

    return (
      <div className="flex">
        <Input size="large" {...restProps} suffixIcon={suffixIcon} />
      </div>
    )
  }
}

AutocompleteInput.propTypes = {
  /** Downshift prop to be passed to the input */
  autoComplete: PropTypes.string,
  /** Input ID */
  id: PropTypes.string,
  /** Downshift prop to be passed to the input */
  onBlur: PropTypes.func,
  /** Downshift prop to be passed to the input */
  onChange: PropTypes.func,
  /** Downshift prop to be passed to the input */
  onKeyDown: PropTypes.func,
  /** Downshift prop to be passed to the input */
  value: PropTypes.string,
  /** Placeholder to be used on the input */
  placeholder: PropTypes.string,
  /** Function to direct the user to the searchPage */
  onGoToSearchPage: PropTypes.func.isRequired,
}
