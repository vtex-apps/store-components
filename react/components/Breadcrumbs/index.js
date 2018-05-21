import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'render'

/**
 * Breadcrumb Component.
 */
export class Breadcrumb extends Component {
  render() {
    const { search, slug } = this.props

    return (
      <div className="vtex.breadcrumbs pa4">
        <Link className="vtex.breadcrumbs__link ph2" page="store">
          Home
        </Link>
        /
        {search && (
          <Link
            className="vtex.breadcrumbs__link ph2"
            page="store/search"
            params={{ term: `${encodeURI(search).replace('/', '%2F')}` }}
          >
            {search.replace('/', ' ')}
          </Link>
        )}
        {slug && (
          <Link
            className="vtex.breadcrumbs__link ph2"
            page="store/product"
            params={{ slug: `${encodeURI(slug)}` }}
          >
            {search}
          </Link>
        )}
      </div>
    )
  }
}

Breadcrumb.propTypes = {
  /** Search term used **/
  search: PropTypes.string.isRequired,
  /** Product's slug**/
  slug: PropTypes.string.isRequired,
}

export default Breadcrumb
