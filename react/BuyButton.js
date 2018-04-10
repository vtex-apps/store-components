import { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'

import Spinner from '@vtex/styleguide/lib/Spinner'
import spinnerStyle from '@vtex/styleguide/lib/Spinner/style.css'

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

  constructor(props) {
    super(props)
    this.state = { data: { loading: true } }
  }
  
  componentDidMount() {
    this.setState( { data: graphql(productsQuery, options) } )
  }

  render() {
    const { data, maxItems, titleColor, titleText } = this.props
    const products = data['error'] ? [] : data.products
    const { sliderMounted } = this.state
    const slideSettings = this.configureSettings()

    return (
      <div className="ml7 mr7 pv4">
         { loading && (
          <div className="flex justify-around pa7">
            <div className="w3">
              <Spinner style={spinnerStyle} />
            </div>
          </div>
        )}
      </div>
    )
  }
}

Shelf.propTypes = {
  /** The quantity of products to be added to the cart */
  quantity: PropTypes.number.isRequired,
  /** The specification of wich product will be added to the cart */
  skuId:    PropTypes.string.isRequired,
  /** Wich seller is being referenced by the button */
  seller:   PropTypes.string.isRequired,
  /**  */
  salesChannel: PropTypes.string.isRequired,
  /** Should redirect or not */
  redirect: PropTypes.bool
}

export default BuyButton
