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
  state = {
    email: '',
  }

  handleInputChange = (event) => {
    this.setState({ email: event.target.value })
  }

  handleOnSubimit = () => {
    const { sendEmailVerification } = this.props
    const { email } = this.state

    console.log(email)
    if (email !== '') {
      sendEmailVerification({ variables: { email: email } }).then(
        res => {
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  render() {
    const { email } = this.state
    const { goBack, send, intl, onOptionSelect } = this.props

    return (
      <div>
        <Input value={email} onChange={this.handleInputChange} placeholder={'Ex: jose@mail.com'} />
        <div className="bt mt5 min-h-2 b--light-gray">
          <div className="fl mt4">
            <Button onClick={() => onOptionSelect(0)}>{translate(goBack, intl)}</Button>
          </div>
          <div className="fr mt4">
            <Button onClick={() => this.handleOnSubimit()}>{translate(send, intl)}</Button>
          </div>
        </div>
      </div >
    )
  }
}

EmailVerification.propTypes = {
  /** Locales go back string id */
  goBack: PropTypes.string.isRequired,
  /** Locales send string id */
  send: PropTypes.string.isRequired,
  /** Function to change de active tab */
  onOptionSelect: PropTypes.func.isRequired,
  /** Graphql property to call a mutation */
  sendEmailVerification: PropTypes.func.isRequired,
  /** Intl object*/
  intl: intlShape,
}

export default injectIntl(graphql(sendEmailVerification, { name: 'sendEmailVerification' })(EmailVerification))

