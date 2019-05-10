import React, { Fragment } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Spinner } from 'vtex.styleguide'
import { Link, useRuntime } from 'vtex.render-runtime'

import autocomplete from '../queries/autocomplete.gql'

import styles from '../styles.css'

/** List of search results to be displayed*/
const ResultsList = ({
  data,
  emptyPlaceholder,
  inputValue,
  closeMenu,
  onClearInput,
  getItemProps,
}) => {
  const items = data.autocomplete ? data.autocomplete.itemsReturned : []
  const {
    hints: { mobile },
  } = useRuntime()

  const listClassNames = classnames(
    styles.resultsList,
    'z-max w-100 pb4 bl-ns bb br-ns bw1 b--muted-4 bg-white f5 left-0',
    mobile ? 'fixed' : 'absolute'
  )

  const listItemClassNames = classnames(
    styles.resultsItem,
    'flex justify-start f5 pa4 pl6 outline-0'
  )

  const getImageUrl = image => {
    const imageUrl = (image.match(/https?:(.*?)"/g) || [''])[0]
    return imageUrl.replace(/https?:/, '').replace(/-25-25/g, '-50-50')
  }

  const getLinkProps = element => {
    let page = 'store.product'
    let params = { slug: element.slug }
    let query = ''
    const terms = element.slug.split('/')

    if (element.criteria) {
      page = 'store.search'
      params = { term: terms[0] }
      query = `map=c,ft&rest=${terms.slice(1).join(',')}`
    }

    return { page, params, query }
  }

  const renderSpinner = () => (
    <div className="w-100 flex justify-center">
      <div className="w3 ma0">
        <Spinner />
      </div>
    </div>
  )

  if (data.loading) {
    return (
      <div className={listClassNames}>
        <div className={listItemClassNames}>{renderSpinner()}</div>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className={listClassNames}>
        <div className={listItemClassNames}>{emptyPlaceholder}</div>
      </div>
    )
  }

  const handleItemClick = () => {
    onClearInput()
    closeMenu()
  }

  return (
    <div className={listClassNames}>
      <Link
        {...getItemProps({
          item: 'ft',
          onClick: handleItemClick,
        })}
        page="store.search"
        params={{ term: inputValue }}
        query="map=ft"
        className={listItemClassNames}
      >
        {inputValue}
      </Link>

      {items.map((item, index) => {
        return (
          <Fragment key={item.name + index}>
            <hr className="o-05 ma0 w-90 center" />
            <Link
              {...getItemProps({
                item,
                onClick: handleItemClick,
              })}
              {...getLinkProps(item)}
              className={listItemClassNames}
            >
              {item.thumb && (
                <img
                  alt=""
                  className={`${styles.resultsItemImage} mr4`}
                  src={getImageUrl(item.thumb)}
                />
              )}
              <div className="flex justify-start items-center">{item.name}</div>
            </Link>
          </Fragment>
        )
      })}
    </div>
  )
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
  /** Closes the options box. */
  closeMenu: PropTypes.func,
  /** Clears the input */
  onClearInput: PropTypes.func,
  selectItem: PropTypes.func,
  getItemProps: PropTypes.func,
}

const ResultsListWithData = graphql(autocomplete)(ResultsList)

export default ResultsListWithData
