import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { compose, branch, renderComponent } from 'recompose'
import { FormattedMessage } from 'react-intl'
import { graphql } from 'react-apollo'
import { orderFormQuery } from './queries'

import Loader from './Loader'

import styles from './styles.css'

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
  return (
    <Wrapper>
      <Fragment>
        <span className={styles.message}>
          <FormattedMessage id="greeting" />,
        </span>
        <span className={`${styles.orderForm} pl2 b`}>{orderForm}</span>
      </Fragment>
    </Wrapper>
  )
}

Greeting.propTypes = {
  orderForm: PropTypes.string,
}

const withLinkStateOrderForm = graphql(orderFormQuery, {
  props: ({ data: { minicart } }) => ({
    orderForm: minicart && minicart.orderForm && JSON.parse(minicart.orderForm),
  }),
})

export default compose(
  withLinkStateOrderForm,
  branch(({ loading }) => loading, renderComponent(withWrapper(Loader)))
)(Greeting)
