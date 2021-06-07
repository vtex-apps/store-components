import React, { useRef, useEffect } from 'react'
import classNames from 'classnames'
import { Input, InputSearch } from 'vtex.styleguide'
import { ExtensionPoint, useChildBlock } from 'vtex.render-runtime'
import { IconSearch, IconClose } from 'vtex.store-icons'
import type { DownshiftProps } from 'downshift'

import { useSearchBarCssHandles } from './SearchBarCssHandles'

const DISPLAY_MODES = [
  'clear-button',
  'search-and-clear-buttons',
  'search-button',
]

/** Midleware component to adapt the styleguide/Input to be used by the Downshift */
export const CSS_HANDLES = [
  'autoCompleteOuterContainer',
  'compactMode',
  'externalSearchButtonWrapper',
  'paddingInput',
  'searchBarClearIcon',
  'searchBarIcon',
  'searchBarSearchIcon',
  'suffixWrapper',
] as const

const CloseIcon = () => {
  const hasIconBlock = Boolean(useChildBlock({ id: 'icon-close' }))

  if (hasIconBlock) {
    return <ExtensionPoint id="icon-close" size={16} type="line" />
  }

  return <IconClose type="line" size={16} />
}

const SearchIcon = () => {
  const hasIconBlock = Boolean(useChildBlock({ id: 'icon-search' }))

  if (hasIconBlock) {
    return <ExtensionPoint id="icon-search" />
  }

  return <IconSearch />
}

interface Props {
  /** Downshift prop to be passed to the input */
  autoComplete?: string
  /** Input ID */
  id?: string
  /** Downshift prop to be passed to the input */
  onBlur?: () => void
  /** Downshift prop to be passed to the input */
  onChange?: DownshiftProps<any>['onChange']
  /** Downshift prop to be passed to the input */
  onKeyDown?: (event: any) => void
  /** Downshift prop to be passed to the input */
  value?: string
  /** Downshift func to open the menu */
  openMenu?: () => void
  /** Placeholder to be used on the input */
  placeholder?: string
  compactMode?: boolean
  /** Clears the input */
  onClearInput: () => void
  /** Identify if the search icon is on left or right position */
  hasIconLeft?: boolean
  /** Custom classes for the search icon */
  iconClasses?: string
  /** Block class for the search icon */
  iconBlockClass?: string
  /** Identify if the search input should autofocus or not */
  autoFocus?: boolean
  /** Function to direct the user to the searchPage */
  onGoToSearchPage: () => void
  /**
   * @deprecated Use `displayMode`
   * Identify if icon should submit on click
   * */
  submitOnIconClick?: boolean
  /* Define the input display mode */
  displayMode?: 'clear-button' | 'search-and-clear-buttons' | 'search-button'
  /** Error message showed in search input */
  inputErrorMessage?: string
  /** The type of the search input */
  inputType?: 'text' | 'search'
  openAutocompleteOnFocus?: boolean
  onInputChange: DownshiftProps<any>['onChange']
  inputValue: string
}

function AutocompleteInput({
  onClearInput,
  compactMode,
  value,
  hasIconLeft,
  iconBlockClass,
  iconClasses,
  autoFocus,
  onGoToSearchPage,
  submitOnIconClick,
  displayMode = 'clear-button',
  openMenu,
  inputErrorMessage,
  inputType = 'text',
  openAutocompleteOnFocus,
  ...restProps
}: Props) {
  const { handles, withModifiers } = useSearchBarCssHandles()
  const inputRef = useRef<HTMLInputElement>(null)

  let dMode = displayMode

  if (DISPLAY_MODES.indexOf(dMode) < 0) {
    console.error(
      `[store-components/search-bar] Invalid displayMode '${displayMode}'. The valid options are: ${DISPLAY_MODES.join(
        ', '
      )}`
    )
  }

  // for backward compatibility
  if (submitOnIconClick === true) {
    dMode = 'search-button'
  } else if (submitOnIconClick === false) {
    dMode = 'clear-button'
  }

  useEffect(() => {
    const changeClassInput = () => {
      // eslint-disable-next-line vtex/prefer-early-return
      if (compactMode && inputRef.current) {
        inputRef.current.placeholder = ''
        inputRef.current.classList.add(handles.paddingInput)
      }
    }

    changeClassInput()
    if (autoFocus) inputRef.current?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hasValue = value != null && value.length > 0

  const showClearButton =
    (dMode === 'clear-button' && hasValue) ||
    dMode === 'search-and-clear-buttons'

  const showInternalSearchButton =
    (dMode === 'clear-button' && !hasValue) || dMode === 'search-button'

  const showExternalSearchButton = dMode === 'search-and-clear-buttons'

  const clearButton = showClearButton && (
    <button
      className={`${iconClasses ?? ''} ${withModifiers(
        'searchBarIcon',
        'clear'
      )} flex items-center pointer bn bg-transparent outline-0 pv0 pl0 pr3`}
      style={{
        visibility: hasValue ? 'visible' : 'hidden',
      }}
      onClick={() => onClearInput()}
    >
      <CloseIcon />
    </button>
  )

  const internalSearchButton = showInternalSearchButton && (
    <button
      className={`${iconClasses ?? ''} ${withModifiers(
        'searchBarIcon',
        'search'
      )} flex items-center pointer bn bg-transparent outline-0 pv0 pl0 pr3`}
      onClick={() => hasValue && onGoToSearchPage()}
    >
      <SearchIcon />
    </button>
  )

  const externalSearchButton = showExternalSearchButton && (
    <div
      className={`${handles.externalSearchButtonWrapper} bw1 bl b--muted-4 flex items-center `}
    >
      <button
        className={`${iconClasses ?? ''} ${withModifiers(
          'searchBarIcon',
          'external-search'
        )}  flex items-center h-100 pointer pv0 nr5 ph5 bn c-link`}
        onClick={onGoToSearchPage}
      >
        <SearchIcon />
      </button>
    </div>
  )

  const suffix = (
    <div className={`${handles.suffixWrapper} flex h-100`}>
      {clearButton}
      {internalSearchButton}
      {externalSearchButton}
    </div>
  )

  const prefix = (
    <span
      className={`${iconClasses} ${withModifiers('searchBarIcon', 'prefix')} `}
    >
      <SearchIcon />
    </span>
  )

  const classContainer = classNames('w-100 flex', {
    [handles.compactMode]: compactMode,
  })

  if (inputType === 'search') {
    // <form> tag is needed for iOS:
    // https://stackoverflow.com/a/26287843
    return (
      <form
        action="#"
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          e.nativeEvent.stopImmediatePropagation()
        }}
        className={handles.autoCompleteOuterContainer}
      >
        <div className={classContainer}>
          <InputSearch
            ref={inputRef}
            size="large"
            value={value}
            {...restProps}
            error={Boolean(inputErrorMessage)}
            errorMessage={inputErrorMessage}
            onSubmit={onGoToSearchPage}
          />
        </div>
      </form>
    )
  }

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

export default AutocompleteInput
