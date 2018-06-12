import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import autocomplete from '../queries/autocomplete.gql'
import { Spinner } from 'vtex.styleguide'
import { Link } from 'render'

const listClassNames =
  'vtex-results__list z-max absolute w-100 mt3 border-box bw1 br2 b--solid outline-0 near-black b--light-gray bg-white f5 pv4 ph6'
const listItemClassNames =
  'vtex-results__item dim pointer flex justify-start mt1 pa1 near-black f5 pv4 ph6'

function getImageUrl(image) {
  return (image.match(/http:(.*?)"/g) || [''])[0]
}

/** List of search results to be displayed*/
class ResultsList extends Component {
  getLinkProps(element) {
    let page = 'store/product'
    let params = { slug: element.slug }
    let query = ''
    const terms = element.slug.split('/')
    if (element.criteria) {
      page = 'store/search'
      params = { term: terms[0] }
      query = `map=c,ft&Q=${terms.slice(1).join(',')}`
    }
    return { page, params, query }
  }

  renderSpinner() {
    return (
      <div className="w-100 flex justify-center">
        <div className="w3 ma0">
          <Spinner />
        </div>
      </div>
    )
  }

  render() {
    const { data, emptyPlaceholder, inputValue } = this.props
    const items = data.autocomplete ? data.autocomplete.itemsReturned : []
    if (data.loading) {
      return (
        <ol className={listClassNames}>
          {this.renderSpinner()}
        </ol>
      )
    }

    if (!items.length) {
      return (
        <ol className={listClassNames}>
          <li className={listItemClassNames}>{emptyPlaceholder}</li>
        </ol>
      )
    }

    return (
      <ol className={listClassNames}>
        <Link
          page="store/search"
          params={{ term: `${encodeURI(inputValue)}` }}
          query="map=ft"
          className="clear-link dim">
          <li className={`${listItemClassNames}`}>
            {inputValue}
          </li>
        </Link>
        {items.map((el, index) => {
          return (
            <Link key={el.name + index} {...this.getLinkProps(el)} className="clear-link dim">
              <li className={listItemClassNames}>
                {el.thumb && (
                  <div className="mr4">
                    <img className="vtex-results__item-image" src={getImageUrl(el.thumb)} />
                  </div>
                )}
                <div className="flex justify-start items-center">{el.name}</div>
              </li>
            </Link>
          )
        })}
      </ol>
    )
  }
}

const itemProps = PropTypes.shape({
  /** Image of the product*/
  thumb: PropTypes.string,
  /** Name of the product*/
  name: PropTypes.string,
  /** Link to the product*/
  href: PropTypes.string,
  /** Slug of the product*/
  slug: PropTypes.string,
  /** Criteria of the product*/
  criteria: PropTypes.string,
})

ResultsList.propTypes = {
  /** Graphql data response. */
  data: PropTypes.shape({
    autocomplete: PropTypes.shape({
      itemsReturned: PropTypes.arrayOf(itemProps),
    }),
    loading: PropTypes.bool.isRequired,
  }),
  /** Message that will be displayed when there is no result ot be shown */
  emptyPlaceholder: PropTypes.string.isRequired,
  /** Downshift specific prop*/
  highlightedIndex: PropTypes.number,
  /** Search query*/
  inputValue: PropTypes.string.isRequired,
}

const ResultsListWithData = graphql(autocomplete)(ResultsList)

export default ResultsListWithData
