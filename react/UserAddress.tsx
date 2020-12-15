import React, { useEffect } from 'react'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import ADDRESS_QUERY from 'vtex.store-resources/QueryAddress'

import Container from './Container'
import AddressInfo, {
  CSS_HANDLES as AddressInfoCssHandles,
} from './components/UserAddress/AddressInfo'
import { UserAddressCssHandlesProvider } from './components/UserAddress/UserAddressCssHandles'

export const USER_ADDRESS_CSS_HANDLES = [
  'userAddressContainer',
  ...AddressInfoCssHandles,
] as const

type Props = {
  /** Define if address should be displayed in a single line or in blocks */
  variation: 'inline' | 'bar'
  /** Define if street should be displayed */
  showStreet?: boolean
  /** Define if city and state should be displayed */
  showCityAndState?: boolean
  /** Define if postal code should be displayed */
  showPostalCode?: boolean
  /** Define if prefix should be displayed */
  showPrefix?: boolean
  /** Define if component should render if address is empty */
  showIfEmpty?: boolean
  /** Used to override default CSS handles */
  classes?: CssHandlesTypes.CustomClasses<typeof USER_ADDRESS_CSS_HANDLES>
}

function UserAddress({
  variation,
  showStreet = true,
  showCityAndState = false,
  showPostalCode = false,
  showPrefix = true,
  showIfEmpty = false,
  classes,
}: Props) {
  const { handles, withModifiers } = useCssHandles(USER_ADDRESS_CSS_HANDLES, {
    classes,
  })

  // todo: type the data returned
  const { data: orderFormData, refetch } = useQuery(ADDRESS_QUERY, {
    ssr: false,
  })

  useEffect(() => {
    const handleLocationUpdated = () => refetch()

    window.addEventListener('locationUpdated', handleLocationUpdated)

    return () => {
      window.removeEventListener('locationUpdated', handleLocationUpdated)
    }
  }, [refetch])

  const orderForm = orderFormData?.orderForm

  if (!orderForm || (!orderForm?.shippingData?.address && !showIfEmpty)) {
    return null
  }

  const isInline = variation === 'inline'
  const isInverted = !isInline

  const AddressInfoWithHandles = () => {
    return (
      <UserAddressCssHandlesProvider
        handles={handles}
        withModifiers={withModifiers}
      >
        <AddressInfo
          inverted={isInverted}
          inline={isInline}
          orderForm={orderForm}
          showStreet={showStreet}
          showCityAndState={showCityAndState}
          showPostalCode={showPostalCode}
          showPrefix={showPrefix}
          showIfEmpty={showIfEmpty}
        />
      </UserAddressCssHandlesProvider>
    )
  }

  if (isInline) {
    return (
      <div
        className={`${handles.userAddressContainer} ph5`}
        style={{
          maxWidth: '30rem',
        }}
      >
        <AddressInfoWithHandles />
      </div>
    )
  }

  return (
    <div
      className={`${handles.userAddressContainer} bg-base--inverted c-on-base--inverted flex ph5 pointer pv3 ml3 mr3`}
    >
      <Container className="flex justify-center w-100 left-0">
        <div className="w-100 mw9 flex">
          <AddressInfoWithHandles />
        </div>
      </Container>
    </div>
  )
}

export default UserAddress
