import React, { useRef, useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Downshift from 'downshift'
import debounce from 'debounce'
import { NoSSR } from 'vtex.render-runtime'
import { Overlay } from 'vtex.react-portal'
import { useRuntime } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import AutocompleteInput from './AutocompleteInput'
import ResultsLists from './ResultsList'

const CSS_HANDLES = ['searchBarContainer', 'searchBarInnerContainer']
const SEARCH_DELAY_TIME = 500

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
  iconsProps,
}) => {
  const container = useRef()
  const { navigate } = useRuntime()
  const handles = useCssHandles(CSS_HANDLES)
  const [searchTerm, setSearchTerm] = useState(inputValue)

  const debouncedSetSearchTerm = useCallback(
    debounce(newValue => {
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
        const paramForSearchTracking = '&_c=' + terms[0]

        page = 'store.search'
        params = { term: terms[0] }
        query =
          `map=c,ft&rest=${terms.slice(1).join(',')}` + paramForSearchTracking
      }

      navigate({ page, params, query })
    },
    [navigate, attemptPageTypeSearch, customSearchPageUrl]
  )

  const fallback = (
    <AutocompleteInput
      placeholder={placeholder}
      onInputChange={onInputChange}
      inputValue={inputValue}
      hasIconLeft={hasIconLeft}
      iconClasses={iconClasses}
      iconBlockClass={iconBlockClass}
      iconsProps={iconsProps}
    />
  )

  return (
    <div
      ref={container}
      className={classNames('w-100 mw7 pv4', handles.searchBarContainer)}
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
          }) => (
            <div
              className={classNames(
                'relative-m w-100',
                handles.searchBarInnerContainer
              )}
            >
              <AutocompleteInput
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={autoFocus}
                compactMode={compactMode}
                onClearInput={onClearInput}
                hasIconLeft={hasIconLeft}
                iconClasses={iconClasses}
                iconsProps={iconsProps}
                {...getInputProps({
                  onKeyDown: event => {
                    // Only call default search function if user doesn't
                    // have any item highlighted in the menu options
                    if (event.key === 'Enter' && highlightedIndex === null) {
                      onGoToSearchPage()
                      closeMenu()
                    }
                  },
                  placeholder,
                  value: inputValue,
                  onChange: onInputChange,
                })}
              />
              <Overlay alignment="right">
                <ResultsLists
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

SearchBar.propTypes = {
  /** Placeholder to be used on the input */
  placeholder: PropTypes.string.isRequired,
  /** Current value of the input */
  inputValue: PropTypes.string.isRequired,
  /** Function to handle input changes */
  onInputChange: PropTypes.func.isRequired,
  /** Function to direct the user to the searchPage */
  onGoToSearchPage: PropTypes.func.isRequired,
  /** Function to clear the input */
  onClearInput: PropTypes.func.isRequired,
  /** Indentify when use the compact version of the component */
  compactMode: PropTypes.bool,
  /** Identify if the search icon is on left or right position */
  hasIconLeft: PropTypes.bool,
  /** Custom classes for the search icon */
  iconClasses: PropTypes.string,
  /** Block class for the search icon */
  iconBlockClass: PropTypes.string,
  /** Identify if the search input should autofocus or not */
  autoFocus: PropTypes.bool,
  /** Max width of the search bar */
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** A template for a custom url. It can have a substring ${term} used as placeholder to interpolate the searched term. (e.g. `/search?query=${term}`) */
  customSearchPageUrl: PropTypes.string,
  iconBlockClass: PropTypes.string,
  attemptPageTypeSearch: PropTypes.bool,
  iconsProps: PropTypes.shape({
    /** Icon size, aspect ratio 1:1 */
    size: PropTypes.number,
    /** Icon viewBox. Default 0, 0, 16, 16 */
    viewBox: PropTypes.string,
    /** Define if will be used a active or muted className */
    isActive: PropTypes.bool,
    /** Active color class */
    activeClassName: PropTypes.string,
    /** Muted color class */
    mutedClassName: PropTypes.string,
  }),
}

export default SearchBar
