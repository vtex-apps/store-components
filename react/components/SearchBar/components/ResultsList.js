import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Link } from 'render'
import autocomplete from '../queries/autocomplete.gql'

const listClassNames =
  'vtex-results__list z-max absolute w-100 mt3 border-box bw1 br2 b--solid outline-0 near-black b--light-gray bg-white f5 pv4 ph6'
const listItemClassNames =
  'vtex-results__item dim pointer w-95 mt1 pa1 near-black f5 pv4 ph6'

function getImageUrl(image) {
  return (image.match(/http:(.*?)"/g) || [''])[0]
}

function mountSearchParams(slug) {
  const params = {}

  const regex = /^\/(.*)\//g

  slug.replace(regex, '$1')
    .toLowerCase().split('/').map((el, i) => {
      params[`term${i === 0 ? '' : i}`] = el
    })

  return params
}

/** List of search results to be displayed*/
class ResultsList extends Component {
  render() {
    const { getItemProps, data, emptyPlaceholder, inputValue } = this.props
    const items = data.autocomplete ? data.autocomplete.itemsReturned : []

    if (data.loading) {
      return (
        <ol className={listClassNames}>
          <li className={listItemClassNames}>Loading...</li>
        </ol>
      )
    }

    if (items.length === 0) {
      return (
        <ol className={listClassNames}>
          <li className={listItemClassNames}>{emptyPlaceholder}</li>
        </ol>
      )
    }

    return (
      <ol className={listClassNames}>
        <li className={listItemClassNames}>
          <Link
            page="store/search"
            params={{ term: `${encodeURI(inputValue)}` }}
          >
            {inputValue}
          </Link>
        </li>
        {items.map((el, index) => (
          <li key={el.name + index} className={listItemClassNames}>
            <Link
              page={el.criteria ? 'store/search1' : 'store/product'}
              params={
                el.criteria
                  ? { ...mountSearchParams((encodeURI(el.slug))) }
                  : { slug: `${encodeURI(el.slug)}` }
              }
              {...getItemProps({
                item: el.name,
                index,
              })}
              className="flex"
            >
              {el.thumb && (
                <div className="mr4">
                  <img
                    className="vtex-results__item-image"
                    src={getImageUrl(el.thumb)}
                  />
                </div>
              )}
              <div className="flex justify-center items-center">{el.name}</div>
            </Link>
          </li>
        ))}
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
  /** Downshift specific function */
  getItemProps: PropTypes.func.isRequired,
  /** Message that will be displayed when there is no result ot be shown */
  emptyPlaceholder: PropTypes.string.isRequired,
  /** Downshift specific prop*/
  highlightedIndex: PropTypes.number,
  /** Search query*/
  inputValue: PropTypes.string.isRequired,
}

const ResultsListWithData = graphql(autocomplete)(ResultsList)

export default ResultsListWithData
