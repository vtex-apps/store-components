import React, { Component } from 'react'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"vtex.render-runtime"' has no exported mem... Remove this comment to see the full error message
import { Link } from 'vtex.render-runtime'

// @ts-expect-error ts-migrate(6133) FIXME: 'RECTANGULAR' is declared but its value is never r... Remove this comment to see the full error message
import { RECTANGULAR, SQUARED } from '../constants'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../images/rectangular-placehol... Remove this comment to see the full error message
import rectangularPlaceholder from '../images/rectangular-placeholder.svg'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../images/squared-placeholder.... Remove this comment to see the full error message
import squaredPlaceholder from '../images/squared-placeholder.svg'
import categoriesHighlights from '../categoriesHighlights.css'

type Props = {
  name: string
  image?: string
  shape?: any // TODO: PropTypes.oneOf([RECTANGULAR, SQUARED])
}

/**
 * CategoryCard is a component responsible to display an image of a category
 * and provides the link to the category specified by its name.
 */
// eslint-disable-next-line react/prefer-stateless-function
class CategoryCard extends Component<Props> {
  render() {
    const { name, image, shape } = this.props

    return (
      <div className={`${categoriesHighlights[`${shape}Card`]} shadow-1 ma1`}>
        {/* TODO: Redirect to the page of the category specified by its name */}

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link>
          {image ? (
            <img
              src={image}
              alt={name}
              className={`${categoriesHighlights[`${shape}CardImage`]}`}
            />
          ) : (
            <img
              src={
                shape === SQUARED ? squaredPlaceholder : rectangularPlaceholder
              }
              alt=""
              className={`${categoriesHighlights[`${shape}CardImage`]}`}
            />
          )}
        </Link>
      </div>
    )
  }
}

export default CategoryCard
