import './global.css'

import React, { Component, Fragment } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import ContentLoader from 'react-content-loader'
import PropTypes from 'prop-types'
import { Button, Input } from 'vtex.styleguide'

import ShippingTable from './components/ShippingTable'
import getShippingEstimates from './queries/getShippingEstimates.gql'

/**
 * Shipping simulator component
 *
 * Display an input for the zipcode
 */
class ShippingSimulator extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    client: PropTypes.object,
    skuId: PropTypes.string,
    seller: PropTypes.number,
    country: PropTypes.string.isRequired,
    /** Component and content loader styles */
    styles: PropTypes.object,
  }

  static Loader = (loaderProps = {}) => (
    <div className="vtex-shipping-simulator">
      <ContentLoader
        className="vtex-shipping-simulator-loader"
        style={{
          width: '100%',
          height: '100%',
        }}
        width={500}
        height={40}
        preserveAspectRatio="xMinYMin meet"
        {...loaderProps}>
        <rect
          height="100%"
          width="7em"
          {...loaderProps['vtex-shipping-simulator__zipcode-label--loader']}
        />
        <rect
          height="100%"
          width="15em"
          x="8em"
          {...loaderProps['vtex-shipping-simulator__input--loader']}
        />
      </ContentLoader>
    </div>
  )

  state = {
    zipcodeValue: '',
    shipping: {},
    loading: false,
  }

  handleChange = e => {
    let zipcodeValue = e.target.value || ''

    zipcodeValue = zipcodeValue.replace(/\D/g, '')

    if (zipcodeValue.length > 8) {
      zipcodeValue = zipcodeValue.substring(0, 8)
    }

    if (zipcodeValue.length > 5) {
      zipcodeValue = zipcodeValue.replace(/(\d{5})(\d+)/, '$1-$2')
    }

    this.setState({
      zipcodeValue,
    })
  }

  handleClick = e => {
    e.preventDefault()

    const { skuId, seller, country } = this.props

    this.setState({
      loading: true,
    })

    this.props.client
      .query({
        query: getShippingEstimates,
        variables: {
          country,
          postalCode: this.state.zipcodeValue,
          items: [
            {
              quantity: '1',
              id: skuId,
              seller,
            },
          ],
        },
      })
      .then(result => {
        this.setState({
          shipping: result.data.shipping,
        })
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        this.setState({
          loading: false,
        })
      })
  }

  formatMessage = id => {
    return this.props.intl.formatMessage({ id })
  }

  render() {
    const { shipping, zipcodeValue, loading } = this.state

    if (!this.props.seller || !this.props.skuId) {
      return <ShippingSimulator.Loader {...this.props.styles} />
    }

    return (
      <Fragment>
        <form className="vtex-shipping-simulator t-small items-center flex c-on-base">
          <label className="vtex-shipping-simulator__zipcode-label flex items-center h-100">
            {this.formatMessage('shipping.label')}
            <Input
              className="vtex-shipping-simulator__input"
              name="zipcode"
              type="text"
              onChange={this.handleChange}
              value={zipcodeValue}
            />
          </label>
          <Button
            className="vtex-shipping-simulator__cta"
            onClick={this.handleClick}
            disabled={zipcodeValue.length < 9}
            isLoading={loading}>
            OK
          </Button>
        </form>

        <ShippingTable shipping={shipping} />
      </Fragment>
    )
  }
}

export default compose(
  withApollo,
  injectIntl
)(ShippingSimulator)
