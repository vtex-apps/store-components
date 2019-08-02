import React, { Fragment, useMemo } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { graphql } from 'react-apollo'
import { Spinner } from 'vtex.styleguide'
import { Link, useRuntime } from 'vtex.render-runtime'

import autocomplete from '../queries/autocomplete.gql'

import styles from '../styles.css'

const MIN_RESULTS_WIDTH = 320

const WrappedSpinner = () => (
  <div className="w-100 flex justify-center">
    <div className="w3 ma0">
      <Spinner />
    </div>
  </div>
)

const getImageUrl = image => {
  const imageUrl = (image.match(/https?:(.*?)"/g) || [''])[0]
  return imageUrl.replace(/https?:/, '').replace(/-25-25/g, '-50-50')
}

const getLinkProps = element => {
  let page = 'store.product'
  let params = { slug: element.slug, id: element.productId }
  let query = ''
  const terms = element.slug.split('/')

  if (element.criteria) {
    page = 'store.search'
    params = { term: terms[0] }
    query = `map=c,ft&rest=${terms.slice(1).join(',')}`
  }

  return { page, params, query }
}

const highlightClass = (highlightedIndex, index) => {
  return highlightedIndex === index ? 'bg-muted-5' : ''
}

/** List of search results to be displayed*/
const ResultsList = ({
  parentContainer,
  isOpen,
  data = {}, // when inputValue is '', query is skipped and value is undefined
  inputValue,
  closeMenu,
  onClearInput,
  getItemProps,
  getMenuProps,
  highlightedIndex,
}) => {
  const items = data.autocomplete ? data.autocomplete.itemsReturned : []
  const {
    hints: { mobile },
  } = useRuntime()

  const listStyle = useMemo(
    () => ({
      width: Math.max(
        MIN_RESULTS_WIDTH,
        (parentContainer.current && parentContainer.current.offsetWidth) || 0
      ),
    }),
    [parentContainer.current, isOpen]
  )

  const listClassNames = classnames(
    styles.resultsList,
    'z-max w-100 bl-ns bb br-ns bw1 b--muted-4 bg-base c-on-base t-body left-0 list pv4 ph0 mv0',
    mobile ? 'fixed' : 'absolute',
    { dn: !isOpen || !inputValue }
  )

  const listItemClassNames = classnames(styles.resultsItem, 'pa4 outline-0')

  const handleItemClick = () => {
    onClearInput()
    closeMenu()
  }

  return (
    <div style={listStyle}>
      <ul className={listClassNames} {...getMenuProps()}>
        {isOpen ? (
          data.loading ? (
            <div className={listItemClassNames}>
              <WrappedSpinner />
            </div>
          ) : (
            <Fragment>
              <li
                {...getItemProps({
                  key: 'ft' + inputValue,
                  item: { term: inputValue },
                  index: 0,
                  onClick: handleItemClick,
                })}
              >
                <Link
                  page="store.search"
                  params={{ term: inputValue }}
                  query="map=ft"
                  className={`${listItemClassNames} pointer db w-100 ${highlightClass(
                    highlightedIndex,
                    0
                  )}`}
                >
                  <FormattedMessage
                    id="store/search.searchFor"
                    values={{
                      term: (
                        <span className={styles.searchTerm}> "{inputValue}"</span>
                      ),
                    }}
                  />
                </Link>
              </li>

              {items.map((item, index) => {
                return (
                  <li
                    {...getItemProps({
                      key: item.name + index,
                      index: index + 1,
                      item,
                      onClick: handleItemClick,
                    })}
                  >
                    <Link
                      {...getLinkProps(item)}
                      className={`${listItemClassNames} pointer ${highlightClass(
                        highlightedIndex,
                        index + 1
                      )} ${item.thumb ? 'flex justify-start' : ' db w-100'}`}
                    >
                      {item.thumb && (
                        <img
                          width={50}
                          height={50}
                          alt={item.name}
                          className={`${styles.resultsItemImage} mr4`}
                          src={getImageUrl(item.thumb)}
                        />
                      )}
                      <div className="flex justify-start items-center">
                        {item.name}
                      </div>
                    </Link>
                  </li>
                )
              })}
            </Fragment>
          )
        ) : null}
      </ul>
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
  /** Downshift specific prop*/
  highlightedIndex: PropTypes.number,
  /** Search query*/
  inputValue: PropTypes.string.isRequired,
  /** Closes the options box. */
  closeMenu: PropTypes.func,
  /** Clears the input */
  onClearInput: PropTypes.func,
  /** Downshift function */
  getItemProps: PropTypes.func,
}

const ResultsListWithData = graphql(autocomplete, {
  skip: ({ inputValue }) => !inputValue,
  options: props => ({
    variables: {
      inputValue: props.inputValue,
    },
  }),
})(ResultsList)

export default ResultsListWithData
