import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ResultsLits from './components/ResultsList'
import AutocompleteInput from './components/AutocompleteInput'

import Downshift from 'downshift'

export default class SearchBar extends Component {
  render() {
    const { placeholder } = this.props

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
            <div>
              <AutocompleteInput {...getInputProps({ placeholder })} />
              {isOpen && inputValue !== '' ? (
                <ResultsLits
                  {...{
                    inputValue,
                    selectedItem,
                    highlightedIndex,
                    getItemProps,
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
}

SearchBar.defaultProps = {
  placeholder: 'Search',
}
