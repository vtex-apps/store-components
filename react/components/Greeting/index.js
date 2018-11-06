import React, { Fragment } from 'react'
import { compose, branch, renderComponent } from 'recompose'
import { FormattedMessage } from 'react-intl'
import { path } from 'ramda'
import { orderFormConsumer, contextPropTypes } from 'vtex.store/OrderFormContext'

import Loader from './Loader'

const Wrapper = ({ children }) => (
  <div className="vtex-greeting vtex-page-padding mh4 pv4 f3 fw4 c-on-base nowrap">{children}</div>
)

const withWrapper = Component => props => (
  <Wrapper>
    <Component {...props} />
  </Wrapper>
)

const Greeting = ({ orderFormContext }) => {
  const firstName = path(['orderForm', 'clientProfileData', 'firstName'], orderFormContext)  
  if (!firstName) return null

  return (
    <Wrapper>
      <Fragment>
        <span className="vtex-greeting__message">
          <FormattedMessage id="greeting" />,
        </span>
        <span className="vtex-greeting__first-name pl2 fw6">{firstName}</span>
      </Fragment>
    </Wrapper>
  )
}

Greeting.propTypes = { orderFormContext: contextPropTypes }

const enhanced = compose(
  orderFormConsumer,
  branch(({ loading }) => loading, renderComponent(withWrapper(Loader)))
)

export default enhanced(Greeting)
