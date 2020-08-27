import React, { useState, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { ModalContext } from 'vtex.modal-layout'
import { useRuntime } from 'vtex.render-runtime'

import SearchBar from './components/SearchBar'

const { useModalDispatch } = ModalContext

type Props = {
  compactMode?: boolean
  hasIconLeft?: boolean
  iconClasses?: string
  autoFocus?: boolean
  maxWidth?: string | number
  attemptPageTypeSearch?: boolean
  customSearchPageUrl?: string
  placeholder?: string
  autocompleteAlignment?: string
  openAutocompleteOnFocus?: boolean
  blurOnSubmit?: boolean
  submitOnIconClick?: boolean
  displayMode?: string
  minSearchTermLength?: number
  autocompleteFullWidth?: boolean
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
    blurOnSubmit = false,
    submitOnIconClick,
    displayMode = 'clear-button',
    minSearchTermLength,
    autocompleteFullWidth = false,
  } = props

  const modalDispatch = useModalDispatch()
  const [inputValue, setInputValue] = useState('')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'navigate' does not exist on type 'Runtim... Remove this comment to see the full error message
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
    const search = inputValue

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
      // @ts-expect-error ts-migrate(2322) FIXME: Property 'displayMode' does not exist on type 'Int... Remove this comment to see the full error message
      displayMode={displayMode}
      minSearchTermLength={minSearchTermLength}
      autocompleteFullWidth={autocompleteFullWidth}
    />
  )
}

SearchBarContainer.schema = {
  title: 'admin/editor.search-bar.title',
}

export default SearchBarContainer
