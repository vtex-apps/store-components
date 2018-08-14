import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Downshift from './components/Downshift'
import { injectIntl } from 'react-intl'

import SearchMobile from './components/SearchMobile'

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
      <div className="vtex-searchbar w-100">
        <Downshift
          placeholder={placeholder}
          emptyPlaceholder={emptyPlaceholder}
          isMobileSearchMode={isSearchMode}
        />
      </div>
    )
  }
}

export default injectIntl(SearchBar)
