import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Input } from 'vtex.styleguide'
import IconSearch from '../images/IconSearch'

/** Midleware component to adapt the styleguide/Input to be used by the Downshift*/
export default class AutocompleteInput extends Component {
  render() {
    const { isMobile, onGoToSearchPage, ...restProps } = this.props

    if (isMobile) {
      restProps['suffixIcon'] = (
        <span className="flex items-center pointer" onClick={onGoToSearchPage}>
          <IconSearch color="#979899" />
        </span>
      )
    }

    return (
      <div className="flex">
        <Input size="large" {...restProps} />
        {!isMobile && (
          <span
            className="flex items-center pl4 pointer"
            onClick={onGoToSearchPage}
          >
            <IconSearch size={30} color="#979899" />
          </span>
        )}
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
  /** If is mobile search mode */
  isMobile: PropTypes.bool,
  /** Function to direct the user to the searchPage */
  onGoToSearchPage: PropTypes.func.isRequired,
}
