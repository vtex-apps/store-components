import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import { injectIntl } from 'react-intl'

import ResultsLits from './components/ResultsList'
import AutocompleteInput from './components/AutocompleteInput'

import { NoSSR } from 'render'

import './global.css'

/** Canonical search bar that uses the autocomplete endpoint to search for a specific product*/
class SearchBar extends Component {
  static contextTypes = {
    intl: PropTypes.object.isRequired,
    navigate: PropTypes.func,
  }

  handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      this.context.navigate({
        page: 'store/search',
        params: { term: event.target.value },
        query: 'map=ft',
        fallbackToWindowLocation: false,
      })
    }
  }

  render() {
    const placeholder = this.context.intl.formatMessage({ id: 'search.placeholder' })
    const emptyPlaceholder = this.context.intl.formatMessage({ id: 'search.noMatches' })
    const fallback = (<AutocompleteInput placeholder={placeholder} />)

    return (
      <div className="vtex-searchbar">
        <NoSSR onSSR={fallback}>
          <Downshift>
            {({
              getInputProps,
              inputValue,
              selectedItem,
              highlightedIndex,
              isOpen,
              closeMenu
            }) => (
              <div className="relative">
                <AutocompleteInput
                  {...getInputProps({ placeholder })}
                  onKeyDown={event => {
                    this.handleEnterPress(event)
                    closeMenu()
                  }}
                />
                {isOpen && inputValue !== '' ? (
                  <ResultsLits
                    {...{
                      inputValue,
                      selectedItem,
                      highlightedIndex,
                      emptyPlaceholder,
                      closeMenu,
                    }}
                  />
                ) : null}
              </div>
            )}
          </Downshift>
        </NoSSR>
      </div>
    )
  }
}

export default injectIntl(SearchBar)
