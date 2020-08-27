import React, { useRef, useEffect } from 'react'
import classNames from 'classnames'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.styleguide"' has no exported member ... Remove this comment to see the full error message
import { Input } from 'vtex.styleguide'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.render-runtime"' has no exported mem... Remove this comment to see the full error message
import { ExtensionPoint, useChildBlock } from 'vtex.render-runtime'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { IconSearch, IconClose } from 'vtex.store-icons'

const DISPLAY_MODES = [
  'clear-button',
  'search-and-clear-buttons',
  'search-button',
]

/** Midleware component to adapt the styleguide/Input to be used by the Downshift */
const CSS_HANDLES = [
  'autoCompleteOuterContainer',
  'compactMode',
  'externalSearchButtonWrapper',
  'paddingInput',
  'searchBarClearIcon',
  'searchBarIcon',
  'searchBarSearchIcon',
  'suffixWrapper',
]

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

type AutocompleteInputProps = {
  autoComplete?: string
  id?: string
  onBlur?: (...args: any[]) => any
  onChange?: (...args: any[]) => any
  onKeyDown?: (...args: any[]) => any
  value?: string
  openMenu?: (...args: any[]) => any
  placeholder?: string
  compactMode?: boolean
  onClearInput?: (...args: any[]) => any
  hasIconLeft?: boolean
  iconClasses?: string
  iconBlockClass?: string
  autoFocus?: boolean
  onGoToSearchPage: (...args: any[]) => any
  submitOnIconClick?: boolean
  displayMode?: any // TODO: PropTypes.oneOf(DISPLAY_MODES)
  inputErrorMessage?: string
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
  displayMode = 'clear-button',
  openMenu,
  inputErrorMessage,
  ...restProps
}: AutocompleteInputProps) => {
  const inputRef = useRef(null)
  const handles = useCssHandles(CSS_HANDLES)

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
      if (compactMode) {
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        inputRef.current.placeholder = ''
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        inputRef.current.classList.add(handles.paddingInput)
      }
    }

    changeClassInput()
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    autoFocus && inputRef.current.focus()
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
      className={`${iconClasses || ''} ${applyModifiers(
        handles.searchBarIcon,
        'clear'
      )} flex items-center pointer bn bg-transparent outline-0 pv0 pl0 pr3`}
      style={{
        visibility: hasValue ? 'visible' : 'hidden',
      }}
      // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      onClick={() => onClearInput()}
    >
      <CloseIcon />
    </button>
  )

  const internalSearchButton = showInternalSearchButton && (
    <button
      className={`${iconClasses || ''} ${applyModifiers(
        handles.searchBarIcon,
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
        className={`${iconClasses || ''} ${applyModifiers(
          handles.searchBarIcon,
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
      className={`${iconClasses} ${applyModifiers(
        handles.searchBarIcon,
        'prefix'
      )} `}
    >
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

export default AutocompleteInput
