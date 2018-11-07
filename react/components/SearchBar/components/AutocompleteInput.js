import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Input, IconClose } from 'vtex.styleguide'
import IconSearch from '../images/IconSearch'

/** Midleware component to adapt the styleguide/Input to be used by the Downshift*/
export default class AutocompleteInput extends Component {

  constructor(props) {
    super(props)
    this.inputClass = React.createRef();
    this.changeClassInput = this.changeClassInput.bind(this)
  }

  changeClassInput() {

    const { mobileMode } = this.props

    if (mobileMode) {
      this.inputClass.current.placeholder = ""
      this.inputClass.current.classList.remove('bw1')
      this.inputClass.current.classList.add('bn')
      this.inputClass.current.classList.add('vtex-searchbar__border-bottom')
    }
    console.log(this.inputClass)
  }

  componentDidMount() {
    this.changeClassInput()
  }

  componentWillUpdate() {
    this.changeClassInput()
  }

  render() {

    const { onGoToSearchPage, mobileMode, value, ...restProps } = this.props

    const prefixIcon = (
      mobileMode ? <IconSearch color="#979899" /> : ""
    )
    const suffixIcon = (
      mobileMode ? !value ? "" : <IconClose className="pa0" size={10} color="#979899" />
        :
        <span className="flex items-center pointer" onClick={onGoToSearchPage}>
          <IconSearch color="#979899" />
        </span>
    )

    return (
      <div className="flex">
        <Input ref={this.inputClass} size="large" {...restProps} suffixIcon={suffixIcon} prefix={prefixIcon} />
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
  mobileMode: PropTypes.bool,
}
