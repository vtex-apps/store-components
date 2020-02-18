import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Input } from 'vtex.styleguide'
import { ExtensionPoint, useChildBlock } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { IconSearch, IconClose } from 'vtex.store-icons'

const DISPLAY_MODES = [
  'clear-button',
  'search-and-clear-buttons',
  'search-button',
]

/** Midleware component to adapt the styleguide/Input to be used by the Downshift*/
const CSS_HANDLES = [
  'searchBarIcon',
  'searchBarSearchIcon',
  'searchBarClearIcon',
  'compactMode',
  'autoCompleteOuterContainer',
  'paddingInput',
]

const CloseIcon = () => {
  const hasIconBlock = Boolean(useChildBlock({ id: 'icon-close' }))

  if (hasIconBlock) {
    return <ExtensionPoint id="icon-close" size={22} type="line" />
  }

  return <IconClose type="line" size={22} />
}

const SearchIcon = () => {
  const hasIconBlock = Boolean(useChildBlock({ id: 'icon-search' }))

  if (hasIconBlock) {
    return <ExtensionPoint id="icon-search" />
  }

  return <IconSearch />
}

const AutocompleteInput = ({
  onClearInput,
  compactMode,
  value,
  hasIconLeft,
  iconBlockClass,
  iconClasses,
  autoFocus,
  onGoToSearchPage,
  /** @deprecated */
  submitOnIconClick,
  displayMode,
  openMenu,
  inputErrorMessage,
  ...restProps
}) => {
  const inputRef = useRef(null)
  const handles = useCssHandles(CSS_HANDLES)

  let mode = displayMode || 'clear-button'
  if (DISPLAY_MODES.indexOf(displayMode) < 0) {
    console.error(
      `[store-componentes/search-bar] Invalid displayMode '${displayMode}'. The valid options are: ${DISPLAY_MODES.join(
        ', '
      )}`
    )
  }

  if (submitOnIconClick === true) {
    mode = 'search-button'
  } else if (submitOnIconClick === false) {
    mode = 'clear-button'
  }

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

  const hasValue = value != null && value.length > 0

  const clearButton = ((mode === 'clear-button' && hasValue) ||
    mode === 'search-and-clear-buttons') && (
    <button
      className={`${iconClasses || ''} ${
        handles.searchBarClearIcon
      }  flex items-center pointer bn bg-transparent outline-0 pv0 pl0 pr3`}
      style={{
        visibility: hasValue ? 'visible' : 'hidden',
      }}
      onClick={() => onClearInput()}
    >
      <CloseIcon />
    </button>
  )

  const internalSearchButton = ((mode === 'clear-button' && !hasValue) ||
    mode === 'search-button') && (
    <button
      className={`${iconClasses || ''} ${
        handles.searchBarSearchIcon
      }  flex items-center pointer bn bg-transparent outline-0 pv0 pl0 pr3`}
      onClick={() => hasValue && onGoToSearchPage()}
    >
      <SearchIcon />
    </button>
  )

  const externalSearchButton = mode === 'search-and-clear-buttons' && (
    <div className="bw1 bl b--muted-4 flex items-center">
      <button
        className={`${iconClasses || ''} ${
          handles.searchBarSearchIcon
        } flex items-center h-100 pointer pv0 nr5 ph5 bn c-link`}
        onClick={onGoToSearchPage}
      >
        <SearchIcon />
      </button>
    </div>
  )

  const suffix = (
    <div className="flex h-100">
      {clearButton}
      {internalSearchButton}
      {externalSearchButton}
    </div>
  )

  const prefix = (
    <span className={`${iconClasses} ${handles.searchBarIcon}`}>
      <SearchIcon />
    </span>
  )

  const classContainer = classNames('w-100 flex', {
    [handles.compactMode]: compactMode,
  })

  return (
    <div className={handles.autoCompleteOuterContainer}>
      <div className={classContainer}>
        <Input
          ref={inputRef}
          size="large"
          value={value}
          prefix={hasIconLeft && prefix}
          suffix={suffix}
          {...restProps}
          error={Boolean(inputErrorMessage)}
          errorMessage={inputErrorMessage}
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
  /** Downshift func to open the menu */
  openMenu: PropTypes.func,
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
  /** Function to direct the user to the searchPage */
  onGoToSearchPage: PropTypes.func.isRequired,
  /**
   * @deprecated Use `displayMode`
   * Identify if icon should submit on click
   * */
  submitOnIconClick: PropTypes.bool,
  /* Define the input display mode */
  displayMode: PropTypes.oneOf(DISPLAY_MODES),
  /** Error message showed in search input */
  inputErrorMessage: PropTypes.string,
}

export default AutocompleteInput
