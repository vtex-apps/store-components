import React, { useRef, useCallback, useState, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import Downshift from 'downshift'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/debounce` if it exists or ... Remove this comment to see the full error message
import debounce from 'debounce'
import {
  // @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.render-runtime"' has no exported mem... Remove this comment to see the full error message
  NoSSR,
  useRuntime,
  // @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.render-runtime"' has no exported mem... Remove this comment to see the full error message
  ExtensionPoint,
  // @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.render-runtime"' has no exported mem... Remove this comment to see the full error message
  useChildBlock,
} from 'vtex.render-runtime'
import { Overlay } from 'vtex.react-portal'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { defineMessages, useIntl } from 'react-intl'

import styles from '../styles.css'
import AutocompleteResults from '../../AutocompleteResults'
import AutocompleteInput from './AutocompleteInput'

const CSS_HANDLES = ['searchBarInnerContainer']
const SEARCH_DELAY_TIME = 500
const AUTCOMPLETE_EXTENSION_ID = 'autocomplete-result-list'

const messages = defineMessages({
  searchTermTooShort: {
    id: 'store/search.search-term-too-short',
    defaultMessage: '',
  },
})

type Props = {
  placeholder: string
  inputValue: string
  onInputChange: (...args: any[]) => any
  onGoToSearchPage: (...args: any[]) => any
  onClearInput: (...args: any[]) => any
  compactMode?: boolean
  hasIconLeft?: boolean
  iconClasses?: string
  iconBlockClass?: string
  autoFocus?: boolean
  maxWidth?: string | number
  customSearchPageUrl?: string
  attemptPageTypeSearch?: boolean
  autocompleteAlignment?: string
  openAutocompleteOnFocus?: boolean
  blurOnSubmit?: boolean
  submitOnIconClick?: boolean
  minSearchTermLength?: number
  autocompleteFullWidth?: boolean
}

const SearchBar = ({
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
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'displayMode' does not exist on type 'Pro... Remove this comment to see the full error message
  // eslint-disable-next-line react/prop-types
  displayMode,
  minSearchTermLength,
  autocompleteFullWidth,
}: Props) => {
  const intl = useIntl()
  const container = useRef()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'navigate' does not exist on type 'Runtim... Remove this comment to see the full error message
  const { navigate } = useRuntime()
  const handles = useCssHandles(CSS_HANDLES)
  const [searchTerm, setSearchTerm] = useState(inputValue)
  const [inputErrorMessage, setInputErrorMessage] = useState()

  const debouncedSetSearchTerm = useCallback(
    debounce((newValue: any) => {
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
      let params = {
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
        // @ts-expect-error ts-migrate(2322) FIXME: Object literal may only specify known properties, ... Remove this comment to see the full error message
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

  const showInputErrorMessage = (newInputErrorMessage: any) => {
    setInputErrorMessage(newInputErrorMessage)
  }

  const hideInputErrorMessage = () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    setInputErrorMessage()
  }

  const fallback = (
    <AutocompleteInput
      placeholder={placeholder}
      // @ts-expect-error ts-migrate(2322) FIXME: Property 'onInputChange' does not exist on type 'I... Remove this comment to see the full error message
      onInputChange={onInputChange}
      inputValue={inputValue}
      hasIconLeft={hasIconLeft}
      iconClasses={iconClasses}
      iconBlockClass={iconBlockClass}
      inputErrorMessage={inputErrorMessage}
      onGoToSearchPage={onGoToSearchPage}
    />
  )

  const isAutocompleteDeclared = Boolean(
    useChildBlock({ id: AUTCOMPLETE_EXTENSION_ID })
  )

  const SelectedAutocompleteResults = useMemo(() => {
    return isAutocompleteDeclared
      ? (props: any) => (
          <ExtensionPoint id={AUTCOMPLETE_EXTENSION_ID} {...props} />
        )
      : (props: any) => <AutocompleteResults {...props} />
  }, [isAutocompleteDeclared])

  const autocompleteContainerRef = useRef(null)

  return (
    <div
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'undefined' is not assignable to type 'HTMLDi... Remove this comment to see the full error message
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
              className={classNames(
                'relative-m w-100',
                applyModifiers(handles.searchBarInnerContainer, [
                  isOpen ? 'opened' : '',
                  inputValue ? 'filled' : '',
                ])
              )}
            >
              <AutocompleteInput
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={autoFocus}
                compactMode={compactMode}
                onClearInput={onClearInput}
                hasIconLeft={hasIconLeft}
                iconClasses={iconClasses}
                // @ts-expect-error ts-migrate(2783) FIXME: 'onGoToSearchPage' is specified more than once, so... Remove this comment to see the full error message
                onGoToSearchPage={onGoToSearchPage}
                submitOnIconClick={submitOnIconClick}
                displayMode={displayMode}
                // @ts-expect-error ts-migrate(2322) FIXME: Property 'openAutocompleteOnFocus' does not exist ... Remove this comment to see the full error message
                openAutocompleteOnFocus={openAutocompleteOnFocus}
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
                  // @ts-expect-error ts-migrate(2345) FIXME: Object literal may only specify known properties, ... Remove this comment to see the full error message
                  onFocus: openAutocompleteOnFocus ? openMenu : undefined,
                })}
              />
              <div ref={autocompleteContainerRef} />
              <Overlay
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'undefined' is not assignable to type 'boolea... Remove this comment to see the full error message
                fullWindow={autocompleteFullWidth}
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'undefined' is not assignable to type 'Horizo... Remove this comment to see the full error message
                alignment={autocompleteAlignment}
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'HTMLElement... Remove this comment to see the full error message
                target={autocompleteContainerRef.current}
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
            </div>
          )}
        </Downshift>
      </NoSSR>
    </div>
  )
}

export default SearchBar
