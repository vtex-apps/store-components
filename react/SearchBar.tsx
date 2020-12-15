import React, { useState, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { ModalContext } from 'vtex.modal-layout'
import { useRuntime } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'

import SearchBar, {
  CSS_HANDLES as SearchBarCssHandles,
} from './components/SearchBar/SearchBar'
import { CSS_HANDLES as AutocompleteInputCssHandles } from './components/SearchBar/AutocompleteInput'
import { SearchBarCssHandlesProvider } from './components/SearchBar/SearchBarCssHandles'
import encodeForwardSlash from './utils/encodeForwardSlash'

const { useModalDispatch } = ModalContext

export const SEARCH_BAR_CSS_HANDLES = [
  ...SearchBarCssHandles,
  ...AutocompleteInputCssHandles,
] as const

interface Props {
  /** Define when use the compact version of the component */
  compactMode?: boolean
  /** Define if the search icon is on left or right position */
  hasIconLeft?: boolean
  /** Custom classes for the search icon */
  iconClasses?: string
  /** Define if the search input should autofocus or not */
  autoFocus?: boolean
  /** Max width of the search bar */
  maxWidth?: string | number
  /**
   * Uses the term the user has inputed to try to navigate to the proper
   * page type (e.g. a department, a brand, a category)
   */
  attemptPageTypeSearch?: boolean
  /** A template for a custom url. It can have a substring ${term} used as placeholder to interpolate the searched term. (e.g. `/search?query=${term}`) */
  customSearchPageUrl?: string
  placeholder?: string
  /* Autocomplete Horizontal alignment */
  autocompleteAlignment?: 'right' | 'left' | 'center'
  /** Define if autocomplete should be open on input focus or not */
  openAutocompleteOnFocus?: boolean
  /** Define if input should blur on submit */
  blurOnSubmit?: boolean
  /** Define if icon should submit on click */
  submitOnIconClick?: boolean
  /** Minimum search term length allowed */
  minSearchTermLength?: number
  /** If true, the autocomplete will fill the whole window horizontally */
  autocompleteFullWidth?: boolean
  /** The type of the search input */
  inputType?: 'text' | 'search'
  /** Define the component display mode, such as which buttons should be visible */
  displayMode?: 'clear-button' | 'search-and-clear-buttons' | 'search-button'
  /** Define how the autocomplete component should be displayed. Possible values are: `overlay` (suggestions overlapping other components) and `container` (displays the suggestion within a container). */
  containerMode: 'overlay' | 'container'
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof SEARCH_BAR_CSS_HANDLES>
}

/**
 * Canonical search bar that uses the autocomplete endpoint to search for a specific product
 * */
function SearchBarContainer(props: Props) {
  const intl = useIntl()
  const {
    compactMode,
    hasIconLeft,
    iconClasses,
    autoFocus,
    maxWidth,
    attemptPageTypeSearch,
    customSearchPageUrl,
    placeholder = intl.formatMessage({
      id: 'store/search.placeholder',
    }),
    autocompleteAlignment = 'right',
    openAutocompleteOnFocus = false,
    containerMode = 'overlay',
    blurOnSubmit = false,
    submitOnIconClick,
    displayMode = 'clear-button',
    minSearchTermLength,
    autocompleteFullWidth = false,
    inputType = 'text',
    classes,
  } = props

  const modalDispatch = useModalDispatch()
  const [inputValue, setInputValue] = useState('')
  const { navigate } = useRuntime()

  const { handles, withModifiers } = useCssHandles(SEARCH_BAR_CSS_HANDLES, {
    classes,
  })

  const closeModal = useCallback(() => {
    if (modalDispatch) {
      modalDispatch({
        type: 'CLOSE_MODAL',
      })
    }
  }, [modalDispatch])

  const handleClearInput = useCallback(() => {
    setInputValue('')
  }, [])

  const handleInputChange = useCallback(event => {
    setInputValue(event.target.value)
  }, [])

  const handleGoToSearchPage = useCallback(() => {
    const search = encodeForwardSlash(inputValue)

    if (attemptPageTypeSearch) {
      window.location.href = `/${search}`
      closeModal()

      return
    }

    if (customSearchPageUrl) {
      navigate({
        to: customSearchPageUrl.replace(/\$\{term\}/g, search),
      })
      closeModal()

      return
    }

    // This param is only useful to track terms searched
    // See: https://support.google.com/analytics/answer/1012264
    const paramForSearchTracking = `&_q=${search}`

    setInputValue('')
    navigate({
      page: 'store.search',
      params: { term: search },
      query: `map=ft${paramForSearchTracking}`,
      fallbackToWindowLocation: false,
    })
    closeModal()
  }, [
    inputValue,
    attemptPageTypeSearch,
    customSearchPageUrl,
    navigate,
    closeModal,
  ])

  return (
    <SearchBarCssHandlesProvider
      handles={handles}
      withModifiers={withModifiers}
    >
      <SearchBar
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        placeholder={placeholder}
        inputValue={inputValue}
        onClearInput={handleClearInput}
        onGoToSearchPage={handleGoToSearchPage}
        onInputChange={handleInputChange}
        compactMode={compactMode}
        hasIconLeft={hasIconLeft}
        iconClasses={iconClasses}
        maxWidth={maxWidth}
        attemptPageTypeSearch={attemptPageTypeSearch}
        customSearchPageUrl={customSearchPageUrl}
        autocompleteAlignment={autocompleteAlignment}
        openAutocompleteOnFocus={openAutocompleteOnFocus}
        blurOnSubmit={blurOnSubmit}
        submitOnIconClick={submitOnIconClick}
        displayMode={displayMode}
        minSearchTermLength={minSearchTermLength}
        autocompleteFullWidth={autocompleteFullWidth}
        inputType={inputType}
        containerMode={containerMode}
      />
    </SearchBarCssHandlesProvider>
  )
}

SearchBarContainer.schema = {
  title: 'admin/editor.search-bar.title',
}

export default SearchBarContainer
