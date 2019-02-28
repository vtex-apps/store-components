import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchBar from './components/SearchBar'
import { injectIntl, intlShape, defineMessages } from 'react-intl'

const SEARCH_DELAY_TIME = 500

const messages = defineMessages({
  search: {
      id: 'search.placeholder',
      defaultMessage: ''
  },
  empty: {
    id: 'search.noMatches',
    defaultMessage: ''
  },
  cancelLabel: {
    id: 'searchBar.button.cancel.label',
    defaultMessage: '',
  },
  loading: {
    id: 'loading',
    defaultMessage: '',
  }
});


/** Canonical search bar that uses the autocomplete endpoint to search for a specific product*/
class SearchBarContainer extends Component {
  timeoutId = null

  state = {
    shouldSearch: false,
    inputValue: '',
  }

  handleClearSearchResults = () => {
    this.setState({ shouldSearch: false })

    this.timeoutId = null
  }

  handleClearInput = () => {
    this.setState({ inputValue: '' })
    this.handleClearSearchResults()
  }

  handleGoToSearchPage = () => {
    const search = this.state.inputValue

    this.setState({ inputValue: '' })
    this.context.navigate({
      page: 'store.search',
      params: { term: search },
      query: 'map=ft',
      fallbackToWindowLocation: false,
    })
  }

  handleEnterPress = event => {
    if (event.key === 'Enter') {
      this.handleGoToSearchPage()
    }
  }

  handleMakeSearch = () => {
    this.handleClearSearchResults()

    this.timeoutId = setTimeout(() => {
      this.setState({ shouldSearch: true })
    }, SEARCH_DELAY_TIME)
  }

  handleInputChange = event => {
    const value = event.target.value

    this.setState({ inputValue: value })

    if (value.length < 2) {
      this.handleClearSearchResults()
    } else this.handleMakeSearch()
  }

  render() {
    const { intl, compactMode, hasIconLeft, iconClasses } = this.props
    const { shouldSearch, inputValue } = this.state

    const placeholder = intl.formatMessage(messages.search)
    const emptyPlaceholder = intl.formatMessage(messages.empty)

    return (
      <SearchBar
        placeholder={placeholder}
        emptyPlaceholder={emptyPlaceholder}
        shouldSearch={shouldSearch}
        inputValue={inputValue}
        onClearInput={this.handleClearInput}
        onGoToSearchPage={this.handleGoToSearchPage}
        onEnterPress={this.handleEnterPress}
        onMakeSearch={this.handleMakeSearch}
        onInputChange={this.handleInputChange}
        compactMode={compactMode}
        hasIconLeft={hasIconLeft}
        iconClasses={iconClasses}
      />
    )
  }
}

SearchBarContainer.contextTypes = {
  navigate: PropTypes.func,
}

SearchBarContainer.propTypes = {
  /* Internationalization */
  intl: intlShape.isRequired,
  /** Indentify when use the compact version of the component */
  compactMode: PropTypes.bool,
  /** Identify if the search icon is on left or right position */
  hasIconLeft: PropTypes.bool,
  /** Custom classes for the search icon */
  iconClasses: PropTypes.string
}

export default injectIntl(SearchBarContainer)
