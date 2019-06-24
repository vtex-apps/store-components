import React, { useRef, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AutocompleteInput from './AutocompleteInput'
import ResultsLists from './ResultsList'
import Downshift from 'downshift'
import { NoSSR } from 'vtex.render-runtime'
import { Overlay } from 'vtex.react-portal'
import { useRuntime } from 'vtex.render-runtime'

import styles from '../styles.css'

const MIN_RESULTS_WIDTH = 400

const SearchBar = ({
  placeholder,
  onMakeSearch,
  onInputChange,
  onGoToSearchPage,
  onClearInput,
  shouldSearch,
  inputValue,
  compactMode,
  hasIconLeft,
  iconClasses,
  autoFocus,
  maxWidth,
}) => {
  const container = useRef()
  const { navigate } = useRuntime()

  const menuStyle = useMemo(
    () => ({
      width: Math.max(
        MIN_RESULTS_WIDTH,
        container.current && container.current.offsetWidth
      ),
    }),
    [container.current]
  )

  const onSelect = useCallback(
    element => {
      if (!element) {
        return
      }

      if (element.term) {
        navigate({
          page: 'store.search',
          params: { term: element.term },
          query: 'map=ft',
        })
        return
      }

      let page = 'store.product'
      let params = { slug: element.slug }
      let query = ''
      const terms = element.slug.split('/')

      if (element.criteria) {
        page = 'store.search'
        params = { term: terms[0] }
        query = `map=c,ft&rest=${terms.slice(1).join(',')}`
      }

      navigate({ page, params, query })
    },
    [navigate]
  )

  const fallback = (
    <AutocompleteInput
      placeholder={placeholder}
      onMakeSearch={onMakeSearch}
      onInputChange={onInputChange}
      inputValue={inputValue}
      hasIconLeft={hasIconLeft}
      iconClasses={iconClasses}
    />
  )

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
          }) => (
            <div className="relative-m w-100">
              <AutocompleteInput
                autoFocus={autoFocus}
                compactMode={compactMode}
                onClearInput={onClearInput}
                hasIconLeft={hasIconLeft}
                iconClasses={iconClasses}
                {...getInputProps({
                  onKeyDown: event => {
                    // Only call default search function if user doesn't
                    // have any item highlighted in the menu options
                    if (event.key === 'Enter' && highlightedIndex === null) {
                      onGoToSearchPage()
                    }
                  },
                  placeholder,
                  value: inputValue,
                  onChange: onInputChange,
                })}
              />
              <Overlay alignment="right">
                <div style={menuStyle}>
                  <ResultsLists
                    {...{
                      isOpen,
                      getMenuProps,
                      inputValue,
                      getItemProps,
                      selectedItem,
                      highlightedIndex,
                      closeMenu,
                      onClearInput,
                    }}
                  />
                </div>
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
  /** Variable that controls when the search should be made */
  shouldSearch: PropTypes.bool.isRequired,
  /** Function that controls when the search should be executed */
  onMakeSearch: PropTypes.func.isRequired,
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
  /** Identify if the search input should autofocus or not */
  autoFocus: PropTypes.bool,
  /** Max width of the search bar */
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default SearchBar
