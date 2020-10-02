import React, { Fragment } from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/recompose` if it exists or... Remove this comment to see the full error message
import { compose, branch, renderComponent } from 'recompose'
import { FormattedMessage } from 'react-intl'
import { path } from 'ramda'
import { graphql } from 'react-apollo'

import orderFormQuery from './queries/orderForm.gql'
import Loader from './Loader'
import styles from './styles.css'

const Wrapper = ({ children }: any) => (
  <div
    className={`${styles.greetingContainer} mh4 pv4 t-heading-4 c-on-base nowrap`}
  >
    {children}
  </div>
)

const withWrapper = (Component: any) => (props: any) => (
  <Wrapper>
    <Component {...props} />
  </Wrapper>
)

type GreetingProps = {
  orderForm?: {
    clientProfileData?: {
      firstName?: string
    }
  }
}

const Greeting = ({ orderForm }: GreetingProps) => {
  const firstName = path(['clientProfileData', 'firstName'], orderForm) || null

  return (
    firstName && (
      <Wrapper>
        <Fragment>
          <span className={styles.message}>
            <FormattedMessage id="store/greeting" />,
          </span>
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'ReactPor... Remove this comment to see the full error message */}
          <span className={`${styles.firstName} pl2 b`}>{firstName}</span>
        </Fragment>
      </Wrapper>
    )
  )
}

const withLinkStateOrderForm = graphql(orderFormQuery, {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'minicart' does not exist on type 'DataVa... Remove this comment to see the full error message
  props: ({ data: { minicart } }) => ({
    orderForm: minicart && minicart.orderForm && JSON.parse(minicart.orderForm),
  }),
})

export default compose(
  withLinkStateOrderForm,
  branch(({ loading }: any) => loading, renderComponent(withWrapper(Loader)))
)(Greeting)
