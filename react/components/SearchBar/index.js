import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchBar from './components/SearchBar'
import { injectIntl, intlShape } from 'react-intl'

/** Canonical search bar that uses the autocomplete endpoint to search for a specific product*/
class SearchBarContainer extends Component {
  state = {
    inputValue: '',
  }

  handleClearInput = () => {
    this.setState({ inputValue: '' })
  }

  handleGoToSearchPage = () => {
    const search = this.state.inputValue
    const { customSearchPageUrl } = this.props

    if (this.props.attemptPageTypeSearch) {
      window.location.href = `/${search}`
      return
    }

    if (customSearchPageUrl) {
      this.context.navigate({
        to: customSearchPageUrl.replace(/\$\{term\}/g, search),
      })

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

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value })
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
      customSearchPageUrl,
      iconsProps,
      placeholder = intl.formatMessage({
        id: 'store/search.placeholder',
      }),
    } = this.props

    const { inputValue } = this.state

    return (
      <SearchBar
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        placeholder={placeholder}
        inputValue={inputValue}
        onClearInput={this.handleClearInput}
        onGoToSearchPage={this.handleGoToSearchPage}
        onInputChange={this.handleInputChange}
        compactMode={compactMode}
        hasIconLeft={hasIconLeft}
        iconClasses={iconClasses}
        maxWidth={maxWidth}
        attemptPageTypeSearch={attemptPageTypeSearch}
        customSearchPageUrl={customSearchPageUrl}
        iconsProps={iconsProps}
      />
    )
  }
}

SearchBarContainer.contextTypes = {
  navigate: PropTypes.func,
}

SearchBarContainer.schema = {
  title: 'admin/editor.search-bar.title',
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
  /** Uses the term the user has inputed to try to navigate to the proper
   * page type (e.g. a department, a brand, a category)
   */
  attemptPageTypeSearch: PropTypes.bool,
  /** A template for a custom url. It can have a substring ${term} used as placeholder to interpolate the searched term. (e.g. `/search?query=${term}`) */
  customSearchPageUrl: PropTypes.string,
  placeholder: PropTypes.string,
  iconsProps: PropTypes.shape({
    /** Icon size, aspect ratio 1:1 */
    size: PropTypes.number,
    /** Icon viewBox. Default 0, 0, 16, 16 */
    viewBox: PropTypes.string,
  }),
}

export default injectIntl(SearchBarContainer)
