import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Link } from 'render'
import autocomplete from '../queries/autocomplete.gql'

const listClassNames =
  'vtex-results__list w-100 mt3 border-box bw1 br2 b--solid outline-0 near-black b--light-gray bg-white f5 pv4 ph6'
const listItemClassNames =
  'vtex-results__item w-95 mt1 pa1 bw1 br2 flex outline-0 near-black b--light-gray  bg-white f5 pv4 ph6 hover-b--silver '

function getImageUrl(image) {
  return (image.match(/http:(.*?)"/g) || [''])[0]
}

/** List of search results to be displayed*/
class ResultsList extends Component {
  render() {
    const { getItemProps, data, emptyPlaceholder } = this.props
    const items = data.autocomplete ? data.autocomplete.itemsReturned : []

    if (data.loading) {
      return (
        <div className={listClassNames}>
          <div className={listItemClassNames}>Loading...</div>
        </div>
      )
    }

    if (items.length === 0) {
      return (
        <div className={listClassNames}>
          <div className={listItemClassNames}>{emptyPlaceholder}</div>
        </div>
      )
    }

    return (
      <div className={listClassNames}>
        {items.map((el, index) => (
          <Link
            page={el.criteria ? 'store/search' : 'store/product'}
            params={
              el.criteria ? { term: `${el.slug}` } : { slug: `${el.slug}` }
            }
            key={el.name + index}
            {...getItemProps({
              item: el.name,
              index,
            })}
          >
            <div className={listItemClassNames}>
              {el.thumb && (
                <div className="mr4">
                  <img src={getImageUrl(el.thumb)} />
                </div>
              )}
              <div className="flex justify-center items-center">{el.name}</div>
            </div>
          </Link>
        ))}
      </div>
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
}

const ResultsListWithData = graphql(autocomplete)(ResultsList)

export default ResultsListWithData
