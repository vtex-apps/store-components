import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '@vtex/styleguide/lib/Input'
import Button from '@vtex/styleguide/lib/Button'
import { injectIntl, intlShape } from 'react-intl'
import { graphql } from 'react-apollo'

import sendEmailVerification from '../mutations/sendEmailVerification.gql'

import { translate } from '../utils'

/** EmailVerification tab component. Receive a email from an input and call the sendEmailVerification mutation */
class EmailVerification extends Component {
  handleInputChange = event => {
    this.props.onStateChange({ email: event.target.value })
  }

  handleOnSubimit = () => {
    const { sendEmailVerification, email, onStateChange, next } = this.props

    if (email !== '') {
      sendEmailVerification({ variables: { email: email } }).then(
        res => {
          if (
            res.data &&
            res.data.sendEmailVerification &&
            res.data.sendEmailVerification.authToken
          ) {
            onStateChange({
              step: next,
              authtoken: res.data.sendEmailVerification.authToken,
            })
          }
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  render() {
    const { goBack, send, intl, onStateChange, previous, email } = this.props

    return (
      <div className="vtex.login__email-verification">
        <Input
          value={email}
          onChange={this.handleInputChange}
          placeholder={'Ex: example@mail.com'}
        />
        <div className="bt mt5 min-h-2 b--light-gray">
          <div className="fl mt4">
            <Button onClick={() => onStateChange({ step: previous })}>
              {translate(goBack, intl)}
            </Button>
          </div>
          <div className="fr mt4">
            <Button onClick={() => this.handleOnSubimit()}>
              {translate(send, intl)}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

EmailVerification.propTypes = {
  /** Next step */
  next: PropTypes.number.isRequired,
  /** Previous step */
  previous: PropTypes.number.isRequired,
  /** Email set on state */
  email: PropTypes.string.isRequired,
  /** Locales go back string id */
  goBack: PropTypes.string.isRequired,
  /** Locales send string id */
  send: PropTypes.string.isRequired,
  /** Function to change de active tab */
  onStateChange: PropTypes.func.isRequired,
  /** Graphql property to call a mutation */
  sendEmailVerification: PropTypes.func.isRequired,
  /** Intl object*/
  intl: intlShape,
}

export default injectIntl(
  graphql(sendEmailVerification, { name: 'sendEmailVerification' })(
    EmailVerification
  )
)
