import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchBar from './components/SearchBar'
import { injectIntl, intlShape } from 'react-intl'

import './global.css'

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
    console.log(this.state.inputValue)
    this.setState({ inputValue: '' })
    this.handleClearSearchResults()
  }

  handleGoToSearchPage = () => {
    const search = this.state.inputValue

    this.setState({ inputValue: '' })
    this.context.navigate({
      page: 'store/search',
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
    const { intl, compactMode } = this.props
    const { shouldSearch, inputValue } = this.state

    const placeholder = intl.formatMessage({
      id: 'search.placeholder',
    })
    const emptyPlaceholder = intl.formatMessage({
      id: 'search.noMatches',
    })

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
}



export default injectIntl(SearchBarContainer)
