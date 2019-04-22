import React, { Component, Fragment } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import ContentLoader from 'react-content-loader'
import PropTypes from 'prop-types'
import { Button, Input } from 'vtex.styleguide'

import ShippingTable from './components/ShippingTable'
import getShippingEstimates from './queries/getShippingEstimates.gql'

import styles from './styles.css'
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
    <div className={`${styles.shippingContainer}`}>
      <ContentLoader
        className={`${styles.shippingContainerLoader}`}
        style={{
          width: '100%',
          height: '100%',
        }}
        width={500}
        height={40}
        preserveAspectRatio="xMinYMin meet"
        {...loaderProps}
      >
        <rect
          height="100%"
          width="7em"
          {...loaderProps[`${styles.shippingZipcodeLabelLoader}`]}
        />
        <rect
          height="100%"
          width="15em"
          x="8em"
          {...loaderProps[`${styles.shippingInputLoader}`]}
        />
      </ContentLoader>
    </div>
  )

  state = {
    zipcodeValue: '',
    prevZipcode: '',
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

    this.setState({ zipcodeValue })
  }

  handleClick = e => {
    e.preventDefault()

    const { skuId, seller, country } = this.props

    this.setState(prevState => ({
      loading: true,
      prevZipcode: prevState.zipcodeValue,
    }))

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
    const { shipping, zipcodeValue, loading, prevZipcode } = this.state

    if (!this.props.seller || !this.props.skuId) {
      return <ShippingSimulator.Loader {...this.props.styles} />
    }

    return (
      <Fragment>
        <form className={`${styles.shippingContainer} t-small c-on-base`}>
          <label
            className={`${
              styles.shippingZipcodeLabel
            } c-muted-2 db t-small mb3`}
            htmlFor="shipping-zipcode"
          >
            {this.formatMessage('store/shipping.label')}
          </label>
          <div className="flex">
            <Input
              name="zipcode"
              type="text"
              id="shipping-zipcode"
              onChange={this.handleChange}
              value={zipcodeValue}
            />
            <Button
              className={`${styles.shippingCTA}`}
              onClick={this.handleClick}
              disabled={zipcodeValue.length < 9 || zipcodeValue === prevZipcode}
              size="small"
              type="submit"
              isLoading={loading}
            >
              Ok
            </Button>
          </div>
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
