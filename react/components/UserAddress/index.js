import PropTypes from 'prop-types'
import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose, pathOr } from 'ramda'
import { ExtensionPoint, useChildBlock } from 'vtex.render-runtime'
import { address as addressQuery } from 'vtex.store-resources/Queries'

import { IconLocationMarker } from 'vtex.store-icons'
import Container from '../Container'

const AddressInfo = ({ inverted, inline, orderForm, intl }) => {
  const { shippingData } = orderForm
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
    ['pickupPointCheckedIn', 'friendlyName'],
    orderForm
  )

  const hasModal = !!useChildBlock({ id: 'modal' })

  return (
    <div className={`flex ${inline ? 'items-end' : 'items-center flex-auto'}`}>
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
                id="store/user-address.pickup"
                values={{ name: friendlyName }}
              />
            ) : (
              <FormattedMessage id="store/user-address.order" />
            )}
          </div>
          <div className="truncate">{displayAddress}</div>
        </div>
      </div>
      {hasModal && (
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
            <ExtensionPoint
              id="modal"
              centered
              buttonLabel={intl.formatMessage({
                id: 'store/user-address.change',
              })}
              buttonClass={
                inverted ? 'c-on-base--inverted' : 'c-action-primary'
              }
            />
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

const UserAddress = ({ variation, intl, addressQuery }) => {
  const { orderForm } = addressQuery
  const { shippingData } = orderForm || {}

  if (!orderForm || !shippingData || !shippingData.address) {
    return null
  }

  const isInline = variation === 'inline'
  const isInverted = !isInline

  return isInline ? (
    <div
      className="ph5"
      style={{
        maxWidth: '30rem',
      }}
    >
      {
        <AddressInfo
          intl={intl}
          inverted={isInverted}
          inline={isInline}
          orderForm={orderForm}
        />
      }
    </div>
  ) : (
    <div className="bg-base--inverted c-on-base--inverted flex ph5 pointer pv3">
      <Container className="flex justify-center w-100 left-0">
        <div className="w-100 mw9 flex">
          <AddressInfo
            intl={intl}
            inverted={isInverted}
            inline={isInline}
            orderForm={orderForm}
          />
        </div>
      </Container>
    </div>
  )
}

UserAddress.propTypes = {
  variation: PropTypes.oneOf(['inline', 'bar']).isRequired,
  orderForm: PropTypes.object.isRequired,
}

const withAddressQuery = graphql(addressQuery, {
  name: 'addressQuery',
})

export default compose(
  injectIntl,
  withAddressQuery
)(UserAddress)
