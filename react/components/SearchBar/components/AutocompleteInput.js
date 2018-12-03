import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Input, IconClose, IconSearch } from 'vtex.styleguide'

/** Midleware component to adapt the styleguide/Input to be used by the Downshift*/
export default class AutocompleteInput extends Component {
  constructor(props) {
    super(props)
    this.inputClass = React.createRef()
    this.changeClassInput = this.changeClassInput.bind(this)
  }

  changeClassInput() {
    const { compactMode } = this.props
    if (compactMode) {
      this.inputClass.current.placeholder = ''
      this.inputClass.current.classList.add('vtex-searchbar__padding-input')
    }
  }

  componentDidMount() {
    this.changeClassInput()
  }

  render() {
    const { onGoToSearchPage, onClearInput, compactMode, value, ...restProps } = this.props

    const suffix = (
      <span className="flex items-center pointer" onClick={compactMode ? onClearInput : onGoToSearchPage} >
        {value
          ? <IconClose className="pa0" size={20} color="#979899" />
          : <IconSearch color="#979899" />
        }
      </span>
    )

    const classContainer = classNames('w-100', {
      'vtex-searchbar__compact-mode': compactMode,
    })

    return (
      <div className="flex">
        <div className={classContainer}>
          <Input
            ref={this.inputClass}
            size="large" value={value}
            suffix={suffix}
            prefix={compactMode && <IconSearch color="#979899" />}
            {...restProps} />
        </div>
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
  compactMode: PropTypes.bool,
  /** Clears the input */
  onClearInput: PropTypes.func,
}
