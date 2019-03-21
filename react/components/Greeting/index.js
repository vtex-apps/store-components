import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { compose, branch, renderComponent } from 'recompose'
import { FormattedMessage } from 'react-intl'
import { path } from 'ramda'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Loader from './Loader'

import styles from './styles.css'

export const ORDER_FORM_QUERY = gql`
  query {
    minicart @client {
      orderForm {
        clientProfileData {
          firstName
        }
      }
    }
  }
`

const Wrapper = ({ children }) => (
  <div
    className={`${
      styles.greetingContainer
    } mh4 pv4 t-heading-4 c-on-base nowrap`}
  >
    {children}
  </div>
)

const withWrapper = Component => props => (
  <Wrapper>
    <Component {...props} />
  </Wrapper>
)

const Greeting = ({ orderForm }) => {
  const firstName = path(['clientProfileData', 'firstName'], orderForm)
  if (!firstName) return null

  return (
    <Wrapper>
      <Fragment>
        <span className={styles.message}>
          <FormattedMessage id="greeting" />,
        </span>
        <span className={`${styles.firstName} pl2 b`}>{firstName}</span>
      </Fragment>
    </Wrapper>
  )
}

Greeting.propTypes = {
  orderForm: PropTypes.shape({
    clientProfileData: PropTypes.shape({
      firstName: PropTypes.string,
    }),
  }),
}

const withLinkStateOrderForm = graphql(ORDER_FORM_QUERY, {
  props: ({ data: { minicart } }) => ({
    orderForm: minicart && minicart.orderForm,
  }),
})

export default compose(
  withLinkStateOrderForm,
  branch(({ loading }) => loading, renderComponent(withWrapper(Loader)))
)(Greeting)
