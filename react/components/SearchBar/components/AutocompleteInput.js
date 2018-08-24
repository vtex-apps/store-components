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

    let shouldSearch = event.target.value.length >= 2
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
    const { isMobile, ...restProps } = this.props
    if (isMobile) {
      restProps['suffixIcon'] = (
        <span
          className="flex items-center pointer"
          onClick={this.handleIconClick}
        >
          <IconSearch color="#979899" />
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
        {!isMobile && (
          <span
            className="flex items-center pl4 pointer"
            onClick={this.handleIconClick}
          >
            <IconSearch size={30} color="#979899" />
          </span>
        )}
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
  /** If is mobile search mode */
  isMobile: PropTypes.bool,
  /** Function that closes the autocomplete suggestions */
  closeMenu: PropTypes.func,
}
