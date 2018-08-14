import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AutocompleteInput from './AutocompleteInput'
import ResultsLits from './ResultsList'
import DownshiftComponent from 'downshift'

import { NoSSR } from 'render'

/** Midleware component to adapt the styleguide/Input to be used by the Downshift*/
export default class Downshift extends Component {
  static propTypes = {
    /** Empty placeholder to be used on the input */
    emptyPlaceholder: PropTypes.string,
    /** Placeholder to be used on the input */
    placeholder: PropTypes.string,
    /** If is mobile search mode */
    isMobileSearchMode: PropTypes.bool,
  }

  static contextTypes = {
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
    const { placeholder, emptyPlaceholder, isMobileSearchMode } = this.props
    const fallback = (<AutocompleteInput placeholder={placeholder} />)
    return (
      <NoSSR onSSR={fallback}>
        <DownshiftComponent>
          {({
            getInputProps,
            inputValue,
            selectedItem,
            highlightedIndex,
            isOpen,
            closeMenu,
          }) => (
            <div className="w-100">
              {
                <AutocompleteInput
                  isMobileSearchMode={isMobileSearchMode}
                  closeMenu={closeMenu}
                  {...getInputProps({ placeholder })}
                  onKeyDown={event => {
                    this.handleEnterPress(event)
                    closeMenu()
                  }}
                />
              }
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
        </DownshiftComponent>
      </NoSSR>
    )
  }
}
