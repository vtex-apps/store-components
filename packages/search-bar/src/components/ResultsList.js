import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Link } from 'render'
import autocomplete from '../queries/autocomplete.gql'

const listClassNames =
  'vtex-results__list w-100 mt3 border-box bw1 br2 b--solid outline-0 near-black b--light-gray hover-b--silver bg-white f5 pv4 ph6'
const listItemClassNames =
  'vtex-results__item w-95 mt1 pa1 border-box bw1 br2 flex b--solid outline-0 near-black b--light-gray hover-b--silver bg-white f5 pv4 ph6'

function getImageUrl(image) {
  return (image.match(/http:(.*?)"/g) || [''])[0]
}

function getLinkText(href, criteria) {
  if (criteria) {
    const url = href.split('/')
    return `${url[url.length - 2]}/${url[url.length - 1]}/s`
  }

  return (href.match(/http:(.*?)"/g) || [''])[0]
}

class ResultsList extends Component {
  render() {
    const { getItemProps, data } = this.props
    const items = data.autocomplete ? data.autocomplete.itemsReturned : []

    if (data.loading) {
      return (
        <div className={listClassNames}>
          <div className={listItemClassNames}>Loading...</div>
        </div>
      )
    }

    return (
      <div className={listClassNames}>
        {items.map((el, index) => (
          <Link
            className="clear-link"
            page={el.criteria ? 'store/search' : 'store/product'}
            params={
              el.criteria
                ? { term: el.slug ? `${el.slug}/s` : getLinkText(el.href) }
                : { slug: el.slug ? `${el.slug}/p` : getLinkText(el.href) }
            }
            key={el.name + index}
            {...getItemProps({
              item: el.name,
              index,
            })}
          >
            <div className={listItemClassNames}>
              <div className="mr4">
                <img src={getImageUrl(el.thumb)} width="50" height="50" />
              </div>
              <div className="flex justify-center items-center">{el.name}</div>
            </div>
          </Link>
        ))}
      </div>
    )
  }
}

const itemProps = PropTypes.shape({
  thumb: PropTypes.string,
  name: PropTypes.string,
  href: PropTypes.string,
  slug: PropTypes.string,
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
  getItemProps: PropTypes.func.isRequired,
  highlightedIndex: PropTypes.number,
}

const ResultsListWithData = graphql(autocomplete)(ResultsList)

export default ResultsListWithData
