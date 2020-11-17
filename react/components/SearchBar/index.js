import React, { useState, useCallback } from 'react'
import { useIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { ModalContext } from 'vtex.modal-layout'
import { useRuntime } from 'vtex.render-runtime'

import SearchBar from './components/SearchBar'
import encodeForwardSlash from '../../utils/encodeForwardSlash'

const { useModalDispatch } = ModalContext

/**
 * Canonical search bar that uses the autocomplete endpoint to search for a specific product
 * */
function SearchBarContainer(props) {
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
    blurOnSubmit = false,
    submitOnIconClick,
    displayMode = 'clear-button',
    minSearchTermLength,
    autocompleteFullWidth = false,
    inputType = 'text',
  } = props

  const modalDispatch = useModalDispatch()
  const [inputValue, setInputValue] = useState('')
  const { navigate } = useRuntime()

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
    />
  )
}

SearchBarContainer.schema = {
  title: 'admin/editor.search-bar.title',
}

SearchBarContainer.propTypes = {
  /** Indentify when use the compact version of the component */
  compactMode: PropTypes.bool,
  /** Identify if the search icon is on left or right position */
  hasIconLeft: PropTypes.bool,
  /** Custom classes for the search icon */
  iconClasses: PropTypes.string,
  /** Identify if the search input should autofocus or not */
  autoFocus: PropTypes.bool,
  /** Max width of the search bar */
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Uses the term the user has inputed to try to navigate to the proper
   * page type (e.g. a department, a brand, a category)
   */
  attemptPageTypeSearch: PropTypes.bool,
  /** A template for a custom url. It can have a substring ${term} used as placeholder to interpolate the searched term. (e.g. `/search?query=${term}`) */
  customSearchPageUrl: PropTypes.string,
  placeholder: PropTypes.string,
  /* Autocomplete Horizontal alignment */
  autocompleteAlignment: PropTypes.string,
  /** Identify if autocomplete should be open on input focus or not */
  openAutocompleteOnFocus: PropTypes.bool,
  /** Identify if input should blur on submit */
  blurOnSubmit: PropTypes.bool,
  /** Identify if icon should submit on click */
  submitOnIconClick: PropTypes.bool,
  displayMode: PropTypes.string,
  /** Minimum search term length allowed */
  minSearchTermLength: PropTypes.number,
  /** If true, the autocomplete will fill the whole window horizontally */
  autocompleteFullWidth: PropTypes.bool,
  /** The type of the search input */
  inputType: PropTypes.oneOf(['text', 'search']),
}

export default SearchBarContainer
