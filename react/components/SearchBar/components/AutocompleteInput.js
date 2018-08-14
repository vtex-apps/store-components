import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Input } from 'vtex.styleguide'
import IconSearch from '../images/IconSearch'
import IconDeny from '../images/IconDeny'

/** Midleware component to adapt the styleguide/Input to be used by the Downshift*/
export default class AutocompleteInput extends Component {
  state = {
    inputValue: '',
  }

  static contextTypes = {
    navigate: PropTypes.func,
  }

  handleInputChange = (evt, handleChangeProps) => {
    this.setState({ inputValue: evt.target.value })
    handleChangeProps(evt)
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
    const { isMobileSearchMode, ...restProps } = this.props
    if (isMobileSearchMode) {
      restProps['suffixIcon'] = (
        <span className="flex items-center pointer" onClick={() => this.setState({ inputValue: '' })}>
          <IconDeny />
        </span>
      )
      restProps['prefix'] = (
        <span className="flex items-center pointer" onClick={this.handleIconClick}>
          <IconSearch />
        </span>
      )
    }
    return (
      <div className="flex">
        <Input
          size="large"
          onKeyPress={event => this.props.onKeyDown(event)}
          {...restProps}
          onChange={event => this.handleInputChange(event, restProps.onChange)}
          value={this.state.inputValue}
        />
        {!isMobileSearchMode && (
          <span className="flex items-center pl4 pointer" onClick={this.handleIconClick}>
            <IconSearch size={30} />
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
  isMobileSearchMode: PropTypes.bool,
  /** Function that closes the autocomplete suggestions */
  closeMenu: PropTypes.func,
}
