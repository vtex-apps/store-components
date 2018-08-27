import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Downshift from './components/Downshift'
import { injectIntl } from 'react-intl'

import './global.css'

/** Canonical search bar that uses the autocomplete endpoint to search for a specific product*/
class SearchBar extends Component {
  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

  render() {
    const placeholder = this.context.intl.formatMessage({ id: 'search.placeholder' })
    const emptyPlaceholder = this.context.intl.formatMessage({ id: 'search.noMatches' })

    return (
      <div className="vtex-searchbar w-100">
        <Downshift
          placeholder={placeholder}
          emptyPlaceholder={emptyPlaceholder}
        />
      </div>
    )
  }
}

export default injectIntl(SearchBar)
