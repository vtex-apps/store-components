import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose, pathOr } from 'ramda'

import { IconLocationMarker } from 'vtex.store-icons'
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

    const isPickup = addressType === 'pickup'
    const friendlyName = pathOr(
      '',
      ['pickupPointQuery', 'pickupPoint', 'friendlyName'],
      this.props
    )

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
            <IconLocationMarker size={27} viewBox={'0 0 21 27'} />
          </div>
          <div className="flex flex-auto flex-column">
            <div
              className={`t-small ${
                inverted ? 'c-on-base--inverted' : 'c-muted-2'
              }`}
            >
              {isPickup ? (
                <FormattedMessage
                  id="user-address.pickup"
                  values={{ name: friendlyName }}
                />
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

const withShippingDataQuery = graphql(
  gql`
    query {
      minicart @client {
        orderForm
      }
    }
  `,
  {
    props: ({ data: { minicart } }) => ({
      orderForm:
        minicart && minicart.orderForm ? JSON.parse(minicart.orderForm) : {},
    }),
  }
)

const withPickupPointQuery = graphql(
  gql`
    query pickupPoint($id: String!) {
      pickupPoint(id: $id) {
        friendlyName
      }
    }
  `,
  {
    skip: ({ orderForm: { checkedInPickupPointId, isCheckedIn } }) =>
      !checkedInPickupPointId || !isCheckedIn,
    options: ({ orderForm: { checkedInPickupPointId } }) => ({
      variables: {
        id: checkedInPickupPointId,
      },
    }),
    name: 'pickupPointQuery',
  }
)

export default compose(
  withShippingDataQuery,
  withPickupPointQuery
)(UserAddress)
