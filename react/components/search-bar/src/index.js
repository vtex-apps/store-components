import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ResultsLits from './components/ResultsList'
import AutocompleteInput from './components/AutocompleteInput'

import Downshift from 'downshift'

import './search-bar.css'

/** Canonical search bar that uses the autocomplete endpoint to search for a specific product*/
export default class SearchBar extends Component {
  render() {
    const { placeholder, emptyPlaceholder } = this.props
    return (
      <div className="vtex-searchbar">
        <Downshift>
          {({
            getInputProps,
            getItemProps,
            inputValue,
            selectedItem,
            highlightedIndex,
            isOpen,
          }) => (
            <div className="relative">
              <AutocompleteInput {...getInputProps({ placeholder })} />
              {isOpen && inputValue !== '' ? (
                <ResultsLits
                  {...{
                    inputValue,
                    selectedItem,
                    highlightedIndex,
                    getItemProps,
                    emptyPlaceholder,
                  }}
                />
              ) : null}
            </div>
          )}
        </Downshift>
      </div>
    )
  }
}

SearchBar.propTypes = {
  /** Text that will be displayed on the search bar*/
  placeholder: PropTypes.string,
  /** Text that will be displayed on the result list when no result was found*/
  emptyPlaceholder: PropTypes.string,
}

SearchBar.defaultProps = {
  placeholder: 'Search',
  emptyPlaceholder: 'No matches',
}
