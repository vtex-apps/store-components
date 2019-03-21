import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import ChangeAddressIcon from './ChangeAddressIcon'
import Container from '../Container'

class UserAddress extends React.Component {
  static propTypes = {
    variation: PropTypes.oneOf(['inline', 'bar']).isRequired,
    onChange: PropTypes.func,
    orderForm: PropTypes.object.isRequired,
  }

  renderAddressInfo = ({ inverted, inline }) => {
    const {
      orderForm: { shippingData },
      onChange,
    } = this.props

    if (!shippingData || !shippingData.address) return

    const { street, number, complement, addressType } = shippingData.address

    const displayStreet = number ? `${street}, ${number}` : street

    const displayAddress =
      complement && complement !== ''
        ? `${displayStreet} - ${complement}`
        : `${displayStreet}`

    /** TODO: get pickupPoint name instead of address, if it's pickup
     * @author lbebber */
    const isPickup = addressType === 'pickup'

    return (
      <div
        className={`flex ${inline ? 'items-end' : 'items-center flex-auto'}`}
      >
        <div className="flex flex-auto">
          <div
            className={`mr3 flex items-center ${
              inverted ? 'c-on-base--inverted' : 'c-muted-2'
            }`}
          >
            <ChangeAddressIcon />
          </div>
          <div className="flex flex-auto flex-column">
            <div
              className={`t-small ${
                inverted ? 'c-on-base--inverted' : 'c-muted-2'
              }`}
            >
              {isPickup ? (
                <FormattedMessage id="user-address.pickup" />
              ) : (
                <FormattedMessage id="user-address.order" />
              )}
            </div>
            <div className="truncate">{displayAddress}</div>
          </div>
        </div>
        {onChange && (
          <React.Fragment>
            <div
              className={`bl bw1 mh4 ${inline ? 'nb2' : ''} ${
                inverted ? 'b--on-base--inverted' : 'b--muted-5'
              }`}
              style={{
                height: '1.5rem',
              }}
            />
            <div className="flex items-center">
              <div
                className={`t-action pointer pv3 nv3 ph4 nh4 ${
                  inverted ? 'c-on-base--inverted' : 'c-action-primary'
                }`}
                role="button"
                onClick={onChange}
              >
                <FormattedMessage id="user-address.change" />
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }

  render() {
    const { variation, orderForm } = this.props

    const { shippingData } = orderForm

    if (!shippingData || !shippingData.address) {
      return null
    }

    const isInline = variation === 'inline'
    const isInverted = !isInline

    const content = this.renderAddressInfo({
      inverted: isInverted,
      inline: isInline,
    })

    return isInline ? (
      <div
        className="ph5"
        style={{
          maxWidth: '30rem',
        }}
      >
        {content}
      </div>
    ) : (
      <div className="bg-base--inverted c-on-base--inverted flex ph5 pointer pv3">
        <Container className="flex justify-center w-100 left-0">
          <div className="w-100 mw9 flex">{content}</div>
        </Container>
      </div>
    )
  }
}

export default graphql(
  gql`
    query {
      orderForm @client {
        shippingData {
          address {
            id
            neighborhood
            complement
            number
            street
            postalCode
            city
            reference
            addressName
            addressType
          }
          availableAddresses {
            id
            neighborhood
            complement
            number
            street
            postalCode
            city
            reference
            addressName
            addressType
          }
        }
      }
    }
  `,
  {
    props: ({ data: { orderForm } }) => ({
      orderForm,
    }),
  }
)(UserAddress)
