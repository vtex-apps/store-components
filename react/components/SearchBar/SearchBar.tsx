import React, { useRef, useCallback, useState, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import Downshift, { DownshiftProps } from 'downshift'
import debounce from 'debounce'
import {
  NoSSR,
  useRuntime,
  ExtensionPoint,
  useChildBlock,
} from 'vtex.render-runtime'
import { Overlay } from 'vtex.react-portal'
import { defineMessages, useIntl } from 'react-intl'

import styles from './SearchBar.css'
import AutocompleteResults from '../../AutocompleteResults'
import type { Props as AutocompleteResultsProps } from '../../AutocompleteResults'
import AutocompleteInput from './AutocompleteInput'
import { useSearchBarCssHandles } from './SearchBarCssHandles'

export const CSS_HANDLES = ['searchBarInnerContainer'] as const

const SEARCH_DELAY_TIME = 1000
const AUTOCOMPLETE_EXTENSION_ID = 'autocomplete-result-list'

const messages = defineMessages({
  searchTermTooShort: {
    id: 'store/search.search-term-too-short',
    defaultMessage: '',
  },
})

interface Props {
  /** Placeholder to be used on the input */
  placeholder: string
  /** Current value of the input */
  inputValue: string
  /** Function to handle input changes */
  onInputChange: DownshiftProps<any>['onChange']
  /** Function to direct the user to the searchPage */
  onGoToSearchPage: () => void
  /** Function to clear the input */
  onClearInput: () => void
  /** Indentify when use the compact version of the component */
  compactMode?: boolean
  /** Identify if the search icon is on left or right position */
  hasIconLeft?: boolean
  /** Custom classes for the search icon */
  iconClasses?: string
  /** Block class for the search icon */
  iconBlockClass?: string
  /** Identify if the search input should autofocus or not */
  autoFocus?: boolean
  /** Max width of the search bar */
  maxWidth?: string | number
  /** A template for a custom url. It can have a substring ${term} used as placeholder to interpolate the searched term. (e.g. `/search?query=${term}`) */
  customSearchPageUrl?: string
  /** Uses the term the user has inputed to try to navigate to the proper
   * page type (e.g. a department, a brand, a category)
   */
  attemptPageTypeSearch?: boolean
  /* Autocomplete Horizontal alignment */
  autocompleteAlignment?: 'right' | 'left' | 'center'
  /** Identify if autocomplete should be open on input focus or not */
  openAutocompleteOnFocus?: boolean
  /** Identify if input should blur on submit */
  blurOnSubmit?: boolean
  /** Identify if icon should submit on click */
  submitOnIconClick?: boolean
  /** Minimum search term length allowed */
  minSearchTermLength?: number
  /** If true, the autocomplete will fill the whole window horizontally */
  autocompleteFullWidth?: boolean
  /** The type of the search input */
  inputType?: 'text' | 'search'
  /** Define the component display mode,such as which buttons should be visible */
  displayMode?: 'clear-button' | 'search-and-clear-buttons' | 'search-button'
  /** Define how the autocomplete component should be displayed. Possible values are: `overlay` (suggestions overlapping other components) and `container` (displays the suggestion within a container). */
  containerMode: 'overlay' | 'container'
}

function SearchBar({
  placeholder,
  onInputChange,
  onGoToSearchPage,
  onClearInput,
  inputValue,
  compactMode,
  hasIconLeft,
  iconClasses,
  iconBlockClass,
  autoFocus,
  maxWidth,
  attemptPageTypeSearch,
  customSearchPageUrl,
  autocompleteAlignment,
  openAutocompleteOnFocus,
  blurOnSubmit,
  submitOnIconClick,
  displayMode,
  minSearchTermLength,
  autocompleteFullWidth,
  inputType,
  containerMode = 'overlay',
}: Props) {
  const { withModifiers } = useSearchBarCssHandles()
  const intl = useIntl()
  const container = useRef<HTMLDivElement>(null)
  const { navigate } = useRuntime()
  const [searchTerm, setSearchTerm] = useState(inputValue)
  const [inputErrorMessage, setInputErrorMessage] = useState<
    string | undefined
  >()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearchTerm = useCallback(
    debounce((newValue: string) => {
      setSearchTerm(newValue)
    }, SEARCH_DELAY_TIME),
    []
  )

  useEffect(() => {
    debouncedSetSearchTerm(inputValue)
  }, [debouncedSetSearchTerm, inputValue])

  const onSelect = useCallback(
    element => {
      if (!element) {
        return
      }

      if (element.term) {
        if (attemptPageTypeSearch) {
          window.location.href = `/${element.term}`

          return
        }

        if (customSearchPageUrl) {
          navigate({
            to: customSearchPageUrl.replace(/\$\{term\}/g, element.term),
          })

          return
        }

        navigate({
          page: 'store.search',
          params: { term: element.term },
          query: 'map=ft',
        })

        return
      }

      let page = 'store.product'
      let params: Record<string, string> = {
        slug: element.slug,
        id: element.productId,
      }

      let query = ''
      const terms = element.slug.split('/')

      if (element.criteria) {
        // This param is only useful to track terms searched
        // See: https://support.google.com/analytics/answer/1012264
        const paramForSearchTracking = `&_c=${terms[0]}`

        page = 'store.search'
        params = { term: terms.join('/') }
        query = `map=c,ft${paramForSearchTracking}`
      }

      navigate({ page, params, query })
    },
    [navigate, attemptPageTypeSearch, customSearchPageUrl]
  )

  const validateInput = () => {
    if (minSearchTermLength && inputValue.length < minSearchTermLength) {
      return intl.formatMessage(messages.searchTermTooShort)
    }

    return null
  }

  const showInputErrorMessage = (newInputErrorMessage: string) => {
    setInputErrorMessage(newInputErrorMessage)
  }

  const hideInputErrorMessage = () => {
    setInputErrorMessage(undefined)
  }

  const fallback = (
    <AutocompleteInput
      placeholder={placeholder}
      onInputChange={onInputChange}
      inputValue={inputValue}
      hasIconLeft={hasIconLeft}
      iconClasses={iconClasses}
      iconBlockClass={iconBlockClass}
      inputErrorMessage={inputErrorMessage}
      onGoToSearchPage={onGoToSearchPage}
      onClearInput={onClearInput}
    />
  )

  const isAutocompleteDeclared = Boolean(
    useChildBlock({ id: AUTOCOMPLETE_EXTENSION_ID })
  )

  const SelectedAutocompleteResults = useMemo(() => {
    if (isAutocompleteDeclared) {
      const AutoCompleteResultsWrapper = (props: AutocompleteResultsProps) => (
        <ExtensionPoint id={AUTOCOMPLETE_EXTENSION_ID} {...props} />
      )

      return AutoCompleteResultsWrapper
    }

    const AutoCompleteResultsWrapper = (props: AutocompleteResultsProps) => (
      <AutocompleteResults {...props} />
    )

    return AutoCompleteResultsWrapper
  }, [isAutocompleteDeclared])

  const autocompleteContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={container}
      className={classNames('w-100 mw7 pv4', styles.searchBarContainer)}
      style={{
        ...(maxWidth && {
          maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        }),
      }}
    >
      <NoSSR onSSR={fallback}>
        <Downshift onSelect={onSelect}>
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            selectedItem,
            highlightedIndex,
            isOpen,
            closeMenu,
            openMenu,
          }) => (
            <div
              className={`relative-m w-100 ${withModifiers(
                'searchBarInnerContainer',
                [isOpen ? 'opened' : '', inputValue ? 'filled' : '']
              )}`}
            >
              <AutocompleteInput
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={autoFocus}
                compactMode={compactMode}
                hasIconLeft={hasIconLeft}
                iconClasses={iconClasses}
                openAutocompleteOnFocus={openAutocompleteOnFocus}
                submitOnIconClick={submitOnIconClick}
                displayMode={displayMode}
                inputType={inputType}
                openMenu={openMenu}
                inputErrorMessage={inputErrorMessage}
                {...getInputProps({
                  onKeyDown: event => {
                    // Only call default search function if user doesn't
                    // have any item highlighted in the menu options
                    if (event.key === 'Enter' && highlightedIndex === null) {
                      const errorMessage = validateInput()

                      if (errorMessage) {
                        showInputErrorMessage(errorMessage)

                        return
                      }

                      if (blurOnSubmit) {
                        event.currentTarget.blur()
                      }

                      onGoToSearchPage()
                      closeMenu()
                    } else {
                      hideInputErrorMessage()
                    }
                  },
                  placeholder,
                  value: inputValue,
                  onChange: onInputChange,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error this exists
                  onFocus: openAutocompleteOnFocus ? openMenu : undefined,
                })}
                onClearInput={onClearInput}
                onGoToSearchPage={onGoToSearchPage}
              />
              <div ref={autocompleteContainerRef} />

              {containerMode === 'container' ? (
                <SelectedAutocompleteResults
                  parentContainer={container ?? undefined}
                  {...{
                    attemptPageTypeSearch,
                    isOpen,
                    getMenuProps,
                    inputValue: searchTerm,
                    getItemProps,
                    selectedItem,
                    highlightedIndex,
                    closeMenu,
                    onClearInput,
                    customSearchPageUrl,
                  }}
                />
              ) : (
                <Overlay
                  fullWindow={autocompleteFullWidth}
                  alignment={autocompleteAlignment}
                  target={autocompleteContainerRef.current ?? undefined}
                >
                  <SelectedAutocompleteResults
                    parentContainer={container}
                    {...{
                      attemptPageTypeSearch,
                      isOpen,
                      getMenuProps,
                      inputValue: searchTerm,
                      getItemProps,
                      selectedItem,
                      highlightedIndex,
                      closeMenu,
                      onClearInput,
                      customSearchPageUrl,
                    }}
                  />
                </Overlay>
              )}
            </div>
          )}
        </Downshift>
      </NoSSR>
    </div>
  )
}

export default SearchBar
