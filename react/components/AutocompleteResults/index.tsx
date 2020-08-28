import React, { Fragment, useMemo, FC } from 'react'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { graphql, ChildDataProps } from 'react-apollo'
import { Spinner } from 'vtex.styleguide'
import { Link, useRuntime } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

// This import should NOT be removed
import './styles.css'
import autocomplete from './queries/autocomplete.gql'

type ItemProps = {
  productId?: string
  thumb?: string
  name?: string
  href?: string
  slug: string
  criteria?: string
}

type Response = {
  autocomplete?: {
    itemsReturned?: any[]
  }
}

type Variables = { inputValue: string }

type InputProps = {
  parentContainer?: any
  highlightedIndex?: number
  inputValue: string
  closeMenu: (...args: any[]) => any
  onClearInput: (...args: any[]) => any
  getItemProps: (...args: any[]) => any
  customSearchPageUrl?: string
  isOpen?: boolean
  getMenuProps: (...args: any[]) => any
  attemptPageTypeSearch?: boolean
}

type ChildProps = ChildDataProps<InputProps, Response, Variables>

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

const getImageUrl = (image: string) => {
  const [imageUrl] = image.match(/https?:(.*?)"/g) ?? ['']

  return imageUrl.replace(/https?:/, '').replace(/-25-25/g, '-50-50')
}

const getLinkProps = (element: ItemProps) => {
  let page = 'store.product'
  let params: Record<string, string | undefined> = {
    slug: element.slug,
    id: element.productId,
  }

  let query = ''
  const terms = element.slug.split('/')

  if (element.criteria) {
    // This param is only useful to track terms searched
    // See: https://support.google.com/analytics/answer/1012264
    const paramForSearchTracking = `&_c=${terms[0]}`

    page = 'store.search'

    params = { term: terms.join('/') }
    query = `map=c,ft${paramForSearchTracking}`
  }

  return { page, params, query }
}

/** List of search results to be displayed */
const AutocompleteResults: FC<ChildProps> = ({
  parentContainer,
  isOpen,
  // when inputValue is '', query is skipped and value is undefined
  data,
  inputValue,
  closeMenu,
  onClearInput,
  getItemProps,
  getMenuProps,
  highlightedIndex,
  attemptPageTypeSearch,
  customSearchPageUrl,
}) => {
  const items = data?.autocomplete?.itemsReturned ?? []
  const {
    hints: { mobile },
  } = useRuntime()

  const handles = useCssHandles(CSS_HANDLES)

  const listStyle = useMemo(
    () => ({
      width: Math.max(
        MIN_RESULTS_WIDTH,
        parentContainer?.current.offsetWidth ?? 0
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
  const renderSearchByClick = (inputValue: string) => {
    if (customSearchPageUrl) {
      return (
        <Link
          className={getListItemClassNames({
            itemIndex: 0,
            highlightedIndex,
          })}
          to={customSearchPageUrl.replace(/\$\{term\}/g, inputValue)}
        >
          {fullTextSearchLabel}
        </Link>
      )
    }

    return (
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
          data?.loading ? (
            <div className={getListItemClassNames({})}>
              <WrappedSpinner />
            </div>
          ) : (
            <Fragment>
              <li
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

// eslint-disable-next-line @typescript-eslint/ban-types
const AutocompleteResultsWithData = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(autocomplete, {
  skip: ({ inputValue }) => !inputValue,
  options: props => ({
    variables: {
      inputValue: props.inputValue,
    },
  }),
})(AutocompleteResults)

export default AutocompleteResultsWithData
