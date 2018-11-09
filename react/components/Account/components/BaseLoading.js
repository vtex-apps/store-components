import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import ReloadableError from './ReloadableError'
import ContentWrapper from './ContentWrapper'

class BaseLoading extends Component {
  state = {
    isLoading: true,
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.queryData.loading !== this.props.queryData.loading) {
      this.setState({ isLoading: false })
    }
  }

  handleReload = () => {
    this.setState({ isLoading: true })

    this.props.queryData.refetch().catch(() => {
      this.setState({ isLoading: false })
    })
  }

  render() {
    const { isLoading } = this.state
    const { headerConfig, children, queryData } = this.props

    const hasAuthenticationError =
      queryData.error &&
      queryData.error.toString().indexOf('not authenticated') > -1

    return (
      <ContentWrapper {...headerConfig}>
        {() => (
          <Fragment>
            {isLoading ? (
              children
            ) : (
              <ReloadableError
                errorId={
                  hasAuthenticationError
                    ? 'alert.unauthenticated'
                    : 'alert.connectionError'
                }
                onReload={this.handleReload}
              />
            )}
          </Fragment>
        )}
      </ContentWrapper>
    )
  }
}

BaseLoading.propTypes = {
  queryData: PropTypes.any.isRequired,
  headerConfig: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
}

export default BaseLoading
