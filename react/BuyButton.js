import { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'

import { FormattedMessage, injectIntl, intlShape } from 'react-intl'

import Spinner from '@vtex/styleguide/lib/Spinner'
import spinnerStyle from '@vtex/styleguide/lib/Spinner/style.css'
import Button from '@vtex/styleguide/lib/Button'

import productsQuery from './graphql/productsQuery.graphql'

const options = {
  options: ({
    category = '',
    specificationFilters = '',
    priceRange = '',
    collection = '',
    orderBy = '',
    from = 0,
    to = 8,
    salesChannel = '',
  }) => ({
    variables: {
      category,
      specificationFilters: specificationFilters ? [specificationFilters] : [],
      priceRange,
      collection,
      orderBy,
      from,
      to: to - 1,
      salesChannel,
    },
    ssr: false,
  }),
}

/**
 * BuyButton Component. Adds a list of itens to the cart.
 */
class BuyButton extends Component {
  static contextTypes = {
    culture: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = { data: { loading: true } }
  }

  render() {
    const { maxItems, data, titleColor, titleText } = this.props

    console.log(data['error'] ? data['error'] : data.products)

    return (
      <Button primary>
        <div className="flex">
          {data.loading && (
            <div style={{ width: '25px', paddingRight: '7px' }}>
              <Spinner secondary style={spinnerStyle} />
            </div>
          )}
          <FormattedMessage id="buy" />
        </div>
      </Button>
    )
  }
}

BuyButton.propTypes = {
  /** The quantity of products to be added to the cart */
  quantity: PropTypes.number.isRequired,
  /** The specification of wich product will be added to the cart */
  skuId: PropTypes.string.isRequired,
  /** Wich seller is being referenced by the button */
  seller: PropTypes.string.isRequired,
  /**  */
  salesChannel: PropTypes.string.isRequired,
  /** Should redirect or not */
  redirect: PropTypes.bool,
  /** intl property to format data */
  intl: intlShape.isRequired,
}

export default injectIntl(graphql(productsQuery, options)(BuyButton))
