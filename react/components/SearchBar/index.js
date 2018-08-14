import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import { injectIntl } from 'react-intl'

import AutocompleteInput from './components/AutocompleteInput'
import SearchMobile from './components/SearchMobile'

import { NoSSR } from 'render'

import './global.css'

/** Canonical search bar that uses the autocomplete endpoint to search for a specific product*/
class SearchBar extends Component {
  static propTypes = {
    isSearchMode: PropTypes.bool,
    isMobileMode: PropTypes.bool,
    toogleSearchMode: PropTypes.func,
  }

  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

  render() {
    const placeholder = this.context.intl.formatMessage({ id: 'search.placeholder' })
    const emptyPlaceholder = this.context.intl.formatMessage({ id: 'search.noMatches' })
    const fallback = (<AutocompleteInput placeholder={placeholder} />)
    const { isMobileMode, isSearchMode, toogleSearchMode } = this.props

    if (isMobileMode) {
      return (
        <SearchMobile
          placeholder={placeholder}
          emptyPlaceholder={emptyPlaceholder}
          isSearchMode={isSearchMode}
          toogleSearchMode={toogleSearchMode}
        />
      )
    }

    return (
      <div className="vtex-searchbar">
        <NoSSR onSSR={fallback}>
          <Downshift
            placeholder={placeholder}
            emptyPlaceholder={emptyPlaceholder}
            isMobileSearchMode={isSearchMode}
          />
        </NoSSR>
      </div>
    )
  }
}

export default injectIntl(SearchBar)
