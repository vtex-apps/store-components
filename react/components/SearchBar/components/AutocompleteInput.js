import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Input } from 'vtex.styleguide'
import { ExtensionPoint } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

/** Midleware component to adapt the styleguide/Input to be used by the Downshift*/
const CSS_HANDLES = [
  'searchBarIcon',
  'compactMode',
  'autoCompleteOuterContainer',
  'paddingInput',
]

const AutocompleteInput = ({
  onClearInput,
  compactMode,
  value,
  hasIconLeft,
  iconBlockClass,
  iconClasses,
  autoFocus,
  ...restProps
}) => {
  const inputRef = useRef(null)
  const handles = useCssHandles(CSS_HANDLES)

  useEffect(() => {
    const changeClassInput = () => {
      if (compactMode) {
        inputRef.current.placeholder = ''
        inputRef.current.classList.add(handles.paddingInput)
      }
    }

    changeClassInput()
    autoFocus && inputRef.current.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const suffix = (
    <span
      className={`${iconClasses || ''} ${
        handles.searchBarIcon
      } flex items-center pointer`}
      onClick={() => value && onClearInput()}
    >
      {value ? (
        <ExtensionPoint id="icon-close" size={22} type="line" />
      ) : (
        !hasIconLeft && <ExtensionPoint id="icon-search" />
      )}
    </span>
  )

  const prefix = (
    <span className={`${iconClasses} ${handles.searchBarIcon}`}>
      <ExtensionPoint id="icon-search" />
    </span>
  )

  const classContainer = classNames('w-100', {
    [handles.compactMode]: compactMode,
  })

  return (
    <div className={`${handles.autoCompleteOuterContainer} flex`}>
      <div className={classContainer}>
        <Input
          ref={inputRef}
          size="large"
          value={value}
          prefix={hasIconLeft && prefix}
          suffix={suffix}
          {...restProps}
        />
      </div>
    </div>
  )
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
  compactMode: PropTypes.bool,
  /** Clears the input */
  onClearInput: PropTypes.func,
  /** Identify if the search icon is on left or right position */
  hasIconLeft: PropTypes.bool,
  /** Custom classes for the search icon */
  iconClasses: PropTypes.string,
  /** Block class for the search icon */
  iconBlockClass: PropTypes.string,
  /** Identify if the search input should autofocus or not */
  autoFocus: PropTypes.bool,
}

export default AutocompleteInput
