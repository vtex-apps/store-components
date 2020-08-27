import React, { Fragment, useMemo } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { graphql } from 'react-apollo'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.styleguide"' has no exported member ... Remove this comment to see the full error message
import { Spinner } from 'vtex.styleguide'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.render-runtime"' has no exported mem... Remove this comment to see the full error message
import { Link, useRuntime } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

// This import should NOT be removed
// @ts-expect-error ts-migrate(6133) FIXME: 'styles' is declared but its value is never read.
// eslint-disable-next-line no-unused-vars
import styles from './styles.css'
import autocomplete from './queries/autocomplete.gql'

const MIN_RESULTS_WIDTH = 320
const CSS_HANDLES = [
  'resultsItem',
  'resultsList',
  'searchTerm',
  'resultsItemImage',
  'spinnerContainer',
  'spinnerInnerContainer',
  'resultsItemName',
]

const getImageUrl = (image: any) => {
  const [imageUrl] = image.match(/https?:(.*?)"/g) || ['']

  return imageUrl.replace(/https?:/, '').replace(/-25-25/g, '-50-50')
}

const getLinkProps = (element: any) => {
  let page = 'store.product'
  let params = { slug: element.slug, id: element.productId }
  let query = ''
  const terms = element.slug.split('/')

  if (element.criteria) {
    // This param is only useful to track terms searched
    // See: https://support.google.com/analytics/answer/1012264
    const paramForSearchTracking = `&_c=${terms[0]}`

    page = 'store.search'
    // @ts-expect-error ts-migrate(2322) FIXME: Object literal may only specify known properties, ... Remove this comment to see the full error message
    params = { term: terms.join('/') }
    query = `map=c,ft${paramForSearchTracking}`
  }

  return { page, params, query }
}

type Props = {
  data?: {
    autocomplete?: {
      itemsReturned?: itemProps[]
    }
    loading: boolean
  }
  highlightedIndex?: number
  inputValue: string
  closeMenu?: (...args: any[]) => any
  onClearInput?: (...args: any[]) => any
  getItemProps?: (...args: any[]) => any
  customSearchPageUrl?: string
  isOpen?: boolean
  getMenuProps?: (...args: any[]) => any
  attemptPageTypeSearch?: boolean
}

/** List of search results to be displayed */
const AutocompleteResults = ({
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'parentContainer' does not exist on type ... Remove this comment to see the full error message
  // eslint-disable-next-line react/prop-types
  parentContainer,
  isOpen,
  // @ts-expect-error ts-migrate(2741) FIXME: Property 'loading' is missing in type '{}' but req... Remove this comment to see the full error message
  data = {}, // when inputValue is '', query is skipped and value is undefined
  inputValue,
  closeMenu,
  onClearInput,
  getItemProps,
  getMenuProps,
  highlightedIndex,
  attemptPageTypeSearch,
  customSearchPageUrl,
}: Props) => {
  const items = data.autocomplete ? data.autocomplete.itemsReturned : []
  const {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'hints' does not exist on type 'Runtime'.
    hints: { mobile },
  } = useRuntime()

  const handles = useCssHandles(CSS_HANDLES)

  const listStyle = useMemo(
    () => ({
      width: Math.max(
        MIN_RESULTS_WIDTH,
        // eslint-disable-next-line react/prop-types
        (parentContainer.current && parentContainer.current.offsetWidth) || 0
      ),
    }),
    /* with the isOpen here this will be called 
    only when you open or close the ResultList */
    [parentContainer]
  )

  const listClassNames = classnames(
    handles.resultsList,
    'z-max w-100 bl-ns bb br-ns bw1 b--muted-4 bg-base c-on-base t-body left-0 list pv4 ph0 mv0 list overflow-y-auto',
    mobile ? 'fixed' : 'absolute',
    { dn: !isOpen || !inputValue }
  )

  const handleItemClick = () => {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    onClearInput()
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    closeMenu()
  }

  const getListItemClassNames = ({
    itemIndex = -1,

    // eslint-disable-next-line no-shadow
    highlightedIndex,

    hasThumb,
  }: any = {}) => {
    const highlightClass = highlightedIndex === itemIndex ? 'bg-muted-5' : ''

    return `pointer pa4 outline-0 ${handles.resultsItem} ${highlightClass} ${
      hasThumb ? 'flex justify-start' : 'db w-100'
    }`
  }

  const WrappedSpinner = () => (
    <div className={`w-100 flex justify-center ${handles.spinnerContainer}`}>
      <div className={`${handles.spinnerInnerContainer} w3 ma0`}>
        <Spinner />
      </div>
    </div>
  )

  const fullTextSearchLabel = (
    <FormattedMessage
      id="store/search.searchFor"
      values={{
        term: <span className={handles.searchTerm}>{`"${inputValue}"`}</span>,
      }}
    />
  )

  // eslint-disable-next-line no-shadow
  const renderSearchByClick = (inputValue: any) => {
    return customSearchPageUrl ? (
      <Link
        className={getListItemClassNames({
          itemIndex: 0,
          highlightedIndex,
        })}
        to={customSearchPageUrl.replace(/\$\{term\}/g, inputValue)}
      >
        {fullTextSearchLabel}
      </Link>
    ) : (
      <Link
        page="store.search"
        params={{ term: inputValue }}
        query="map=ft"
        className={getListItemClassNames({
          itemIndex: 0,
          highlightedIndex,
        })}
      >
        {fullTextSearchLabel}
      </Link>
    )
  }

  return (
    <div style={listStyle}>
      {/* @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message */}
      <ul className={listClassNames} {...getMenuProps()}>
        {isOpen ? (
          data.loading ? (
            <div className={getListItemClassNames({})}>
              <WrappedSpinner />
            </div>
          ) : (
            <Fragment>
              <li
                // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
                {...getItemProps({
                  key: `ft${inputValue}`,
                  item: { term: inputValue },
                  index: 0,
                  onClick: handleItemClick,
                })}
              >
                {attemptPageTypeSearch ? (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <a
                    href="#"
                    onClick={event => event.preventDefault()}
                    className={getListItemClassNames({
                      itemIndex: 0,
                      highlightedIndex,
                    })}
                  >
                    {fullTextSearchLabel}
                  </a>
                ) : (
                  renderSearchByClick(inputValue)
                )}
              </li>

              {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
              {items.map((item, index) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <li
                    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
                    {...getItemProps({
                      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                      key: item.name + index,
                      index: index + 1,
                      item,
                      onClick: handleItemClick,
                    })}
                  >
                    <Link
                      {...getLinkProps(item)}
                      className={getListItemClassNames({
                        itemIndex: index + 1,
                        highlightedIndex,
                        hasThumb: !!item.thumb,
                      })}
                    >
                      {item.thumb && (
                        <img
                          width={50}
                          height={50}
                          alt={item.name}
                          className={`${handles.resultsItemImage} mr4`}
                          src={getImageUrl(item.thumb)}
                        />
                      )}
                      <div
                        className={`${handles.resultsItemName} flex justify-start items-center`}
                      >
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

type itemProps = {
  thumb?: string
  name?: string
  href?: string
  slug?: string
  criteria?: string
}

// @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
const itemProps: PropTypes.Requireable<itemProps> = PropTypes.shape({
  /** Image of the product */
  thumb: PropTypes.string,
  /** Name of the product */
  name: PropTypes.string,
  /** Link to the product */
  href: PropTypes.string,
  /** Slug of the product */
  slug: PropTypes.string,
  /** Criteria of the product */
  criteria: PropTypes.string,
})

const AutocompleteResultsWithData = graphql(autocomplete, {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'inputValue' does not exist on type '{}'.
  skip: ({ inputValue }) => !inputValue,
  options: props => ({
    variables: {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'inputValue' does not exist on type '{}'.
      inputValue: props.inputValue,
    },
  }),
  // @ts-expect-error ts-migrate(2345) FIXME: Property 'inputValue' is missing in type 'PropsWit... Remove this comment to see the full error message
})(AutocompleteResults)

export default AutocompleteResultsWithData
