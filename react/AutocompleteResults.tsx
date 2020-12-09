import React, { Fragment, useMemo } from 'react'
import type { RefObject } from 'react'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-apollo'
import { Spinner } from 'vtex.styleguide'
import { Link, useRuntime } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import type { PropGetters } from 'downshift'

import './AutocompleteResults.css'
import autocomplete from './graphql/autocomplete.gql'
import encodeForwardSlash from './utils/encodeForwardSlash'

const MIN_RESULTS_WIDTH = 320
const CSS_HANDLES = [
  'resultsItem',
  'resultsList',
  'searchTerm',
  'resultsItemImage',
  'spinnerContainer',
  'spinnerInnerContainer',
  'resultsItemName',
] as const

const getImageUrl = (image: string) => {
  const [imageUrl] = image.match(/https?:(.*?)"/g) ?? ['']

  return imageUrl.replace(/https?:/, '').replace(/-25-25/g, '-50-50')
}

const getLinkProps = (element: AutocompleteItem) => {
  const terms = element.slug.split('/')

  if (element.criteria) {
    // This param is only useful to track terms searched
    // See: https://support.google.com/analytics/answer/1012264
    const paramForSearchTracking = `&_c=${terms[0]}`

    return {
      page: 'store.search',
      params: { term: terms.join('/') },
      query: `map=c,ft${paramForSearchTracking}`,
    }
  }

  return {
    page: 'store.product',
    params: { slug: element.slug, id: element.productId },
    query: '',
  }
}

export type Props = {
  parentContainer?: RefObject<HTMLElement>
  /** Downshift specific prop */
  highlightedIndex: number | null
  /** Search query */
  inputValue: string
  /** A template for a custom url. It can have a substring ${term} used as placeholder to interpolate the searched term. (e.g. `/search?query=${term}`) */
  customSearchPageUrl?: string
  isOpen?: boolean
  attemptPageTypeSearch?: boolean
  /** Closes the options box. */
  closeMenu: () => void
  /** Clears the input */
  onClearInput: () => void
  /** Downshift function */
  getItemProps: PropGetters<AutocompleteItem | { term: string }>['getItemProps']
  getMenuProps: PropGetters<AutocompleteItem | { term: string }>['getMenuProps']
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

type AutocompleteItem = {
  thumb: string
  name: string
  href: string
  slug: string
  criteria: string
  productId: string
}

interface AutocompleteResult {
  autocomplete: {
    itemsReturned: AutocompleteItem[]
  }
}

/** List of search results to be displayed */
function AutocompleteResults({
  parentContainer,
  isOpen,
  inputValue,
  closeMenu,
  onClearInput,
  getItemProps,
  getMenuProps,
  highlightedIndex,
  attemptPageTypeSearch,
  customSearchPageUrl,
  classes,
}: Props) {
  const { data, loading } = useQuery<AutocompleteResult>(autocomplete, {
    skip: !inputValue,
    variables: { inputValue },
  })

  const items = data?.autocomplete?.itemsReturned ?? []

  const {
    hints: { mobile },
  } = useRuntime()

  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const encodedInputValue = encodeForwardSlash(inputValue)

  const listStyle = useMemo(
    () => ({
      width: Math.max(
        MIN_RESULTS_WIDTH,
        parentContainer?.current?.offsetWidth ?? 0
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
    onClearInput()
    closeMenu()
  }

  function getListItemClassNames({
    itemIndex = -1,
    // eslint-disable-next-line no-shadow
    highlightedIndex,
    hasThumb,
  }: {
    itemIndex?: number
    highlightedIndex?: number | null
    hasThumb?: boolean
  } = {}) {
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
  const renderSearchByClick = (inputValue: string) => {
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
      <ul className={listClassNames} {...getMenuProps()}>
        {isOpen ? (
          loading ? (
            <div className={getListItemClassNames({})}>
              <WrappedSpinner />
            </div>
          ) : (
            <Fragment>
              <li
                {...getItemProps({
                  key: `ft${inputValue}`,
                  item: { term: encodedInputValue },
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
                  renderSearchByClick(encodedInputValue)
                )}
              </li>

              {items.map((item, index) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <li
                    {...getItemProps({
                      key: `${item.name}${index}`,
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

export default AutocompleteResults
