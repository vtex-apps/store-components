import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Input } from 'vtex.styleguide'
import IconSearch from '../images/IconSearch'

/** Midleware component to adapt the styleguide/Input to be used by the Downshift*/
export default class AutocompleteInput extends Component {
  state = {
    inputValue: '',
  }

  static contextTypes = {
    navigate: PropTypes.func,
  }

  handleInputChange = (event, handleChangeProps) => {
    this.setState({ inputValue: event.target.value })
    handleChangeProps(event)

    const shouldSearch = event.target.value.length >= 2
    this.props.onMakeSearch(shouldSearch)
  }

  handleIconClick = () => {
    this.context.navigate({
      page: 'store/search',
      params: { term: this.state.inputValue },
      query: 'map=ft',
      fallbackToWindowLocation: false,
    })
    this.props.closeMenu()
  }

  render() {
    const suffixIcon = (
      <span className="flex items-center pointer" onClick={this.handleIconClick}>
        <IconSearch color="#979899" />
      </span>
    )
    return (
      <div className="flex">
        <Input
          size="large"
          onKeyPress={event => this.props.onKeyDown(event)}
          {...this.props}
          suffixIcon={suffixIcon}
          onChange={event => this.handleInputChange(event, this.props.onChange)}
          value={this.state.inputValue}
        />
      </div>
    )
  }
}

AutocompleteInput.propTypes = {
  /** Function to execute search with deboucing */
  onMakeSearch: PropTypes.func.isRequired,
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
  /** Function that closes the autocomplete suggestions */
  closeMenu: PropTypes.func,
}
