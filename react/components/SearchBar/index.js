import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchBar from './components/SearchBar'
import { injectIntl, intlShape } from 'react-intl'

const SEARCH_DELAY_TIME = 500

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

    if (this.props.attemptPageTypeSearch) {
      window.location.href = `/${search}`
      return
    }

    // This param is only useful to track terms searched
    // See: https://support.google.com/analytics/answer/1012264
    const paramForSearchTracking = '&_q=' + search

    this.setState({ inputValue: '' })
    this.context.navigate({
      page: 'store.search',
      params: { term: search },
      query: 'map=ft' + paramForSearchTracking,
      fallbackToWindowLocation: false,
    })
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
    const {
      intl,
      compactMode,
      hasIconLeft,
      iconClasses,
      autoFocus,
      maxWidth,
      attemptPageTypeSearch,
      placeholder = intl.formatMessage({
        id: 'store/search.placeholder',
      }),
    } = this.props

    const { shouldSearch, inputValue } = this.state

    return (
      <SearchBar
        autoFocus={autoFocus}
        placeholder={placeholder}
        shouldSearch={shouldSearch}
        inputValue={inputValue}
        onClearInput={this.handleClearInput}
        onGoToSearchPage={this.handleGoToSearchPage}
        onMakeSearch={this.handleMakeSearch}
        onInputChange={this.handleInputChange}
        compactMode={compactMode}
        hasIconLeft={hasIconLeft}
        iconClasses={iconClasses}
        maxWidth={maxWidth}
        attemptPageTypeSearch={attemptPageTypeSearch}
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
  iconClasses: PropTypes.string,
  /** Identify if the search input should autofocus or not */
  autoFocus: PropTypes.bool,
  /** Max width of the search bar */
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Uses the term the user has inputted to try to navigate to the proper
   * page type (e.g. a department, a brand, a category)
   */
  attemptPageTypeSearch: PropTypes.bool,
}

export default injectIntl(SearchBarContainer)
